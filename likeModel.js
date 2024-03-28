const connection = require("../database");

class LikeModel {

    static async addLikeOnProject(userId, finishedProjectId) {
        try {
            // Check if the user has already liked the project
            const existingLike = await connection.queryAsync("SELECT * FROM `like` WHERE idusers = ? AND idfinishedproject = ?", [userId, finishedProjectId]);
            if (existingLike.length > 0) {
                throw new Error("User already liked this project");
            }
    
            // Add the like
            const likeSql = "INSERT INTO `like` (idusers, idfinishedproject, time) VALUES (?, ?, CURRENT_TIMESTAMP)";
            await connection.queryAsync(likeSql, [userId, finishedProjectId]);
    
            // Increment the number of likes for the project
            const incrementSql = "UPDATE finishedproject SET numberOfLikes = numberOfLikes + 1 WHERE idfinishedproject = ?";
            await connection.queryAsync(incrementSql, [finishedProjectId]);
    
            return { message: "Like added successfully" };
        } catch (error) {
            console.error("Error adding like:", error);
            throw new Error("Internal server error");
        }
    }

    static async deleteLike( userId, finishedProjectId) {
        try {
            const deleteSql = "DELETE FROM `like` WHERE idusers = ? AND idfinishedproject = ?";
            const result = await connection.queryAsync(deleteSql, [ userId, finishedProjectId]);

            if (result.affectedRows === 0) {
                throw new Error("like not found");
            }

            const decrementSql = "UPDATE finishedproject SET numberOfLikes = GREATEST(numberOfLikes - 1, 0) WHERE idfinishedproject = ?";
            await connection.queryAsync(decrementSql, [finishedProjectId]);

            return { message: "like deleted successfully" };
        } catch (error) {
            console.error("Error deleting like:", error);
            throw new Error("Internal server error");
        }
    }



    static async showUsersWhoPutLikes(finishedProjectId) {
        try {
            const sql = `
            SELECT users.UserName
            FROM \`like\`
            INNER JOIN users ON \`like\`.idusers = users.idusers
            WHERE \`like\`.idfinishedproject = ?
            `;    
            const like = await connection.queryAsync(sql, [finishedProjectId]);
            return like;
          } catch (error) {
            console.error("Error fetching like by project ID:", error);
            throw new Error("Internal server error");
        }
    }

}

module.exports = LikeModel;
