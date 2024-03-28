const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'communicraft',
    user: 'root',
    password: 'root123'
});

// Promisify the connection.query method to use async/await
connection.queryAsync = function(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = connection;
