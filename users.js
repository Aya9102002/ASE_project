const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

/**
 * @desc   Register a new user
 * @route  POST /api/users/register
 * @access Public
 */
router.post("/register", asyncHandler(async (req, res) => {
    const { email, username, password, location, threshold, interests } = req.body;

    try {
        const newUser = await User.registerUser({ email, username, password, location, threshold, interests });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));

/**
 * @desc   User login
 * @route  POST /api/users/login
 * @access Public
 */
router.post("/login", asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.loginUser({ email, password });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Here you can handle login success, e.g., generate JWT token and send it back to the client
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));

/**
 * @desc   Update user profile
 * @route  PUT /api/users/:id
 * @access Private
 */
router.put("/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { email, username, password } = req.body;

    try {
        await User.updateUser(id, { email, username, password });
        res.status(200).json({ message: "User profile updated successfully" });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));

/**
 * @desc   Delete user account
 * @route  DELETE /api/users/:id
 * @access Private
 */
router.delete("/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        await User.deleteUser(id);
        res.status(200).json({ message: "User account deleted successfully" });
    } catch (error) {
        console.error("Error deleting user account:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));

module.exports = router;
