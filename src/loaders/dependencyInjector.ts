import models from "@models";
import { Sequelize } from "sequelize";
import { Container } from "typedi";
import LoggerInstance from "./logger";

export default async (sequelizeInstance: Sequelize) => {
  Container.set("logger", LoggerInstance);

  Container.set("db", sequelizeInstance);

  models(sequelizeInstance);
};
