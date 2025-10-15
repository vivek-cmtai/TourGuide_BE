import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["admin", "user", "guide", "manager"],
      default: "user",
    },
    avatar: { type: String },
    isActive: { type: Boolean, default: true },

    // 🔗 Reference to Guide profile if the user is a guide
    guideProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guide",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
