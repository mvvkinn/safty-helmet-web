import { DataTypes, Sequelize } from "sequelize";
import config from "@config";
import LoggerInstance from "./logger";

export default async () => {
  const sequelize = new Sequelize(config.db, {
    logging: msg => LoggerInstance.debug(msg),
  });

  await sequelize.authenticate();

  return sequelize;
};
