const models = require("./models");
const mysql = require("mysql");
const config = require("../business/config.json").mysql;

let mysql_client = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: "safty_helmet",
});

mysql_client.connect();

let dbReturns = selectFromHelmetID();

console.log(dbReturns);

function selectFromHelmetID() {
  let sql = "SELECT * FROM `helmet` WHERE `helmet`.`helmet_id` = 1";
  let result;

  return new Promise(resolve => {
    mysql_client.query(sql, (error, rows, fields) => {
      if (error) throw error;
      console.log(rows);

      
    });
  });
}

let uploadData = function (data) {
  let data_placed = { helmet_id: data.helmet_id };

  models.helmet_test.findOne({ where: data_placed }).then(hasValueFound => {
    if (hasValueFound) {
      models.helmet_test.update(data, { where: data_placed });
    } else {
      models.helmet_test.create(data);
    }
  });
};

let readDataFromHelmetId = function (helmet_id) {
  let data_placed = { helmet_id: helmet_id };

  return new Promise(resolve => {
    models.helmet_test.findOne({ where: data_placed }).then(datas => {
      resolve(datas);
    });
  });
};

module.exports.uploadData = uploadData;
module.exports.readDataFromHelmetId = readDataFromHelmetId;
