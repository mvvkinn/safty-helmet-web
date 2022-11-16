import { Container } from "typedi";
import { Logger } from "winston";
import { Response, Request, NextFunction } from "express";
import { Sequelize } from "sequelize";

const getField = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = Container.get("logger");
  const db: Sequelize = Container.get("db");
  const fieldModel = db.models.Field;

  try {
    const record = await fieldModel.findAll();

    res.render("index.ejs", { field: record });
  } catch (e) {
    logger.error("Error occured on index.ejs", e);
    throw e;
  }
};

export default getField;
