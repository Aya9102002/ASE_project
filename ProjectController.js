const Joi = require('joi');
const userModel = require('../model/Project');

class UserController {
    static async getProjects(req, res) {
        try {
            var result = await userModel.getAllProjects();

            if (result) {
                
                res.send(result);
            } else {
                res.status(404).send("No projects found");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }



   static async getProjectInfo(req, res) {
   var id = req.params.id;
   
   const schema = Joi.object({
      id:Joi.number().min(1).required()
   });
       // Request validation
      const { error } = schema.validate(req.params);
       
       if (error) {
           return res.status(400).json({ error: error.details[0].message });
      }
   
        try {
            var result = await userModel.getProjectInfo(id);

            if (result) {
                
                res.send(result);
            } else {
                res.status(404).send("Project not found");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }




    static async insertNewProject(req,res){
        
      try {
      const title = req.body.ProjectsTitle;
      const description=  req.body.description;
      const size = req.body.GroupSize;
      const diff = req.body.difficulty;
      const head = req.body.head;
      const materials = req.body.materials;

      const allowedValues = ['Hard', 'Medium','Easy'];

       const schema = Joi.object({
        ProjectsTitle  : Joi.string().min(3).max(45).required(),
        difficulty   : Joi.string().valid(...allowedValues.map(value => value.toLowerCase())).insensitive().required(),
        GroupSize  : Joi.number().min(1).required(), 
        head : Joi.string().min(3).max(45).required(),
        description :Joi.string().min(3).max(45).required(),
        materials : Joi.string().min(3).max(450).required(),
      });

      // Request validation
      const { error } = schema.validate(req.body);
    
      if (error) {
          return res.status(400).json({ error: error.details[0].message });
      }
      var result = await userModel.insertproject(title,description,size,diff,head,materials);
      if (result) {
          res.send('Project added successfully');
      } else {
          res.status(404).send("User doesnt exist");
      }
               

            } catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        }


        static async deleteproject(req, res) {
            try {
                var id = req.params.id;
                const schema = Joi.object({
                    id: Joi.number().min(1).required(),
                });
        
                // Request validation
                const { error } = schema.validate(req.params);
        
                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                }
        
                var result = await userModel.deleteProject(id);
        
                if (result) {
                    res.send('Project deleted successfully');
                } else {
                    res.status(404).send("Project not found");
                }
            } catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        }
              
 
 
        static async updateProject(req, res) {
            try {
                var id = req.params.id;
        
                const schema = Joi.object({
                    id: Joi.number().min(1).required(),
                });
        
                const schema2 = Joi.object({
                    ProjectsTitle: Joi.string().min(3).max(45),
                    difficulty: Joi.string().valid('easy', 'medium', 'hard').insensitive(),
                    GroupSize: Joi.number().min(1),
                    description: Joi.string().min(3).max(45),
                    materials: Joi.string().min(3).max(450),
                });
        
                // Request parameter validation
                const { error: idError } = schema.validate( req.params );
                if (idError) {
                    return res.status(400).json({ error: idError.details[0].message });
                }
        
                // Request body validation
                const { error: bodyError } = schema2.validate(req.body);
                if (bodyError) {
                    return res.status(400).json({ error: bodyError.details[0].message });
                }
        
                var result = await userModel.Update(req.body.ProjectsTitle, req.body.description, req.body.GroupSize, req.body.difficulty, req.body.materials, id);
        
                if (result) {
                    res.send('Project updated successfully');
                } else {
                    res.status(404).send("Project not found");
                }
            } catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        }
        




        static async getByDifficulty(req, res) {
            var diff = req.params.difficulty;
            try {
                const schema = Joi.object({
                    difficulty: Joi.string().valid('easy', 'medium', 'hard').insensitive().required(),
                });
        
                // Request parameter validation
                const { error } = schema.validate(req.params);
                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                }
        
                var result = await userModel.getRange(diff);
        
                if (result) {
                    res.send(result);
                } else {
                    res.status(404).send("Not found");
                }
            } catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        }
        
            
    }


module.exports = UserController;
