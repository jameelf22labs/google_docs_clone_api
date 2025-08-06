import http from "http";
import application from "./app";
import EnvConfig from "./config/env-config";
import logger from "./config/logger-config";
import { Server as SocketIOServer } from "socket.io";

application()
  .then((app) => {
    const server = http.createServer(app);
    const io = new SocketIOServer(server);
    io.on("connection", (socket) => {
      logger.info("New Socker Client ", socket.id);
    });
    server.listen(EnvConfig.Port, () => {
      logger.info("Application running on port ", EnvConfig.Port);
    });
  })
  .catch((error) => {
    logger.info("Application falied to start");
    console.error(error);
    process.exit(1);
  });
