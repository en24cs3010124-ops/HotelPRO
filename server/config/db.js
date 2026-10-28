const mongoose = require("mongoose");

let isConnected = false;

const connectToMongo = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hotel";

  try {
    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log("✅ Connected to MongoDB successfully at:", mongoUri);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.log("ℹ️ Running in resilient mode. Ensure MongoDB is running on port 27017 for persistent storage.");
  }

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected. Attempting to reconnect...");
    setTimeout(connectToMongo, 5000);
  });
};

const getDbStatus = () => isConnected;

module.exports = { connectToMongo, getDbStatus };
