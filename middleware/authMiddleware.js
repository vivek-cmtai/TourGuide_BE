import jwt from "jsonwebtoken";
import User from "../models/Users.Model.js";

// Protect routes - check JWT from cookies
const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token; 

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, token missing");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request, excluding password
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

// Optional role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: `User role '${req.user.role}' not authorized` });
    }
    next();
  };
};

export { protect, authorize };
