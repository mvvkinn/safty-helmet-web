import { DataTypes, Sequelize } from "sequelize";

const schema = {
  helmet_id: {
    type: DataTypes.NUMBER,
    required: true,
    index: true,
    primaryKey: true,
  },
  worker_id: {
    type: DataTypes.NUMBER,
    ref: "worker",
  },
  temp: DataTypes.NUMBER,
  humid: DataTypes.NUMBER,
  photoresistor: DataTypes.NUMBER,
  latitude: DataTypes.NUMBER,
  longitude: DataTypes.NUMBER,
  distance: DataTypes.NUMBER,
  shock: DataTypes.BOOLEAN,
  worker_danger: DataTypes.BOOLEAN,
  updated_time: DataTypes.DATE,
};

export default (sequelize: Sequelize) => {
  const Helmet = sequelize.define("Helmet", schema, {
    tableName: "helmet",
    timestamps: false,
  });

  return Helmet;
};
