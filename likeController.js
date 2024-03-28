

const connection = require('../database');
const LikeModel = require("../models/likeModel");

class LikeController {

    static async addLikeOnProject(req, res, next) {
        const { userId, finishedProjectId } = req.params;
        try {
            const result = await LikeModel.addLikeOnProject(userId, finishedProjectId);
            res.status(201).json(result);
        } catch (error) {
            console.error("Error adding like:", error);
            // Pass the error to the error handling middleware
            next(error);
        }
    }
    
    static async deleteLike(req, res) {
        const { userId, finishedProjectId } = req.params;
    
        try {
            const result = await LikeModel.deleteLike( userId, finishedProjectId);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "like not found" });
            }
            res.status(200).json({ message: "like deleted successfully" });
        } catch (error) {
            console.error("Error deleting like:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    

  
    
    static async showUsersWhoPutLikes(req, res) {
        const { finishedProjectId } = req.params;
    
        try {
            const like = await LikeModel.showUsersWhoPutLikes(finishedProjectId);
            res.status(200).json(like);
        } catch (error) {
            console.error("Error fetching like by project ID:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
}

module.exports = LikeController;
