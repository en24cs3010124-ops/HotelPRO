const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: [true, "Room number is required"],
      unique: true,
    },
    count: {
      type: Number,
      required: [true, "Room capacity count is required"],
    },
    rent: {
      type: Number,
      required: [true, "Room rent is required"],
    },
    type: {
      type: String,
      required: [true, "Room type is required"],
      trim: true,
    },
    photos: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, "Room description is required"],
      trim: true,
    },
    currentbooking: {
      type: [
        {
          bookingid: { type: String },
          fromdate: { type: String },
          todate: { type: String },
          userid: { type: String },
          status: { type: String, default: "booked" },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Exports model named "rooms" to match prompt requirement
module.exports = mongoose.model("rooms", roomSchema);
