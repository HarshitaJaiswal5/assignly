import { Request, Response, NextFunction } from "express";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

export const asyncController = (
  controller: AsyncController
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(controller(req, res, next)).catch(next);
  };
};