import { Router } from "express";
import views from "./routes/views";

export default () => {
  const app = Router();

  views(app);

  return app;
};
