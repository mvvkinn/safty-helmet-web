import { Container } from "typedi";
import { Logger } from "winston";
import { Response, Request, NextFunction } from "express";
import { Sequelize } from "sequelize";

const getHelmet = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = Container.get("logger");
  const db: Sequelize = Container.get("db");
  const helmetModel = db.models.Helmet;

  try {
    const helmetRecord = await helmetModel.findByPk(req.params.id, {
      include: "Worker",
    });

    console.log(helmetRecord);

    res.render("userDashboard", {
      helmet: helmetRecord,
    });
  } catch (e) {
    logger.error("Error reading Worker", e);
    next(e);
  }
};

export default getHelmet;
