const express = require('express');
const router =  require('express').Router();
const Controller = require('../controller/PartnerController');


// Get Partnership
router.get("/",Controller.getPartnerships );       // get all partnerships
router.get("/:id",Controller.getPartnershipsID ); // get partnership based on specific id 
router.get("/type/:type", Controller.getPartnershipsByType); // get partnership based on specific type 

//Insert new partnership 
router.post("/",Controller.insertNewPartnership ); // insert a new partner ship 

//delete 
router.delete("/:id",Controller.deletePartnership ); // delete partnership based on specific id 


//Update partnership
router.put("/:id",Controller.UpdatePartnerShip ); // Updating  partnership based on specific id 







module.exports = router;