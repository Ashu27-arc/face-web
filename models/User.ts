import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userData: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
  },
  faceDescriptors: {
    type: [[Number]],
    required: true,
  },
  capturedImages: {
    type: [String],
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  loginCount: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Index for faster email lookups
UserSchema.index({ "userData.email": 1 });

export default mongoose.models.User || mongoose.model("User", UserSchema);
