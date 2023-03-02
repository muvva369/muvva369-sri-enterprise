import { Request, Response, NextFunction } from "express";
import CustomError from "./controllers/customError.controller";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Something broke!' });
  }
  next()
};
