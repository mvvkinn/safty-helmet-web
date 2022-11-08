import { Container } from "typedi";
import { Logger } from "winston";
import { Response, Request, NextFunction } from "express";
import Worker from "@models/Worker";
import Field from "@models/Field";
import Helmet from "@models/Helmet";

const getWorker = async (req: Request, res: Response, next: NextFunction) => {
  const Logger: Logger = Container.get("logger");

  try {
    const workerRecord = await Worker.Read([
      "worker_id",
      "worker_name",
      "field_id",
    ]);
    console.log(workerRecord);
    const fieldRecord = await Field.Read();
    console.log(fieldRecord);

    //id, name, temperature, humid, ligntness, status
    const helmetRecord = await Helmet.Read([
      "helmet_id",
      "worker_id",
      "temp",
      "humid",
      "photoresistor",
      "shock",
      "worker_danger",
    ]);
    console.log(helmetRecord);

    res.render("workerList.ejs", { worker: workerRecord });
  } catch (e) {
    Logger.error("Error reading Worker", e);
    next(e);
  }
};

export default getWorker;
