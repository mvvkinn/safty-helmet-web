import mysql from "mysql2";

const config = require("../config/config.json").mysql;

const pool = mysql.createPool(config).promise();

module.exports = pool;
