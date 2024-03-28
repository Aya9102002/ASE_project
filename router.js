const express = require('express');

const router =  require('express').Router();
const UserController = require('../controller/ProjectController');
const Controller = require('../controller/PartnerController');


//Get Project
router.get("/",UserController.getProjects); // list all projects
router.get("/:id",UserController.getProjectInfo); //list project based on specific projectID


//Adding Project
router.post("/",UserController.insertNewProject); // Add new project 


//Deletion

router.delete("/:id",UserController.deleteproject);//delete project


//Update Project

router.put("/:id",UserController.updateProject); // Update project


// Get projects based on difficulty
router.get("/diff/:difficulty",UserController.getByDifficulty); //list project based on specific difficulty









module.exports = router; // to export it 