import expressLoader from "./express";
import mqttInstance from "./mqtt";
import { Application } from "express";
import logger from "./logger";
import dependencyInjector from "./dependencyInjector";
import sequelizeLoader from "./sequelize";
import socketIo from "./socket.io";
import { Server } from "http";

export default async (expressApp: Application, httpServer: Server) => {
  const sequelizeInstance = await sequelizeLoader;
  logger.info("DB Connected");

  await expressLoader(expressApp);
  logger.info("Express Loaded");

  const mqttClient = mqttInstance;
  logger.info("MQTT Loaded");

  await dependencyInjector(sequelizeInstance, mqttClient, httpServer);
  logger.info("Dependency Injector loaded\n");
};
