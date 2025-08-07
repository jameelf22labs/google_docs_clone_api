import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import logger from "./config/logger-config";
import sequelize from "./database/config/sequalize-config";
import { collabRouter, notesRouter } from "./module";
import globalErrorMiddleware from "./middleware/global-exception.middleware";
import EnvConfig from "./config/env-config";

const application = async () => {
  try {
    const app = express();

    app.use(
      cors({
        origin: [
          EnvConfig.UiHostUrl,
          "http://localhost:5173",
          "http://localhost:4173",
        ],
        credentials: true,
      })
    );

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((req, res, next) => {
      const time = new Date(Date.now()).toString();
      logger.info(req.method, req.hostname, req.path, time);
      next();
    });

    app.get("/", (_req, res) => {
      res.status(200).json({
        message: "Hello World",
      });
    });

    await sequelize.authenticate();
    await sequelize.sync({});

    logger.info("Sequelize with Postgres Connected");

    app.use("/api/v1/notes", notesRouter);
    app.use("/api/v1/collab", collabRouter);

    app.use(globalErrorMiddleware);

    return app;
  } catch (error) {
    throw error;
  }
};

export default application;
