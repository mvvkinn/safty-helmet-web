import expressLoader from "./express";
import mqttLoader from "./mqtt";
import { Application } from "express";
import { Client } from "mqtt";
import logger from "./logger";
import dependencyInjector from "./dependencyInjector";

export default async (expressApp: Application) => {
  await expressLoader(expressApp);
  logger.info("Express Loaded");

  await mqttLoader();
  logger.info("MQTT Loaded");

  await dependencyInjector();
  logger.info("Dependency Injector loaded\n");
};
