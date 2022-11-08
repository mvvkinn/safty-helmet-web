import Worker from "./Worker";
import Helmet from "./Helmet";
import Field from "./Field";
import { Sequelize } from "sequelize";

export default async (sequelizeInstance: Sequelize) => {
  const fieldModel = Field(sequelizeInstance);
  const workerModel = Worker(sequelizeInstance);
  const helmetModel = Helmet(sequelizeInstance);

  fieldModel.hasMany(workerModel, {
    foreignKey: "field_id",
    sourceKey: "field_id",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  workerModel.belongsTo(fieldModel, {
    foreignKey: "field_id",
    targetKey: "field_id",
    onDelete: "cascade",
    onUpdate: "cascade",
  });

  workerModel.hasOne(helmetModel, {
    foreignKey: "worker_id",
    sourceKey: "worker_id",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  helmetModel.belongsTo(workerModel, {
    foreignKey: "worker_id",
    targetKey: "worker_id",
  });

  await sequelizeInstance.sync();
};
