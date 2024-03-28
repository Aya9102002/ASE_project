const connection = require('../database');

class SaleToolsModel {

    static async showSaleTools() {
        try {
            const sql = `
            SELECT
            users.UserName,
            users.UserEmail,
            saletools.description,
            saletools.availabletools,
            saletools.price,
            saletools.createdAt
            FROM
            saletools
            INNER JOIN
            users ON saletools.idusers = users.idusers;
            `;
            const result = await connection.queryAsync(sql);
            return result;
        } catch (error) {
            console.error("Error fetching sale tools:", error);
            throw new Error("Internal server error");
        }
    }
    
    static async addSaleTool(userId, toolId, description, availabletools, price) {
        try {
            const sql = "INSERT INTO saletools (idusers, idTools, description, availabletools, price) VALUES (?, ?, ?, ?, ?)";
            await connection.query(sql, [userId, toolId, description, availabletools, price]);
            return { message: "Sale tool added successfully" };
        } catch (error) {
            console.error("Error adding sale tool:", error);
            throw new Error("Internal server error");
        }
    }
    
    
    

    static async deleteTool(UserToolID) {
        try {
            const sql = "DELETE FROM saletools WHERE idsaletools = ?";
            const result = await connection.queryAsync(sql, [UserToolID]);
            if (result.affectedRows === 0) {
                throw new Error("Sale tool not found");
            }
            return "Sale tool deleted successfully";
        } catch (error) {
            console.error("Error deleting sale tool:", error);
            throw new Error("Internal server error");
        }
    }
    
    static async updateTool(UserToolID, idTools, description, availableTools, price) {
        try {
            const sql = "UPDATE saletools SET idTools = ?, description = ?, availabletools = ?, price = ? WHERE idsaletools = ?";
            const result = await connection.queryAsync(sql, [idTools, description, availableTools, price, UserToolID]);
            if (result.affectedRows === 0) {
                throw new Error("Sale tool not found");
            }
            return "Sale tool updated successfully";
        } catch (error) {
            console.error("Error updating sale tool:", error);
            throw new Error("Internal server error");
        } 
    }
    
    
    

    static async getPriceTool(minimumPrice, maximumPrice) {
        try {
            const sql = `
            SELECT users.UserName,  
            users.UserEmail,
            tools.ToolsName, 
            saletools.description, saletools.availabletools, saletools.price,saletools.createdAt
            FROM saletools 
            INNER JOIN users  ON saletools.idusers = users.idusers
            INNER JOIN tools  ON saletools.idTools = tools.idTools
            WHERE saletools.price BETWEEN ? AND ?
           `;
            const result = await connection.queryAsync(sql, [minimumPrice, maximumPrice]);
            return result;
        } catch (error) {
            console.error("Error fetching sale tools:", error);
            throw new Error("Internal server error");
        }
    }
    

    static async sameMeterialSaleTool(ToolID) {
        try {

            const sql = `
            SELECT users.UserName,  
            users.UserEmail,
            tools.ToolsName, 
            saletools.description, saletools.availabletools, saletools.price,saletools.createdAt
            FROM saletools 
            INNER JOIN users  ON saletools.idusers = users.idusers
            INNER JOIN tools  ON saletools.idTools = tools.idTools
            WHERE saletools.idTools = ?
             `;
    
            const result = await connection.queryAsync(sql, [ToolID]);
            return result;
        } catch (error) {
            console.error("Error fetching sale materials:", error);
            throw new Error("Internal server error");
        }
    }
    

    static async getSaleToolsBetween2Dates(startDate, endDate) {
        try {
            const sql = `
            SELECT 
            users.UserName,
            users.UserEmail,
            tools.ToolsName,
            saletools.description,
            saletools.availabletools,
            saletools.price,
            saletools.createdAt
        FROM
            saletools
                INNER JOIN
            users ON saletools.idusers = users.idusers
                INNER JOIN
            tools ON saletools.idTools = tools.idTools
            WHERE saletools.createdAt BETWEEN ? AND ?`
    
            const result = await connection.queryAsync(sql, [startDate, endDate]);
            const formattedResult = result.map(item => ({
                ...item,
                createdAt: new Date(item.createdAt).toLocaleString()
            }));
            return formattedResult;
        } catch (error) {
            console.error("Error fetching sale tools:", error);
            throw new Error("Internal server error");
        }
    }
    

    static async getToolsUser(userID) {
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

module.exports = SaleToolsModel;
