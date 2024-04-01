const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const db = require('../database'); 
const Joi = require('joi');
const jwt = require("jsonwebtoken");

// Validation for user input during registration
function validateRegister(user) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        username: Joi.string().trim().min(2).max(100).required(),
        password: Joi.string().trim().min(6).required(),
        intrests: Joi.string().valid('Ozone Layer', 'Water pollution', 'Air pollution', 'Global warming').required()
    });
    return schema.validate(user);
}

// Validation for user input during login
function validatelogin(credentials) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(6).required(),
    });
    return schema.validate(credentials);
}
router.post("/register", asyncHandler(async (req, res) => {
    const { email, username, password, intrests } = req.body;

    // Validate request body
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        // Check if user already exists
        const existingUser = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "This User already registered" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user into database
        await db.query('INSERT INTO users (email, username, password, intrests) VALUES (?, ?, ?, ?)', [email, username, hashedPassword, intrests]);

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}));

router.post("/login", asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate request body
    const { error } = validatelogin(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        // Find user by email
        const users = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY);

        // Send response with token
        res.status(200).json({ token });
    } catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}));

module.exports = router;
