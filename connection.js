const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const connectionController = require("../controllers/connectionController");

// POST /api/connection - Send a connection request
router.post("/", asyncHandler(async (req, res) => {
    const { senderId, receiverId } = req.body;
    try {
        const result = await connectionController.createConnection(senderId, receiverId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}));

// POST /api/connection/accept - Accept a connection request
router.post("/accept", asyncHandler(async (req, res) => {
    const { senderId, receiverId } = req.body;
    try {
        const result = await connectionController.acceptConnection(senderId, receiverId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}));

module.exports = router;
