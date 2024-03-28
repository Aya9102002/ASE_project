

const connection = require('../database');
const CommentModel = require("../models/CommentModel");

class CommentController {
    static async addComment(req, res) {
        const { userId, finishedProjectId } = req.params;
        const { commentdescription } = req.body;

        try {
            
            const result = await CommentModel.addComment(userId, finishedProjectId, commentdescription);
            res.status(201).json(result);
        } catch (error) {
            console.error("Error adding comment:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async deleteComment(req, res) {
        const { userId, finishedProjectId, commentId } = req.params;
    
        try {
            const result = await CommentModel.deleteComment(commentId, userId, finishedProjectId);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Comment not found" });
            }
            res.status(200).json({ message: "Comment deleted successfully" });
        } catch (error) {
            console.error("Error deleting comment:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    

    static async updateComment(req, res) {
        const { commentId } = req.params;
        const { commentdescription } = req.body;
    
        try {
            await CommentModel.updateComment(commentId, commentdescription);
            res.status(200).json({ message: "Comment updated successfully" });
        } catch (error) {
            console.error("Error updating comment:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
    static async getCommentsByProjectId(req, res) {
        const { finishedProjectId } = req.params;
    
        try {
            const comments = await CommentModel.getCommentsByProjectId(finishedProjectId);
            res.status(200).json(comments);
        } catch (error) {
            console.error("Error fetching comments by project ID:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
    static async getCommentsByUserId(req, res) {
        const { userId } = req.params;
    
        try {
            const comments = await CommentModel.getCommentsByUserId(userId);
            res.status(200).json(comments);
        } catch (error) {
            console.error("Error fetching comments by user ID:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    

    static async getCommentsSortedByDate(req, res) {
        try {
            const comments = await CommentModel.getCommentsSortedByDate();
            res.status(200).json(comments);
        } catch (error) {
            console.error("Error fetching comments sorted by date:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
}

module.exports = CommentController;
