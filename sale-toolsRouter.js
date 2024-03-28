
const express = require("express");
const router = express.Router();
const connection = require('../database');
const Joi = require('joi');
const saletoolController = require("../controllers/sale-toolsController");



// to show 
router.get("/sale-tools", saletoolController.showSaleTools);

// add new tool to sale
router.post("/sale-tools",saletoolController.addSaleTool);



// to delete a tool for sale by ID
router.delete("/sale-tools/:id",saletoolController.deleteTool );

//  to update a tool for sale by ID
router.put("/sale-tools/:id", saletoolController.updateTool);


// get price between two numbers
router.get("/sale-tools/price/:min/:max", saletoolController.getPriceTool);


//  get sale same  materials sales
router.get("/sale-tools/tools/:toolsID", saletoolController.sameMeterialSaleTool);

//  to get sale tools created between specific dates

router.get("/sale-tools/created-between/:startDate/:endDate", saletoolController.getSaleToolsBetween2Dates);


// get sale tools for one user
router.get("/sale-tools/users/:userID",saletoolController.getToolsUser );


module.exports = router;
