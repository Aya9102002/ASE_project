/*const express = require("express");
const router = express.Router();
const connection = require('../database');
const Joi = require('joi');
const asyncHandler = require("express-async-handler");
const { addComment, deleteComment, updateComment, viewComment, getCommentsById, getCommentsByDate } = require("../controllers/commentController");

//add comment
router.post("/finished-project/:finishedProjectId/users/:userId/comment", addComment );


//delete comment 
router.delete("/finished-project/:finishedProjectId/users/:userId/comment/:commentId",deleteComment);

//update comment
router.put("/finished-project/comments/:commentId",updateComment );


//view comment
router.get("/finished-project/:finishedProjectId/comments", viewComment);

// Get comments by user ID
router.get("/users/:userId", getCommentsById);

// Get comments sorted by date
router.get("/sorted-by-date",getCommentsByDate);



module.exports = router;*/

const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/commentController");


router.post("/:finishedProjectId/users/:userId/comment", CommentController.addComment);
router.delete("/:finishedProjectId/users/:userId/comment/:commentId", CommentController.deleteComment);
router.put("/:finishedProjectId/comments/:commentId", CommentController.updateComment);
router.get("/finished-project/:finishedProjectId/comments", CommentController.getCommentsByProjectId);
router.get("/users/:userId", CommentController.getCommentsByUserId);
router.get("/sorted-by-date", CommentController.getCommentsSortedByDate);

module.exports = router;

