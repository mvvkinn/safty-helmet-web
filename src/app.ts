import express from "express";
import config from "@config";
import loaders from "@loaders";
import logger from "@loaders/logger";
import socketio, { Server } from "socket.io";
import { createServer } from "http";

async function startService() {
  const app = express();
  const httpServer = createServer(app);

  await loaders(app, httpServer);

  httpServer.listen(config.port, () => {
    logger.info(`Server running on http://localhost:${config.port}`);
  });
}

process.setMaxListeners(15);

startService();
