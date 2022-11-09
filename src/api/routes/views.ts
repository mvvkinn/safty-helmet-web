import { Router } from "express";
import getField from "@api/middlewares/getField";
import getWorker from "@api/middlewares/getWorker";
import getHelmet from "@api/middlewares/getHelmet";

const router = Router();

export default (app: Router) => {
  app.use(router);

  router.get("/", getField);

  router.get("/workerList/:id", getWorker);

  router.get("/userDashboard/:id", getHelmet);
};
