const Joi = require('joi');
const partnerModel = require('../model/PartnerShip');


class PartnerController {


    static async getPartnerships(req, res) {
        try {

            var result = await partnerModel.getAllPartnerships();

            if (result) {
                
                res.status(200).json(result);

            } else {
                res.status(404).send("No partnerships found");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }


    static async getPartnershipsID(req, res) {
        const id = req.params.id; // Extract the partnership ID from the route parameter
        if (!id || id < 0) {
            return res.status(400).json('Invalid Partnership ID'); //  invalid ID
        }
    
        try {
            var result = await partnerModel.getAllPartnershipsID(id);
    
            if (result && result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).send("No partnerships found");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }


    static async insertNewPartnership(req, res) {
        try {
            var name = req.body.partnerName;
            var type = req.body.partnershipType;
            var email = req.body.contactemail;
            var description = req.body.description;

            const allowedValues = ['Online store', 'Work store'];
    
            const schema = Joi.object({
                partnerName: Joi.string().min(3).max(45).required(),
                partnershipType: Joi.string().valid(...allowedValues.map(value => value.toLowerCase())).insensitive().required(),
                contactemail: Joi.string().email().required(), 
                description: Joi.string().min(10).max(45).required()
            });
            
            // Request validation
            const { error } = schema.validate(req.body);
    
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
      
            var result = await partnerModel.insertpartner(name,type,email,description);
            if (result) {
                res.send(result);
            } else {
                res.status(404).send("Failed in adding partnership");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
    

static async getPartnershipsByType(req,res){

    const type = req.params.type; 
    const allowedValues = ['Online store', 'Work store'];
    const schema = Joi.object({
        type: Joi.string().valid(...allowedValues.map(value => value.toLowerCase())).insensitive()
    });

        // Request validation
       const { error } = schema.validate(req.params);

        
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
       }
  
        var result = await partnerModel.getByType(type);
        if (result) {
            res.send(result);
        } else {
            res.status(404).send("No result found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }


    static async deletePartnership(req,res){

        const id = req.params.id; 

        const schema = Joi.object({
            id: Joi.number().min(1).required()
        });

      // Request validation
      const { error } = schema.validate(req.params);

        
      if (error) {
          return res.status(400).json({ error: error.details[0].message });
     }

      var result = await partnerModel.delete(id);
      if (result) {
          res.send('deleted successfully');
      } else {
          res.status(404).send("Failed in deleting..");
      }
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }


static async UpdatePartnerShip(req,res){

    try {
        var name = req.body.partnerName;
        var type = req.body.partnershipType;
        var email = req.body.contactemail;
        var description = req.body.description;

        const allowedValues = ['Online store', 'Work store'];

        const schema = Joi.object({
            partnerName   : Joi.string().min(3).max(45).required(),
            partnershipType  : Joi.string().valid(...allowedValues.map(value => value.toLowerCase())).insensitive(),
            contactemail  : Joi.string().email(), 
            description : Joi.string().min(10).max(45)
        });
        
        // Request validation
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
  
        var result = await partnerModel.updatePartnerShip(name,type,email,description);
        if (result) {
            res.send('Updated successfully');
        } else {
            res.status(404).send("Failed in updating");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}







}








module.exports = PartnerController;
