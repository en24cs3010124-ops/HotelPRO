import axios from "axios";

const API_BASE_URL = "http://localhost:8001";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 4000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["auth-token"] = token;
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Demo fallback mock data (initialized from localStorage if exists)
const getInitialMockData = () => {
  const stored = localStorage.getItem("hotelpro_mock_db");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      // fallback
    }
  }

  const initial = {
    users: [
      {
        _id: "68d224f1506b7d3f0b866aed",
        name: "tousif",
        email: "tousif@gmail.com",
        phone: "9704927891",
        userType: "Admin",
      },
      {
        _id: "68d2345d5686a24fada0994e",
        name: "rohan",
        email: "rohan3@gmail.com",
        phone: "9704927800",
        userType: "Ordinary",
      },
      {
        _id: "68d2356a5686a24fada09960",
        name: "sid",
        email: "sid@gmail.com",
        phone: "9704927807",
        userType: "Ordinary",
      },
      {
        _id: "68d235b05686a24fada09969",
        name: "saisunny",
        email: "sai@gmail.com",
        phone: "9704927807",
        userType: "Ordinary",
      },
      {
        _id: "68d3818579255d604fe9724c",
        name: "sun",
        email: "s@gmai.com",
        phone: "9704927807",
        userType: "Admin",
      },
    ],
    rooms: [
      {
        _id: "68d230b8e24b51e6c5a22ad5",
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
        _id: "68d23257e24b51e6c5a22ad7",
        roomNumber: 102,
        count: 1,
        rent: 1200,
        type: "Delux",
        photos: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        ],
        description: "luxury rooms with ambient lighting and private balcony",
        currentbooking: [],
      },
      {
        _id: "68d248bce5da9b6fb84ba237",
        roomNumber: 103,
        count: 1,
        rent: 1200,
        type: "Delux",
        photos: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
        ],
        description: "luxury rooms equipped with premium amenities",
        currentbooking: [],
      },
      {
        _id: "68d381b179255d604fe97255",
        roomNumber: 104,
        count: 5,
        rent: 900,
        type: "Delux",
        photos: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80",
        ],
        description: "luxury rooms for family, spacious with 5 capacity",
        currentbooking: [],
      },
      {
        _id: "68d381b179255d604fe97299",
        roomNumber: 105,
        count: 2,
        rent: 1000,
        type: "ordinary",
        photos: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        ],
        description: "Welcome to Roomly. Cozy and comfortable for 2 guests.",
        currentbooking: [],
      },
    ],
    bookings: [
      {
        _id: "68d259fb3cb3cc7831c89406",
        roomNumber: 101,
        type: "Delux Room",
        fromdate: "23-09-2025",
        todate: "24-09-2025",
        totalAmount: 2400,
        phone: "9704927807",
        username: "sid",
        userid: "68d2356a5686a24fada09960",
        status: "cancelled",
      },
      {
        _id: "68d2609d3cb3cc7831c8943f",
        roomNumber: 102,
        type: "Delux Room",
        fromdate: "23-09-2025",
        todate: "24-09-2025",
        totalAmount: 2400,
        phone: "9704927807",
        username: "sid",
        userid: "68d2356a5686a24fada09960",
        status: "booked",
      },
      {
        _id: "68d381e679255d604fe97265",
        roomNumber: 103,
        type: "Delux Room",
        fromdate: "25-09-2025",
        todate: "27-09-2025",
        totalAmount: 2700,
        phone: "9704927800",
        username: "rohan",
        userid: "68d2345d5686a24fada0994e",
        status: "cancelled",
      },
    ],
  };

  localStorage.setItem("hotelpro_mock_db", JSON.stringify(initial));
  return initial;
};

const saveMockData = (data) => {
  localStorage.setItem("hotelpro_mock_db", JSON.stringify(data));
};

