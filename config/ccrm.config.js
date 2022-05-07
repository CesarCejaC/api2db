require('dotenv').config()
'use strict';
const mysql = require('mysql');

const HOST = process.env.HOST
const USER = process.env.USER
const PWD = process.env.PWD
const ALT_DB = process.env.ALT_DB

// mysql db connection
const dbConn1 = mysql.createConnection({
    host     : HOST,
    user     : USER,
    password : PWD,
    database : ALT_DB
});
dbConn1.connect((err)=> {
    if (err) throw err;
    console.log("Database ccrm connected!");
});
module.exports = dbConn1;