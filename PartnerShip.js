const db = require('../database');
const Joi = require('joi');

class PartnershipModel{

static async getAllPartnerships(){
    return new Promise((resolve, reject) => {
        db.query("SELECT *  FROM ase_craft.partnership", [], (error, result) => {
            if (error) {
                reject(error); // Reject the promise if there's an error
            } else {
                resolve(result); // Resolve the promise with the query result
            }
        });
    });


}


static async getAllPartnershipsID(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM ase_craft.partnership WHERE idpartnership = ?", [id], (error, result) => {
            if (error) {
                reject(error); // Reject the promise if there's an error
            } else {
                resolve(result); // Resolve the promise with the query result
            }
        });
    });


}


static async insertpartner(Name, type, Email, description) {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO partnership (partnerName, partnershipType, contactemail, description) VALUES (?, ?, ?, ?)",
            [Name, type, Email, description],
            (error, result) => {
                if (error) {
                    reject(error); // Reject the promise if there's an error
                } else {
                    resolve(result); // Resolve the promise with the query result
                }
            }
        );
    });
}

static async getByType(type) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM ase_craft.partnership WHERE partnershipType = ?", [type], (error, result) => {
            if (error) {
                reject(error); // Reject the promise if there's an error
            } else {
                resolve(result); // Resolve the promise with the query result
            }
        });
    });
}
static async delete(id){


    return new Promise((resolve, reject) => {
        db.query("DELETE FROM ase_craft.partnership WHERE idpartnership = ?", [id], (error, result) => {            if (error) {
                reject(error); // Reject the promise if there's an error
            } else {
                resolve(result); // Resolve the promise with the query result
            }
        });
    });



}


static async updatePartnerShip(name, type, email, description, id) {
    return new Promise((resolve, reject) => {
        db.query("UPDATE ase_craft.partnership SET partnerName = ?, partnershipType = ?, contactemail = ?, description = ? WHERE idpartnership = ?", [name, type, email, description, id], (error, result) => {
            if (error) {
                reject(error); // Reject the promise if there's an error
            } else {
                resolve(result); // Resolve the promise with the query result
            }
        });
    });
}

}







module.exports = PartnershipModel;
