import getWorker from "@api/middlewares/getWorker";
import { Router } from "express";
import Container from "typedi";
import { Logger } from "winston";
import Field from "@models/Field";
import getField from "@api/middlewares/getField";

const router = Router();

export default (app: Router) => {
  app.use(router);

  router.get("/", getField);
  router.get("/workerList/:id", getWorker);
};
