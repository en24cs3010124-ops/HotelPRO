const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET || "hotelpro_super_secret_jwt_key_2026";

// Register / SignUp
exports.signUp = async (req, res) => {
  try {
    const { name, email, password, phone, userType } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ msg: "All fields are required", status: "false" });
    }

    const existingUser = await userModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already register", status: "false" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await userModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      userType: userType || "Ordinary",
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userObj = newUser.toObject();
    delete userObj.password;

    res.status(200).json({
      msg: "User registered successfully",
      status: "true",
      token,
      user: userObj,
    });
  } catch (error) {
    console.error("SignUp error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter both email and password", status: "false" });
    }

    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password", status: "false" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password", status: "false" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      msg: "Login successful",
      status: "true",
      token,
      user: userObj,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

// Get All Users (Admin view)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("getAllUsers error:", error);
    res.status(500).json({ msg: "Failed to fetch users", error: error.message });
  }
};

// Get current profile
exports.getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching profile", error: error.message });
  }
};
