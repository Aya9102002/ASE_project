const connection = require("../database");

class CommentModel {
    static async addComment(userId, finishedProjectId, commentdescription) {
        try {
            const commentSql = "INSERT INTO comment (idusers, idfinishedproject, commentdescription, time) VALUES (?, ?, ?, CURRENT_TIMESTAMP)";
            await connection.queryAsync(commentSql, [userId, finishedProjectId, commentdescription]);

            const incrementSql = "UPDATE finishedproject SET numberOfComments = numberOfComments + 1 WHERE idfinishedproject = ?";
            await connection.queryAsync(incrementSql, [finishedProjectId]);

            return { message: "Comment added successfully" };
        } catch (error) {
            console.error("Error adding comment:", error);
            throw new Error("Internal server error");
        }
    }

    static async deleteComment(commentId, userId, finishedProjectId) {
        try {
            const deleteSql = "DELETE FROM comment WHERE idcomment = ? AND idusers = ? AND idfinishedproject = ?";
            const result = await connection.queryAsync(deleteSql, [commentId, userId, finishedProjectId]);

            if (result.affectedRows === 0) {
                throw new Error("Comment not found");
            }

            const decrementSql = "UPDATE finishedproject SET numberOfComments = GREATEST(numberOfComments - 1, 0) WHERE idfinishedproject = ?";
            await connection.queryAsync(decrementSql, [finishedProjectId]);

            return { message: "Comment deleted successfully" };
        } catch (error) {
            console.error("Error deleting comment:", error);
            throw new Error("Internal server error");
        }
    }

    static async updateComment(commentId, commentdescription) {
        try {
            const sql = "UPDATE comment SET commentdescription = ? WHERE idcomment = ?";
            await connection.queryAsync(sql, [commentdescription, commentId]);
            return { message: "Comment updated successfully" };
        } catch (error) {
            console.error("Error updating comment:", error);
            throw new Error("Internal server error");
        }
    }

    static async getCommentsByProjectId(finishedProjectId) {
        try {
            const sql = "SELECT users.UserName, comment.commentdescription AS comment, comment.time FROM comment INNER JOIN users ON comment.idusers = users.idusers WHERE comment.idfinishedproject = ?";
            const comments = await connection.queryAsync(sql, [finishedProjectId]);
            return comments;
        } catch (error) {
            console.error("Error fetching comments by project ID:", error);
            throw new Error("Internal server error");
        }
    }

    static async getCommentsByUserId(userId) {
        try {
            const sql = "SELECT users.UserName, comment.commentdescription AS comment, comment.time FROM comment INNER JOIN users ON comment.idusers = users.idusers WHERE comment.idusers = ?";
            const comments = await connection.queryAsync(sql, [userId]);
            return comments;
        } catch (error) {
            console.error("Error fetching comments by user ID:", error);
            throw new Error("Internal server error");
        }
    }

    static async getCommentsSortedByDate() {
        try {
            const sql = "SELECT users.UserName, comment.commentdescription AS comment, comment.time FROM comment INNER JOIN users ON comment.idusers = users.idusers ORDER BY comment.time ASC";
            const comments = await connection.queryAsync(sql);
            return comments;
        } catch (error) {
            console.error("Error fetching comments sorted by date:", error);
            throw new Error("Internal server error");
        }
    }
}

module.exports = CommentModel;
