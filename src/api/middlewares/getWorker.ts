import { Container } from "typedi";
import { Logger } from "winston";
import { Response, Request, NextFunction } from "express";
import { Sequelize } from "sequelize";

const getWorker = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = Container.get("logger");
  const db: Sequelize = Container.get("db");
  const workerModel = db.models.Worker;
  const fieldModel = db.models.Field;

  try {
    const WorkerRecord = await workerModel.findAll({
      attributes: ["worker_id", "worker_name", "field_id"],
      where: {
        field_id: req.params.id,
      },
      include: ["Helmet"],
    });

    const fieldRecord = await fieldModel.findByPk(req.params.id);

    res.render("workerList.ejs", { field: fieldRecord, worker: WorkerRecord });
  } catch (e) {
    logger.error("Error reading Worker", e);
    next(e);
  }
};

export default getWorker;
