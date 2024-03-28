const express = require("express");
const router = express.Router();
const finisheProjectController = require("../controllers/finishedProjectController");

// Add new finished project
router.post("/projects/:projectId", finisheProjectController.addNewFinProject);

// Get all finished projects
router.get("/", finisheProjectController.viewALLFinProject);

// Update specific finished project
router.put("/projects/:finishedProjectId", finisheProjectController.updateFinProject);

// Delete a finished project
router.delete("/projects/:finishedProjectId", finisheProjectController.deleteFinishedProject);

module.exports = router;
