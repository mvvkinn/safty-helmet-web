const mysql = require("mysql2");
const config = require("../config/config.json").mysql;

const pool = mysql.createPool(config).promise();

// get all helmet data from DB
const userDashboard = async (req, res) => {
  try {
    const sql =
      "SELECT * FROM helmet INNER JOIN worker on worker.worker_id = helmet.worker_id WHERE helmet_id = ?";
    const [data] = await pool.query(sql, req.params.id);

    res.render("userDashboard", { helmet: data });
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
    const sql = "SELECT updated_time FROM helmet";
    const data = await pool.query(sql);

    res.json(data[0]);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { userDashboard, getHelmetNum, getUpdatedTime };
