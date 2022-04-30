const models = require('./models');

let uploadData = function (data){
    let data_placed = {'helmet_id' : data.helmet_id};

    models.helmet_test.findOne({where : data_placed}).then(
        hasValueFound => {
            if(hasValueFound){
                console.log("updating helmet data");
                models.helmet_test.update(data, {where : data_placed});
            } else {
                console.log("new helmet detected, creating new data");
                models.helmet_test.create(data);
            }
        }
    )
}

let dataFrom = function (helmet_id) {
  let data_placed = { helmet_id: helmet_id };

  return new Promise((resolve) => {
    models.helmet_test.findOne({ where: data_placed }).then((datas) => {
      resolve(datas);
    });
  });
};

module.exports.uploadData = uploadData;
module.exports.dataFrom = dataFrom;