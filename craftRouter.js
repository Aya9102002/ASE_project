
/*const express = require("express");
const router = express.Router();
const Joi = require('joi');
const connection = require('./database');

// GET all craft projects
router.get("/craft-projects", (req, res) => {
    const sql = "SELECT * FROM craft_projects";
    connection.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching craft projects:", err);
            res.status(500).json({ message: "Internal server error" });
        } else {
            res.json(result);
        }
    });
});

// GET a craft project by ID
router.get("/craft-projects/:id", (req, res) => {
    const sql = "SELECT * FROM craft_projects WHERE id = ?";
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error("Error fetching craft project:", err);
            res.status(500).json({ message: "Internal server error" });
        } else if (result.length === 0) {
            res.status(404).json({ message: "Craft project not found" });
        } else {
            res.json(result[0]);
        }
    });
});

// POST a new craft project
router.post("/craft-projects", (req, res) => {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(50).required(),
        description: Joi.string().trim().min(3).max(255).required(),
        // Add other fields as needed
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const craftProject = {
        title: req.body.title,
        description: req.body.description,
        // Add other fields as needed
    };

    const sql = "INSERT INTO craft_projects SET ?";
    connection.query(sql, craftProject, (err, result) => {
        if (err) {
            console.error("Error adding craft project:", err);
            res.status(500).json({ message: "Internal server error" });
        } else {
            craftProject.id = result.insertId;
            res.status(201).json(craftProject);
        }
    });
});

// DELETE a craft project by ID
router.delete("/craft-projects/:id", (req, res) => {
    const sql = "DELETE FROM craft_projects WHERE id = ?";
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error("Error deleting craft project:", err);
            res.status(500).json({ message: "Internal server error" });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: "Craft project not found" });
        } else {
            res.status(204).end();
        }
    });
});

// PUT (update) a craft project by ID
router.put("/craft-projects/:id", (req, res) => {
    // Validate request body
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(50),
        description: Joi.string().trim().min(3).max(255),
        // Add other fields as needed
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // Update craft project in the database
    const sql = "UPDATE craft_projects SET ? WHERE id = ?";
    connection.query(sql, [req.body, req.params.id], (err, result) => {
        if (err) {
            console.error("Error updating craft project:", err);
            res.status(500).json({ message: "Internal server error" });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: "Craft project not found" });
        } else {
            res.status(200).json({ message: "Craft project updated successfully" });
        }
    });
});

module.exports = router;
*/