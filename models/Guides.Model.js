import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Basic info
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    dob: { type: Date },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    age: { type: Number },

    // Professional info
    languages: [{ type: String, trim: true }],
    experience: { type: String, trim: true },
    specializations: [{ type: String, trim: true }],
    availability: [{ type: String, trim: true }],
    hourlyRate: { type: Number, default: 0 },
    description: { type: String, trim: true },

    // Documents and media
    license: { type: String }, // License document/image URL
    photo: { type: String }, // Profile picture

    // Availability / booking logic
    isBooked: { type: Boolean, default: false },
    currentBooking: {
      from: { type: Date },
      to: { type: Date },
    },

    // ✅ Admin approval system
    isApproved: {
      type: Boolean,
      default: false, // set true only when approved by admin
    },

  },
  { timestamps: true }
);

export default mongoose.model("Guide", guideSchema);
