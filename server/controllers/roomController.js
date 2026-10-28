const roomModel = require("../models/roomModel");

// Add a new room
exports.addRoom = async (req, res) => {
  try {
    const { roomNumber, count, rent, photos, type, description } = req.body;

    if (!roomNumber || !count || !rent || !type || !description) {
      return res.status(400).json({ msg: "Please fill in all required room details" });
    }

    const existingRoom = await roomModel.findOne({ roomNumber: Number(roomNumber) });
    if (existingRoom) {
      return res.status(400).json({ msg: `Room #${roomNumber} already exists` });
    }

    // Ensure photos is an array of strings
    let photoArray = [];
    if (Array.isArray(photos)) {
      photoArray = photos.filter((p) => typeof p === "string" && p.trim().length > 0);
    } else if (typeof photos === "string") {
      photoArray = [photos];
    }

    if (photoArray.length === 0) {
      // Default placeholder if none provided
      photoArray = [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      ];
    }

    const newRoom = new roomModel({
      roomNumber: Number(roomNumber),
      count: Number(count),
      rent: Number(rent),
      type,
      photos: photoArray,
      description,
      currentbooking: [],
    });

    const room = await newRoom.save();
    res.status(200).send(room);
  } catch (error) {
    console.error("addRoom error:", error);
    res.status(500).send(error);
  }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await roomModel.find().sort({ roomNumber: 1 });
    res.status(200).send(rooms);
  } catch (error) {
    console.error("getAllRooms error:", error);
    res.status(500).json({ msg: "Failed to fetch rooms", error: error.message });
  }
};

// Get room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await roomModel.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }
    res.status(200).send(room);
  } catch (error) {
    console.error("getRoomById error:", error);
    res.status(500).json({ msg: "Error fetching room", error: error.message });
  }
};

// Delete room
exports.deleteRoom = async (req, res) => {
  try {
    const room = await roomModel.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }
    res.status(200).json({ msg: "Room deleted successfully", room });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting room", error: error.message });
  }
};
