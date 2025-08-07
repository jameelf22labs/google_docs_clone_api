import { NextFunction, Request, Response } from "express";
import logger from "../config/logger-config";
import BadRequestError from "../errors/BadRequestError";
import NotFoundError from "../errors/NotFoundError";

const globalErrorMiddleware = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(err.message);
  logger.error(err.stack);

  if (err instanceof BadRequestError) {
    return response.status(err.statusCode).json({
      status: false,
      message: "Bad Request",
      error: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return response.status(err.statusCode).json({
      status: false,
      message: "Not found",
      error: err.message,
    });
  }

  return response.status(400).json({
    status: false,
    message: "Internal Server Error",
    error: {},
  });
};

export default globalErrorMiddleware;
