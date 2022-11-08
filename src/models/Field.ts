import { DataTypes, Model, Sequelize } from "sequelize";

const schema = {
  field_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  field_name: DataTypes.STRING,
  field_addr: DataTypes.STRING,
};

export default (sequelize: Sequelize) => {
  const Field = sequelize.define("Field", schema, {
    tableName: "field",
    timestamps: false,
  });

  return Field;
};
