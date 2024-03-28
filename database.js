const mysql = require("mysql");


const db = mysql.createPool({
    host: 'localhost',
    database: 'ase_craft',
    user: 'root',
    password: '123456',
    port : 3306,
    connectionLimit:10
});


module.exports = db; // reuse the connection of database