import express from "express";
import cors from "cors";
import logger from "./config/logger-config";
import sequelize from "./database/config/sequalize-config";

const application = async () => {
  try {
    const app = express();

    app.use(
      cors({
        origin: ["http://localhost:5173"],
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

    return app;
  } catch (error) {
    throw error;
  }
};

export default application;
