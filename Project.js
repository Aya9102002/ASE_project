
const db = require('../database');

class UserModel {
    static async getAllProjects() {
        return new Promise((resolve, reject) => {
            db.query("SELECT *  FROM ase_craft.project", [], (error, result) => {
                if (error) {
                    reject(error); // Reject the promise if there's an error
                } else {
                    resolve(result); // Resolve the promise with the query result
                }
            });
        });
    }



    static async getProjectInfo(id) {
    return new Promise(resolve => {
        // To check if the head exists in the user table
        db.query("SELECT * FROM prject WHERE idProjects = ?", [id], (err, rows) => {
            if (err) {
                resolve(false); 
            } else if (rows.length === 0) {
                resolve(false); // Head does not exist in the user table
            } else {
            db.query("SELECT * FROM ase_craft.project WHERE idProjects = ?", [id], (error, result) => {

                        if (!error) {
                            resolve(true); 
                        } else {
                            resolve(false); 
                        }
                    });
            }
        });
    });



    }


    static async insertproject(Title, Description, Groupsize, Difficulty, Head, Material) {
        return new Promise(resolve => {
            // To check if the head exists in the user table
            db.query("SELECT * FROM users WHERE UserName = ?", [Head], (err, rows) => {
                if (err) {
                    resolve(false); 
                } else if (rows.length === 0) {
                    resolve(false); // Head does not exist in the user table
                } else {
                    db.query("INSERT INTO project (ProjectsTitle, description, GroupSize, difficulty, head, users, materials) VALUES (?, ?, ?, ?, ?, ?, ?)",
                        [Title, Description, Groupsize, Difficulty, Head, Head, Material],
                        (error, result) => {
                            if (!error) {
                                resolve(true); 
                            } else {
                                resolve(false); 
                            }
                        });
                }
            });
        });
    }
    


static async deleteProject(id) {
    return new Promise(resolve => {
        db.query("SELECT * FROM project WHERE idProjects = ?", [id], (err, rows) => {
            if (err) {
                resolve(false); 
            } else if (rows.length === 0) {
                resolve(false); //project  does not exist in the user table
            } else {
       db.query("delete from project where idProjects = ?",[id],(err,res)=>{
    if (!err) {
                            resolve(true); 
                        } else {
                            resolve(false); 
                        }
                    });
            }
        });
    });
    
   
}
static async Update(title,diff,desc,size,materials,id){
 
   return new Promise(resolve => {
    db.query("SELECT * FROM project WHERE idProjects = ?", [id], (err, rows) => {
        if (err) {
            resolve(false); 
        } else if (rows.length === 0) {
            resolve(false); //project  does not exist in the user table
        } else {
               db.query("UPDATE project SET ProjectsTitle = ?, description = ?, GroupSize = ?, difficulty=?, materials=? WHERE idProjects = ?", [title, desc,size,diff,materials, id], (error, result) => {
                    if (!error) {
                        resolve(true); 
                    } else {
                        resolve(false); 
                    }
                });
        }
    });
});


 
}


   static async getRange(difficulty) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * from project WHERE LOWER(difficulty) = LOWER(?)", [difficulty], (error, result) => {
            if (error) {
                reject(error); // Reject the promise if there's an error
            } else {
                resolve(result); // Resolve the promise with the query result
            }
        });
    });
}




static async getRangeSize(size1) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM ase_craft.projects WHERE GroupSize <= ?", [size1], (error, result) => {
            if (error) {
                reject(error); // Reject the promise if there's an error
            } else {
                resolve(result); // Resolve the promise with the query result
            }
        });
    });
}


static async getGreater(size1) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM ase_craft.projects WHERE GroupSize >= ?", [size1], (error, result) => {
            if (error) {
                reject(error); // Reject the promise if there's an error
            } else {
                resolve(result); // Resolve the promise with the query result
            }
        });
    });
}



static async getsize(size1) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM ase_craft.projects WHERE GroupSize = ?", [size1], (error, result) => {
            if (error) {
                reject(error); // Reject the promise if there's an error
            } else {
                resolve(result); // Resolve the promise with the query result
            }
        });
    });
}


    }


module.exports = UserModel;
