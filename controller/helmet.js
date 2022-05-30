const mysql = require("mysql2");
const config = require("../config/config.json").mysql;

const pool = mysql.createPool(config).promise();

// get all helmet data from DB
const getHelmetData = async (req, res) => {
  try {
    const sql = "SELECT * FROM `helmet` WHERE `helmet`.`helmet_id` = 1";
    const data = await pool.query(sql);

    res.json(data[0]);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// get helet IDs from DB
const getHelmetNum = async (req, res) => {
  try {
    const sql = "SELECT helmet_id FROM helmet";
    const data = await pool.query(sql);

    res.json(data[0]);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getUpdatedTime = async (req, res) => {
  try {
    const sql = "SELECT updated_time FROM helmet"; // where helmet_id = " + req
    const data = await pool.query(sql);

    res.json(data[0]);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getHelmetData, getHelmetNum, getUpdatedTime };
