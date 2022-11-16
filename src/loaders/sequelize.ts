import { DataTypes, Sequelize } from "sequelize";
import config from "@config";
import LoggerInstance from "./logger";

//const opitons = { logging: msg => LoggerInstance.debug(msg) };
const sequelize = new Sequelize(config.db, {
  logging: msg => LoggerInstance.debug(msg),
});

sequelize.authenticate();

export default sequelize;
