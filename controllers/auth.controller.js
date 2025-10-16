// auth.controller.js
import User from "../models/Users.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import Otp from "../models/Otp.Model.js";
dotenv.config();
// Create a JWT token
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15m"//token valid for 7 days
  });
};


// @desc    Register a new user
// @route   POST /api/auth/register
export const verifyOtpAndRegister = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      otp,
      mobile,
      dob,
      state,
      country,
      age,
      languages,
      experience,
      specializations,
      availability,
      hourlyRate,
      description,
    } = req.body;

    // ✅ Check OTP validity
    const otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!otpRecord)
      return res.status(400).json({ success: false, message: "OTP not found" });

    if (otpRecord.otp !== otp)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    if (otpRecord.expiresAt < new Date())
      return res.status(400).json({ success: false, message: "OTP expired" });

    // OTP is valid → continue registration
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Handle file uploads (optional)
    const photoPath = req.files?.photo ? req.files.photo[0].path : null;
    const licensePath = req.files?.license ? req.files.license[0].path : null;

    // If guide → create profile with optional fields
    if (role === "guide") {
      const guideProfileData = {
        user: user._id,
        name,
        email,
        isApproved: false,
      };

      // Add optional fields only if they exist
      if (mobile) guideProfileData.mobile = mobile;
      if (dob) guideProfileData.dob = dob;
      if (state) guideProfileData.state = state;
      if (country) guideProfileData.country = country;
      if (age) guideProfileData.age = age;
      if (languages) guideProfileData.languages = JSON.parse(languages);
      if (experience) guideProfileData.experience = experience;
      if (specializations) guideProfileData.specializations = JSON.parse(specializations);
      if (availability) guideProfileData.availability = JSON.parse(availability);
      if (hourlyRate) guideProfileData.hourlyRate = Number(hourlyRate);
      if (description) guideProfileData.description = description;
      if (photoPath) guideProfileData.photo = photoPath;
      if (licensePath) guideProfileData.license = licensePath;

      const guideProfile = await Guide.create(guideProfileData);
      user.guideProfile = guideProfile._id;
      await user.save();
    }

    // Delete OTP after success
    await Otp.deleteMany({ email });

    // Token
    const token = createToken(user._id);
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({
      success: true,
      message:
        role === "guide"
          ? "Guide registered successfully. You can complete your profile later. Awaiting admin approval."
          : "User registered successfully.",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email } , {name:1 , email:1 , password:1 , role:1});
    
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
export const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
