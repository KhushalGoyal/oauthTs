import { NextFunction, Request, Response } from "express";
import HttpException from "./http-exception";

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status: number = error.status || 500;
  const message: string = error.message || "Something went wrong";
  const stack: string = error.stack ? error.stack : "-";
  response.status(status).send({
    status,
    message,
    stack,
  });
}

export default errorMiddleware;
