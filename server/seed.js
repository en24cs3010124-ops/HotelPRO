const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const userModel = require("./models/userModel");
const roomModel = require("./models/roomModel");
const bookingModel = require("./models/bookingModel");

const seedDatabase = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hotel";

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data (optional, can be commented out if keeping existing)
    await userModel.deleteMany({});
    await roomModel.deleteMany({});
    await bookingModel.deleteMany({});
    console.log("Cleared existing collections.");

    const hashedPassword = await bcrypt.hash("password123", 10);
    const hashedAdminPassword = await bcrypt.hash("admin123", 10);

    // 1. Seed Users matching screenshots
    const users = await userModel.insertMany([
      {
        name: "sun",
        email: "s@gmai.com",
        password: hashedAdminPassword,
        phone: "9704927807",
        userType: "Admin",
      },
      {
        name: "tousif",
        email: "tousif@gmail.com",
        password: hashedAdminPassword,
        phone: "9704927891",
        userType: "Admin",
      },
      {
        name: "rohan",
        email: "rohan3@gmail.com",
        password: hashedPassword,
        phone: "9704927800",
        userType: "Ordinary",
      },
      {
        name: "sid",
        email: "sid@gmail.com",
        password: hashedPassword,
        phone: "9704927807",
        userType: "Ordinary",
      },
      {
        name: "saisunny",
        email: "sai@gmail.com",
        password: hashedPassword,
        phone: "9704927807",
        userType: "Ordinary",
      },
      {
        name: "Admin User",
        email: "admin@hotelpro.com",
        password: hashedAdminPassword,
        phone: "9876543210",
        userType: "Admin",
      },
      {
        name: "John Doe",
        email: "user@hotelpro.com",
        password: hashedPassword,
        phone: "9123456789",
        userType: "Ordinary",
      },
    ]);
    console.log(`✅ Seeded ${users.length} users`);

    // 2. Seed Rooms matching screenshots
    const rooms = await roomModel.insertMany([
      {
        roomNumber: 101,
        count: 1,
        rent: 1200,
        type: "Delux",
        photos: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
        ],
        description: "luxury rooms with lake view and king size bed",
        currentbooking: [],
      },
      {
        roomNumber: 102,
        count: 1,
        rent: 1200,
        type: "Delux",
        photos: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
        ],
        description: "luxury rooms with ambient lighting and private balcony",
        currentbooking: [],
      },
      {
        roomNumber: 103,
        count: 1,
        rent: 1200,
        type: "Delux",
        photos: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
        ],
        description: "luxury rooms equipped with premium amenities",
        currentbooking: [],
      },
      {
        roomNumber: 104,
        count: 5,
        rent: 900,
        type: "Delux",
        photos: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
        ],
        description: "luxury rooms for family, spacious with 5 capacity",
        currentbooking: [],
      },
      {
        roomNumber: 105,
        count: 2,
        rent: 1000,
        type: "ordinary",
        photos: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
        ],
        description: "Welcome to Roomly. Cozy and comfortable for 2 guests.",
        currentbooking: [],
      },
      {
        roomNumber: 106,
        count: 3,
        rent: 1500,
        type: "Delux",
        photos: [
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        ],
        description: "Executive Delux Suite with panoramic city view",
        currentbooking: [],
      },
    ]);
    console.log(`✅ Seeded ${rooms.length} rooms`);

    // 3. Seed Sample Bookings matching screenshots
    const sampleUser = users.find((u) => u.name === "sid") || users[2];
    const rohanUser = users.find((u) => u.name === "rohan") || users[2];

    const bookings = await bookingModel.insertMany([
      {
        roomid: rooms[0]._id,
        roomNumber: rooms[0].roomNumber,
        type: "Delux Room",
        userid: sampleUser._id,
        username: sampleUser.name,
        fromdate: "23-09-2025",
        todate: "24-09-2025",
        totalAmount: 2400,
        totaldays: 2,
        phone: "9704927807",
        cardDetails: {
          cardholdername: "Sid Sharma",
          cardnumber: "****-****-****-4242",
          cvvcode: "***",
          expmonthyear: "09/27",
        },
        status: "cancelled",
      },
      {
        roomid: rooms[1]._id,
        roomNumber: rooms[1].roomNumber,
        type: "Delux Room",
        userid: sampleUser._id,
        username: sampleUser.name,
        fromdate: "23-09-2025",
        todate: "24-09-2025",
        totalAmount: 2400,
        totaldays: 2,
        phone: "9704927807",
        cardDetails: {
          cardholdername: "Sid Sharma",
          cardnumber: "****-****-****-1111",
          cvvcode: "***",
          expmonthyear: "11/28",
        },
        status: "booked",
      },
      {
        roomid: rooms[2]._id,
        roomNumber: rooms[2].roomNumber,
        type: "Delux Room",
        userid: rohanUser._id,
        username: rohanUser.name,
        fromdate: "25-09-2025",
        todate: "27-09-2025",
        totalAmount: 2700,
        totaldays: 3,
        phone: "9704927800",
        cardDetails: {
          cardholdername: "Rohan Kumar",
          cardnumber: "****-****-****-9876",
          cvvcode: "***",
          expmonthyear: "05/29",
        },
        status: "cancelled",
      },
    ]);
    console.log(`✅ Seeded ${bookings.length} sample bookings`);

    // Update rooms with booking references
    for (const b of bookings) {
      await roomModel.findByIdAndUpdate(b.roomid, {
        $push: {
          currentbooking: {
            bookingid: b._id.toString(),
            fromdate: b.fromdate,
            todate: b.todate,
            userid: b.userid.toString(),
            status: b.status,
          },
        },
      });
    }

    console.log("🎉 Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
