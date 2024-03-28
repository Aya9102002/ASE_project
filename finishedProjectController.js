const connection = require('../database');
const FinishedProjectModel = require('../models/finished-projectsModel');

class FinishedProjectController {

    static async addNewFinProject(req, res) {
        const { projectId } = req.params;
        const { description, imageUrl } = req.body;

        try {
            const result = await FinishedProjectModel.addNewFinishedProject(projectId, description, imageUrl);
            res.status(201).json(result);
        } catch (error) {
            console.error("Error adding finished project:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async viewALLFinProject(req, res) {
        try {
            const projects = await FinishedProjectModel.getAllFinProjects();
            res.status(200).json(projects);
        } catch (error) {
            console.error("Error fetching finished projects:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateFinProject(req, res) {
        const { finishedProjectId } = req.params;
        const { description, imageUrl } = req.body;

        try {
            const result = await FinishedProjectModel.updateFinProject(finishedProjectId, description, imageUrl);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Finished project not found" });
            }
            res.status(200).json({ message: "Finished project updated successfully" });
        } catch (error) {
            console.error("Error updating finished project:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async deleteFinishedProject(req, res) {
        const { finishedProjectId } = req.params;

        try {
            const result = await FinishedProjectModel.deleteFinishedProject(finishedProjectId);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Finished project not found" });
            }
            res.status(200).json({ message: "Finished project deleted successfully" });
        } catch (error) {
            console.error("Error deleting finished project:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = FinishedProjectController;
