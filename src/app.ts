import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import logger from "./config/logger-config";
import sequelize from "./database/config/sequalize-config";
import { notesRouter } from "./module";
import globalErrorMiddleware from "./middleware/global-exception.middleware";
import redis from "./config/redis-config";

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

    app.get(
      "/api/v1/collab/:noteId",
      async (request: Request, response: Response, next: NextFunction) => {
        try {
          const { noteId } = request.params;
          const roomKey = `room:${noteId}`;
          const collabrators = await redis.smembers(roomKey);
          const parsedCollab = collabrators.map((collab) => JSON.parse(collab));
          return response.status(200).json({
            data: {
              collabrator : parsedCollab,
            },
            message: "Retrive collabse",
            status: true,
          });
        } catch (error) {
          next(error);
        }
      }
    );

    await sequelize.authenticate();
    await sequelize.sync({});

    logger.info("Sequelize with Postgres Connected");

    app.use("/api/v1/notes", notesRouter);
    app.use(globalErrorMiddleware);

    return app;
  } catch (error) {
    throw error;
  }
};

export default application;
