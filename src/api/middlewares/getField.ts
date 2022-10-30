import { Container } from "typedi";
import { Logger } from "winston";
import { Response, Request, NextFunction } from "express";
import Field from "@models/Field";

const getField = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = Container.get("logger");
  try {
    const record = await Field.Read(["field_id", "field_name"]);

    res.render("index.ejs", { field: record });
  } catch (e) {
    logger.error("Error occured on index.ejs", e);
    throw e;
  }
};

export default getField;
