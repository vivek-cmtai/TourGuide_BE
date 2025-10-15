import express from "express";
import { loginUser, logoutUser, getCurrentUser, verifyOtpAndRegister} from "../controllers/auth.controller.js";
import { upload } from "../middleware/uploads.js";
import { sendOtp } from "../controllers/Otp.controller.js";

const authRouter = express.Router();

// Routes
// Step 1: Send OTP
authRouter.post("/send-otp", sendOtp);

// Step 2: Verify OTP & Register
authRouter.post("/verify-otp",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "license", maxCount: 1 },
  ]),
  verifyOtpAndRegister
);


authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/me", getCurrentUser);

export default authRouter;