// API Service Functions with graceful backend / local fallback
export const api = {
  // Authentication
  signUp: async (formData) => {
    try {
      const res = await apiClient.post("/SignUp", formData);
      return res.data;
    } catch (err) {
      // Local fallback
      console.warn("Server unavailable, using local mock for signUp");
      const db = getInitialMockData();
      const existing = db.users.find((u) => u.email === formData.email.toLowerCase());
      if (existing) {
        throw new Error("Email already register");
      }
      const newUser = {
        _id: "usr_" + Date.now(),
        name: formData.name,
        email: formData.email.toLowerCase(),
        phone: formData.phone,
        userType: formData.userType || "Ordinary",
      };
      db.users.push(newUser);
      saveMockData(db);
      return {
        msg: "User registered successfully",
        status: "true",
        token: "mock_jwt_token_" + newUser._id,
        user: newUser,
      };
    }
  },

  login: async (credentials) => {
    try {
      const res = await apiClient.post("/Login", credentials);
      return res.data;
    } catch (err) {
      console.warn("Server unavailable, using local mock for login");
      const db = getInitialMockData();
      const user = db.users.find((u) => u.email === credentials.email.toLowerCase());
      if (!user) {
        throw new Error("Invalid email or password");
      }
      return {
        msg: "Login successful",
        status: "true",
        token: "mock_jwt_token_" + user._id,
        user,
      };
    }
  },

  getAllUsers: async () => {
    try {
      const res = await apiClient.get("/allusers");
      return res.data;
    } catch (err) {
      console.warn("Server unavailable, returning mock users");
      const db = getInitialMockData();
      return db.users;
    }
  },

  // Rooms
  getAllRooms: async () => {
    try {
      const res = await apiClient.get("/getallrooms");
      return res.data;
    } catch (err) {
      console.warn("Server unavailable, returning mock rooms");
      const db = getInitialMockData();
      return db.rooms;
    }
  },

  addRoom: async (roomData) => {
    try {
      const res = await apiClient.post("/addroom", roomData);
      return res.data;
    } catch (err) {
      console.warn("Server unavailable, adding to mock rooms");
      const db = getInitialMockData();
      const newRoom = {
        _id: "rm_" + Date.now(),
        roomNumber: Number(roomData.roomNumber),
        count: Number(roomData.count),
        rent: Number(roomData.rent),
        type: roomData.type,
        photos: roomData.photos || [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        ],
        description: roomData.description,
        currentbooking: [],
      };
      db.rooms.push(newRoom);
      saveMockData(db);
      return newRoom;
    }
  },

  // Bookings
  bookRoom: async (bookingData) => {
    try {
      const res = await apiClient.post("/bookroom", bookingData);
      return res.data;
    } catch (err) {
      console.warn("Server unavailable, adding to mock bookings");
      const db = getInitialMockData();
      const newBooking = {
        _id: "bk_" + Date.now(),
        roomid: bookingData.roomid,
        roomNumber: bookingData.roomNumber,
        type: bookingData.type || "Delux Room",
        fromdate: bookingData.fromdate,
        todate: bookingData.todate,
        totalAmount: bookingData.totalAmount,
        totaldays: bookingData.totaldays || 1,
        phone: bookingData.phone,
        username: bookingData.username,
        userid: bookingData.userid,
        status: "booked",
      };
      db.bookings.unshift(newBooking);
      saveMockData(db);
      return {
        msg: "Room booked successfully",
        status: "true",
        booking: newBooking,
      };
    }
  },

  cancelBooking: async (bookingid, roomid) => {
    try {
      const res = await apiClient.post("/cancelbooking", { bookingid, roomid });
      return res.data;
    } catch (err) {
      console.warn("Server unavailable, updating mock booking cancellation");
      const db = getInitialMockData();
      db.bookings = db.bookings.map((b) => {
        if (b._id === bookingid) {
          b.status = "cancelled";
        }
        return b;
      });
      saveMockData(db);
      return {
        msg: "Your booking cancelled successfully",
        status: "true",
      };
    }
  },

  getAllBookings: async () => {
    try {
      const res = await apiClient.get("/getallbookings");
      return res.data;
    } catch (err) {
      console.warn("Server unavailable, returning mock bookings");
      const db = getInitialMockData();
      return db.bookings;
    }
  },

  getBookingsByUserId: async (userid) => {
    try {
      const res = await apiClient.post("/getbookingsbyuserid", { userid });
      return res.data;
    } catch (err) {
      console.warn("Server unavailable, returning mock bookings for user");
      const db = getInitialMockData();
      return db.bookings.filter((b) => b.userid === userid || !b.userid);
    }
  },
};

export default api;
