const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Matches /bookroom and /booking/bookroom
router.post("/bookroom", bookingController.bookRoom);

// Matches /cancelbooking and /booking/cancelbooking
router.post("/cancelbooking", bookingController.cancelBooking);

// Matches /getallbookings and /booking/getallbookings (Admin)
router.get("/getallbookings", bookingController.getAllBookings);

// Matches /getbookingsbyuserid and /booking/getbookingsbyuserid
router.post("/getbookingsbyuserid", bookingController.getBookingsByUserId);
router.get("/getbookingsbyuserid/:userid", bookingController.getBookingsByUserId);

module.exports = router;
