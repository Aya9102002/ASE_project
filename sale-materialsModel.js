const connection = require('../database');

class SaleMaterialsModel {

    static async showSaleMaterials() {
        try {
            const sql = `
                SELECT
                users.UserName,
                users.UserEmail,
                salematerials.description,
                salematerials.availableMaterials,
                salematerials.price,
                salematerials.createdAt
                FROM
                salematerials
                INNER JOIN
                users ON salematerials.idusers = users.idusers;
            `;
            const result = await connection.queryAsync(sql);
            return result;
        } catch (error) {
            console.error("Error fetching sale materials:", error);
            throw new Error("Internal server error");
        }
    }
    static async NewSaleMaterial(userId, materialId, description, availableMaterials, price) {
        try {
            const sql = "INSERT INTO salematerials (idusers, idMaterials, description, availableMaterials, price) VALUES (?, ?, ?, ?, ?)";
            await connection.query(sql, [userId, materialId, description, availableMaterials, price]);
            return { message: "sale material added successfully"  }; 
        } catch (error) {
            console.error("Error adding material:", error);
            throw new Error("Internal server error");
        }
    }
    
    

    static async deleteSaleMaterial(UserMaterialID) {
        try {
            const sql = "DELETE FROM salematerials WHERE UserMaterialID = ?";
            const result = await connection.queryAsync(sql, [UserMaterialID]);
            if (result.affectedRows === 0) {
                throw new Error("Sale material not found");
            }
            return "Sale material deleted successfully";
        } catch (error) {
            console.error("Error deleting sale material:", error);
            throw new Error("Internal server error");
        }
    }
    
    static async updateSaleMaterial(UserMaterialID, idMaterials, description, availableMaterials, price) {
        try {
            const sql = "UPDATE salematerials SET idMaterials = ?, description = ?, availableMaterials = ?, price = ? WHERE UserMaterialID = ?";
            const result = await connection.queryAsync(sql, [idMaterials, description, availableMaterials, price, UserMaterialID]);
            if (result.affectedRows === 0) {
                throw new Error("Sale material not found");
            }
            return "Sale material updated successfully";
        } catch (error) {
            console.error("Error updating sale material:", error);
            throw new Error("Internal server error");
        } 
    }
    
    
    /* static async updateComment(commentId, commentdescription) {
        try {
            const sql = "UPDATE comment SET commentdescription = ? WHERE idcomment = ?";
            await connection.queryAsync(sql, [commentdescription, commentId]);
            return { message: "Comment updated successfully" };
        } catch (error) {
            console.error("Error updating comment:", error);
            throw new Error("Internal server error");
        }
    } */
    
    

    static async getPrice(minimumPrice, maximumPrice) {
        try {
            const sql = `
                SELECT users.UserName,  
                users.UserEmail,
                materials.MaterialsName, 
                salematerials.description, salematerials.availableMaterials, salematerials.price,salematerials.createdAt
                FROM salematerials 
                INNER JOIN users  ON salematerials.idusers = users.idusers
                INNER JOIN materials  ON salematerials.idMaterials = materials.idMaterials
                WHERE salematerials.price BETWEEN ? AND ?
            `;
            const result = await connection.queryAsync(sql, [minimumPrice, maximumPrice]);
            return result;
        } catch (error) {
            console.error("Error fetching sale materials:", error);
            throw new Error("Internal server error");
        }
    }
    

    static async getSameMaterialSale(materialID) {
        try {
            const sql = `
                SELECT users.UserName,  users.UserEmail,
                materials.MaterialsName, 
                salematerials.description, salematerials.availableMaterials, salematerials.price,salematerials.createdAt 
                FROM salematerials 
                INNER JOIN users  ON salematerials.idusers = users.idusers
                INNER JOIN materials  ON salematerials.idMaterials = materials.idMaterials
                WHERE salematerials.idMaterials = ?
            `;
    
            const result = await connection.queryAsync(sql, [materialID]);
            return result;
        } catch (error) {
            console.error("Error fetching sale materials:", error);
            throw new Error("Internal server error");
        }
    }
    

    static async getSaleMaterialInDates(startDate, endDate) {
        try {
            const sql = `
                SELECT users.UserName, users.UserEmail,
                materials.MaterialsName,  
                salematerials.description, salematerials.availableMaterials, 
                salematerials.price , salematerials.createdAt
                FROM salematerials 
                INNER JOIN users  ON salematerials.idusers = users.idusers
                INNER JOIN materials  ON salematerials.idMaterials = materials.idMaterials
                WHERE salematerials.createdAt BETWEEN ? AND ?
            `;
    
            const result = await connection.queryAsync(sql, [startDate, endDate]);
            const formattedResult = result.map(item => ({
                ...item,
                createdAt: new Date(item.createdAt).toLocaleString()
            }));
            return formattedResult;
        } catch (error) {
            console.error("Error fetching sale materials:", error);
            throw new Error("Internal server error");
        }
    }
    

    static async getSaleMaterialForUser(userID) {
        try {
            const sql = `
                SELECT users.UserName,
                users.UserEmail,
                materials.MaterialsName, 
                salematerials.description, salematerials.availableMaterials, salematerials.price,salematerials.createdAt
                FROM salematerials 
                INNER JOIN users  ON salematerials.idusers = users.idusers
                INNER JOIN materials  ON salematerials.idMaterials = materials.idMaterials
                WHERE salematerials.idusers = ?
            `;
    
            const result = await connection.queryAsync(sql, [userID]);
            return result;
        } catch (error) {
            console.error("Error fetching sale materials for this user:", error);
            throw new Error("Internal server error");
        }
    }
    
}

module.exports = SaleMaterialsModel;
