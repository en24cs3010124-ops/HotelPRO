const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

// Matches /addroom and /room/addroom
router.post("/addroom", roomController.addRoom);

// Matches /getallrooms and /room/getallrooms
router.get("/getallrooms", roomController.getAllRooms);

// Matches /getroombyid/:id
router.get("/getroombyid/:id", roomController.getRoomById);

// Delete room
router.delete("/deleteroom/:id", roomController.deleteRoom);

module.exports = router;
