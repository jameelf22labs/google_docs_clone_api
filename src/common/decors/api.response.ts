import { NextFunction, Request, Response } from "express";

interface ApiResponseOptions {
  message?: string;
}

const ApiResponse = (options: ApiResponseOptions = {}) => {
  return function (
    _: any,
    __: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;
    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const data = await originalMethod.apply(this, [req, res, next]);
        if (res.headersSent) return;
        return res.status(200).json({
          status: true,
          message: options.message || "Success",
          data,
        });
      } catch (error) {
        next(error);
      }
    };

    return descriptor;
  };
};

export default ApiResponse;
