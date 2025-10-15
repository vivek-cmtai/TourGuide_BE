import Otp from "../models/Otp.Model.js";
import { sendEmail } from "../utils/sendEmail.js";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ success: false, message: "Email required" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in DB with 10 min expiry
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await Otp.create({ email, otp, expiresAt });

    // Send email
    await sendEmail(
      email,
      "Verify your email - Aviraj Infotech",
      `<p>Your OTP for verification is: <b>${otp}</b></p>
       <p>This OTP is valid for 10 minutes.</p>`
    );

    res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
