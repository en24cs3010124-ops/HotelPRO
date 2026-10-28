const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToMongo } = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "auth-token", "x-auth-token"],
  })
);

// Connect to MongoDB Database
connectToMongo();

// Import Routes
const userRoute = require("./routes/userRoute");
const roomRoute = require("./routes/roomRoute");
const bookingRoute = require("./routes/bookingRoute");

// Root / Health check route
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    app: "HotelPro - Roomly Hotel Management Backend",
    version: "1.0.0",
    endpoints: {
      auth: ["POST /SignUp", "POST /Login", "GET /allusers"],
      rooms: ["GET /getallrooms", "POST /addroom", "GET /getroombyid/:id"],
      bookings: ["POST /bookroom", "POST /cancelbooking", "GET /getallbookings", "POST /getbookingsbyuserid"],
    },
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Namespaced Routes
app.use("/user", userRoute);
app.use("/room", roomRoute);
app.use("/booking", bookingRoute);

// Also mount under /api for REST standards
app.use("/api/user", userRoute);
app.use("/api/room", roomRoute);
app.use("/api/booking", bookingRoute);

// Direct root routes matching prompt specifications and legacy endpoints
const userController = require("./controllers/userController");
const roomController = require("./controllers/roomController");
const bookingController = require("./controllers/bookingController");

app.post("/SignUp", userController.signUp);
app.post("/signup", userController.signUp);
app.post("/Login", userController.login);
app.post("/login", userController.login);
app.get("/allusers", userController.getAllUsers);

app.post("/addroom", roomController.addRoom);
app.get("/getallrooms", roomController.getAllRooms);
app.get("/getroombyid/:id", roomController.getRoomById);

app.post("/bookroom", bookingController.bookRoom);
app.post("/cancelbooking", bookingController.cancelBooking);
app.get("/getallbookings", bookingController.getAllBookings);
app.post("/getbookingsbyuserid", bookingController.getBookingsByUserId);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ msg: "Internal server error", error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 HotelPro Server is running on port ${PORT}`);
  console.log(`🌐 Base URL: http://localhost:${PORT}`);
});

module.exports = app;
