import express from "express";
import config from "@config";
import loaders from "@loaders";
import logger from "@loaders/logger";

async function startService() {
  const app = express();

  await loaders(app);

  app.listen(config.port, () => {
    logger.info(`Server running on http://localhost:${config.port}`);
  });
}

startService();
