const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    userType: {
      type: String,
      required: [true, "UserType is required"],
      enum: ["Admin", "Ordinary"],
      default: "Ordinary",
    },
  },
  {
    timestamps: true,
  }
);

// Exports model named "users" to match prompt requirement
module.exports = mongoose.model("users", userSchema);
