const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerUser, loginUser, updateUser, deleteUser } = require("../models/UserModel");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// Register User
router.post("/register", async (req, res) => {
    const { email, username, password, location, threshold, interests } = req.body;

    try {
        // Call registerUser function from UserModel to register the user
        await registerUser({ email, username, password, location, threshold, interests }, (error, result) => {
            if (error) {
                console.error("Error registering user:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
            res.status(201).json({ message: "User registered successfully" });
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Call loginUser function from UserModel to login the user
        await loginUser({ email, password }, (error, user) => {
            if (error) {
                console.error("Error logging in user:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
            if (!user) {
                return res.status(400).json({ message: "Invalid email or password" });
            }
            // Generate JWT token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
            res.status(200).json({ token });
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update User
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params;

    try {
        // Call updateUser function from UserModel to update the user
        await updateUser(id, req.body, (error, result) => {
            if (error) {
                console.error("Error updating user:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
            res.status(200).json({ message: "User updated successfully" });
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete User
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params;

    try {
        // Call deleteUser function from UserModel to delete the user
        await deleteUser(id, (error, result) => {
            if (error) {
                console.error("Error deleting user:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
