import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth.interface";
import HttpStatusCodes from "http-status-codes";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import loggerWithNameSpace from "../utils/logger";
import { ServerError } from "../error/ServerError";
import { BadRequestError } from "../error/BadRequestError";
import { ClientError } from "../error/ClientError";
import { NotFoundError } from "../error/NotFoundError";

const logger = loggerWithNameSpace("ErrorHandler");

export function routeNotFoundError(req: Request, res: Response) {
  return res.status(HttpStatusCodes.NOT_FOUND).json({
    message: "Not Found",
  });
}

export function genericErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.stack) {
    logger.error(error.stack);
  }
  
  if (error instanceof UnauthenticatedError) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({
      message: error.message,
    });
  }else if(error instanceof ServerError){
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    })
  }else if(error instanceof BadRequestError){
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      message: error.message,
    })
  }else if(error instanceof ClientError){
    return res.status(HttpStatusCodes.FORBIDDEN).json({
      message: error.message,
    })
  }else if(error instanceof NotFoundError){
    return res.status(HttpStatusCodes.NOT_FOUND).json({
      message: error.message,
    })
  }

  return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
  });
}

