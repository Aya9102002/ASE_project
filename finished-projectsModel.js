const connection = require("../database");

class FinishedProjectModel {
    
    static async addNewFinishedProject(projectId, description, imageUrl) {
        try {
            const sql = "INSERT INTO finishedproject (description, imageUrl, numberOfLikes, numberOfComments, projectid) VALUES (?, ?, 0, 0, ?)";
            await connection.queryAsync(sql, [description, imageUrl, projectId]);
            return { message: "Finished project added successfully" };
        } catch (error) {
            console.error("Error adding finished project:", error);
            throw new Error("Internal server error");
        }
    }

    static async getAllFinProjects() {
        try {
            const sql = "SELECT * FROM finishedproject";
            const projects = await connection.queryAsync(sql);
            return projects;
        } catch (error) {
            console.error("Error fetching finished projects:", error);
            throw new Error("Internal server error");
        }
    }

    static async updateFinishedProject(finishedProjectId, description, imageUrl) {
        try {
            const sql = "UPDATE finishedproject SET description = ?, imageUrl = ? WHERE idfinishedproject = ?";
            const result = await connection.queryAsync(sql, [description, imageUrl, finishedProjectId]);
            return result;
        } catch (error) {
            console.error("Error updating finished project:", error);
            throw new Error("Internal server error");
        }
    }

    static async deleteFinishedProject(finishedProjectId) {
        try {
            const sql = "DELETE FROM finishedproject WHERE idfinishedproject = ?";
            const result = await connection.queryAsync(sql, [finishedProjectId]);
            return result;
        } catch (error) {
            console.error("Error deleting finished project:", error);
            throw new Error("Internal server error");
        }
    }
}

module.exports = FinishedProjectModel;
