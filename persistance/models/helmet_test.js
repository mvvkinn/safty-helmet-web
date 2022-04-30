'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class helmet_test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  helmet_test.init({
    helmet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    temp: DataTypes.FLOAT,
    humid: DataTypes.FLOAT,
    photoresistor: DataTypes.INTEGER,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    distance: DataTypes.INTEGER,
    shock: DataTypes.BOOLEAN,
    worker_danger: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'helmet_test',
    timestamps: false,
  });
  return helmet_test;
};