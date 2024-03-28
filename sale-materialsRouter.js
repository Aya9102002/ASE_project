
const express = require("express");
const router = express.Router();
const connection = require('../database');
const Joi = require('joi');
const saleMaterialController = require("../controllers/sale-materialsContoller");



// to show 
router.get("/sale-materials", saleMaterialController.showSaleMaterials);

// add new material to sale

router.post("/sale-materials", saleMaterialController.NewSaleMaterial);


// to delete a material for sale by ID

router.delete("/sale-materials/:id",saleMaterialController.deleteSaleMaterial);

//  to update a material for sale by ID

router.put("/sale-materials/:UserMaterialID", saleMaterialController.updateSaleMaterial);


// get price between two numbers
router.get("/sale-materials/price/:min/:max", saleMaterialController.getPrice);


//  get sale same  materials sales
router.get("/sale-materials/materials/:materialsID", saleMaterialController.getSameMaterialSale);

//  to get sale materials created between specific dates

router.get("/sale-materials/created-between/:startDate/:endDate", saleMaterialController.getSaleMaterialInDates);


// get sale materials for one user
router.get("/sale-materials/users/:userID", saleMaterialController.getSaleMaterialForUser);


module.exports = router;
