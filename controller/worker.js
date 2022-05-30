const mysql = require("mysql2");
const config = require("../config/config.json").mysql;

const pool = mysql.createPool(config).promise();

// get all worker data from DB
const getWorkerData = async (req, res) => {
  try {
    const sql = "SELECT * FROM `worker`";
    const data = await pool.query(sql);

    res.json(data[0]);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
