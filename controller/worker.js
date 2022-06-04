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

const workerList = async (req, res) => {
  try {
    const sql =
      "SELECT * FROM field INNER JOIN worker on worker.field_id = field.field_id  INNER JOIN helmet on worker.worker_id = helmet.helmet_id WHERE worker.field_id = ?";
    const [data] = await pool.query(sql, req.params.id);

    res.render("workerList.ejs", { worker: data });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getWorkerData,
  workerList,
};
