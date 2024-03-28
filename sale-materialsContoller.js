const connection = require('../database');
const SaleMaterialsModel = require('../models/sale-materialsModel');
const Joi = require('joi');

class SaleMaterialsController {
    static async showSaleMaterials(req, res) {
        try {
            const materials = await SaleMaterialsModel.showSaleMaterials();
            res.json(materials);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error });
        }
    }

    static async NewSaleMaterial(req, res) {
        const { userId, materialId, description, availableMaterials, price } = req.body;
        try {
            const newMaterial = await SaleMaterialsModel.NewSaleMaterial(userId, materialId, description, availableMaterials, price);
            res.status(201).json(newMaterial);
        } catch (error) {
            console.error("Error adding sale material:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async deleteSaleMaterial(req, res) {
        const userMaterialId = req.params.id;
        try {
            const message = await SaleMaterialsModel.deleteSaleMaterial(userMaterialId);
            if (message.affectedRows === 0) {
                return res.status(404).json({ message: "sale material not found" });
            }
            res.status(200).json({ message: "sale material deleted successfully" });
        } catch (error) {
            console.error("Error deleting sale material:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateSaleMaterial(req, res) {
        const UserMaterialID = req.params.UserMaterialID;
        const idMaterials = req.body.idMaterials;
        const description = req.body.description;
        const availableMaterials = req.body.availableMaterials;
        const price = req.body.price;

        try {
            const message = await SaleMaterialsModel.updateSaleMaterial(UserMaterialID, idMaterials, description, availableMaterials, price);
            res.status(200).json({ message });
        } catch (error) {
            console.error("Error updating sale material:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
    

    static async getPrice(req, res) {
        const minimumPrice = req.params.min;
        const maximumPrice = req.params.max;
        try {
            const prices = await SaleMaterialsModel.getPrice(minimumPrice, maximumPrice);
            res.json(prices);
        } catch (error) {
            console.error("Error fetching sale materials by price range:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getSameMaterialSale(req, res) {
        const materialID = req.params.materialsID;
        try {
            const sales = await SaleMaterialsModel.getSameMaterialSale(materialID);
            res.json(sales);
        } catch (error) {
            console.error("Error fetching sale materials for the same material:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getSaleMaterialInDates(req, res) {
        const { startDate, endDate } = req.params;
        try {
            const materials = await SaleMaterialsModel.getSaleMaterialInDates(startDate, endDate);
            res.json(materials);
        } catch (error) {
            console.error("Error fetching sale materials within dates:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getSaleMaterialForUser(req, res) {
        const userID = req.params.userID;
        try {
            const materials = await SaleMaterialsModel.getSaleMaterialForUser(userID);
            res.json(materials);
        } catch (error) {
            console.error("Error fetching sale materials for user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = SaleMaterialsController;
