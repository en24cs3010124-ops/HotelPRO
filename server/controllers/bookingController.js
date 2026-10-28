const bookingModel = require("../models/bookingModel");
const roomModel = require("../models/roomModel");

// Book a Room
exports.bookRoom = async (req, res) => {
  try {
    const {
      roomid,
      roomNumber,
      type,
      userid,
      username,
      fromdate,
      todate,
      totalAmount,
      totaldays,
      phone,
      cardDetails,
    } = req.body;

    if (!roomid || !fromdate || !todate || !totalAmount || !phone || !cardDetails) {
      return res.status(400).json({ msg: "Missing required booking information" });
    }

    // Validate room exists
    const room = await roomModel.findById(roomid);
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    // Create booking record
    const newBooking = new bookingModel({
      roomid: room._id,
      roomNumber: roomNumber || room.roomNumber,
      type: type || room.type,
      userid: userid || req.user?.id || null,
      username: username || req.user?.name || "Guest",
      fromdate,
      todate,
      totalAmount: Number(totalAmount),
      totaldays: Number(totaldays) || 1,
      phone: String(phone),
      cardDetails: {
        cardholdername: cardDetails.cardholdername || "Cardholder",
        // Mask card number for security, keep last 4 digits
        cardnumber: cardDetails.cardnumber ? `****-****-****-${String(cardDetails.cardnumber).slice(-4)}` : "****",
        cvvcode: "***",
        expmonthyear: cardDetails.expmonthyear || "12/28",
      },
      status: "booked",
    });

    const savedBooking = await newBooking.save();

    // Append to room's currentbooking array
    room.currentbooking.push({
      bookingid: savedBooking._id.toString(),
      fromdate,
      todate,
      userid: String(userid || req.user?.id || ""),
      status: "booked",
    });

    await room.save();

    res.status(200).json({
      msg: "Room booked successfully",
      status: "true",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("bookRoom error:", error);
    res.status(500).json({ msg: "Failed to complete booking", error: error.message });
  }
};

// Cancel a Booking
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingid, roomid } = req.body;

    if (!bookingid) {
      return res.status(400).json({ msg: "Booking ID is required" });
    }

    const booking = await bookingModel.findById(bookingid);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    booking.status = "cancelled";
    await booking.save();

    // Update room currentbooking status
    const targetRoomId = roomid || booking.roomid;
    if (targetRoomId) {
      const room = await roomModel.findById(targetRoomId);
      if (room) {
        room.currentbooking = room.currentbooking.map((b) => {
          if (b.bookingid === bookingid || String(b.bookingid) === String(bookingid)) {
            b.status = "cancelled";
          }
          return b;
        });
        await room.save();
      }
    }

    res.status(200).json({
      msg: "Your booking cancelled successfully",
      status: "true",
      booking,
    });
  } catch (error) {
    console.error("cancelBooking error:", error);
    res.status(500).json({ msg: "Failed to cancel booking", error: error.message });
  }
};

// Get All Bookings (Admin view)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("getAllBookings error:", error);
    res.status(500).json({ msg: "Failed to fetch bookings", error: error.message });
  }
};

// Get Bookings by User ID
exports.getBookingsByUserId = async (req, res) => {
  try {
    const userid = req.body.userid || req.user?.id || req.params.userid;

    if (!userid) {
      return res.status(400).json({ msg: "User ID is required" });
    }

    const bookings = await bookingModel.find({ userid }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("getBookingsByUserId error:", error);
    res.status(500).json({ msg: "Failed to fetch user bookings", error: error.message });
  }
};
