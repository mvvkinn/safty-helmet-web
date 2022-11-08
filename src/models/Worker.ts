import { DataTypes, Sequelize } from "sequelize";

const schema = {
  worker_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    primaryKey: true,
  },
  worker_name: DataTypes.STRING,
  worker_position: DataTypes.STRING,
  group_name: DataTypes.STRING,
  field_id: DataTypes.NUMBER,
};

export default (sequelize: Sequelize) => {
  const Worker = sequelize.define("Worker", schema, {
    tableName: "worker",
    timestamps: false,
  });

  return Worker;
};
