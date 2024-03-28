const express = require("express");
const router = express.Router();
const connection = require('../database');
const Joi = require('joi');
const asyncHandler = require("express-async-handler");
const likeController = require("../controllers/likeController");

// Add Like
router.post("/finished-project/:finishedProjectId/users/:userId/like", likeController.addLikeOnProject);
// Delete Like
router.delete("/finished-project/:finishedProjectId/users/:userId/like", likeController.deleteLike);

// Show Users Who put like on a project
router.get("/finished-project/:finishedProjectId/users/like",likeController.showUsersWhoPutLikes);

module.exports = router;