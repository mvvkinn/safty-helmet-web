import expressLoader from "./express";
import mqttLoader from "./mqtt";
import { Application } from "express";
import logger from "./logger";
import dependencyInjector from "./dependencyInjector";
import sequelizeLoader from "./sequelize";

export default async (expressApp: Application) => {
  const sequelizeInstance = await sequelizeLoader();
  logger.info("DB Connected");

  await expressLoader(expressApp);
  logger.info("Express Loaded");

  const mqttClient = await mqttLoader();
  logger.info("MQTT Loaded");

  await dependencyInjector(sequelizeInstance);
  logger.info("Dependency Injector loaded\n");
};
