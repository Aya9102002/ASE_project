

 const connection = require('../database');
const SaleToolsModel = require('../models/sale-toolsModel');
const Joi = require('joi');

class SaleToolsController {
    static async showSaleTools(req, res) {
        try {
            const tools = await SaleToolsModel.showSaleTools();
            res.json(tools);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error });
        }
    }

    static async addSaleTool(req, res) {
        const { userId, toolId, description, availabletools, price } = req.body;
        try {
            const newTool = await SaleToolsModel.addSaleTool(userId, toolId, description, availabletools, price);
            res.status(201).json(newTool);
        } catch (error) {
            console.error("Error adding sale tool:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async deleteTool(req, res) {
        const usertoollId = req.params.id;
        try {
            const message = await SaleToolsModel.deleteTool(usertoollId);
            if (message.affectedRows === 0) {
                return res.status(404).json({ message: "Sale tool not found" });
            }
            res.status(200).json({ message: "Sale tool deleted successfully" });
        } catch (error) {
            console.error("Error deleting sale tool:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateTool(req, res) {
        const UserToolID = req.params.id;
        const idTools = req.body.idTools;
        const description = req.body.description;
        const availableTools = req.body.availabletools; 
        const price = req.body.price;
    
        try {
            const message = await SaleToolsModel.updateTool(UserToolID, idTools, description, availableTools, price);
            res.status(200).json({ message });
        } catch (error) {
            console.error("Error updating sale tool:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
    

    static async getPriceTool(req, res) {
        const minimumPrice = req.params.min;
        const maximumPrice = req.params.max;
        try {
            const prices = await SaleToolsModel.getPriceTool(minimumPrice, maximumPrice);
            res.json(prices);
        } catch (error) {
            console.error("Error fetching sale tools by price range:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async sameMeterialSaleTool(req, res) {
        const toolID = req.params.toolsID;
        try {
            const sales = await SaleToolsModel.sameMeterialSaleTool(toolID);
            res.json(sales);
        } catch (error) {
            console.error("Error fetching sale tools for the same material:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getSaleToolsBetween2Dates(req, res) {
        const { startDate, endDate } = req.params;
        try {
            const tools = await SaleToolsModel.getSaleToolsBetween2Dates(startDate, endDate);
            res.json(tools);
        } catch (error) {
            console.error("Error fetching sale tools within dates:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getToolsUser(req, res) {
        const userID = req.params.userID;
        try {
            const tools = await SaleToolsModel.getToolsUser(userID);
            res.json(tools);
        } catch (error) {
            console.error("Error fetching sale tools for user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = SaleToolsController;
