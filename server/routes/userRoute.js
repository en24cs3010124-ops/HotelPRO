const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { fetchUser, verifyAdmin } = require("../middlewares/fetchUser");

// Matches /SignUp and /user/SignUp
router.post("/SignUp", userController.signUp);
router.post("/signup", userController.signUp);

// Matches /Login and /user/Login
router.post("/Login", userController.login);
router.post("/login", userController.login);

// Matches /allusers and /user/allusers
router.get("/allusers", userController.getAllUsers);

// Profile
router.get("/profile", fetchUser, userController.getProfile);

module.exports = router;
