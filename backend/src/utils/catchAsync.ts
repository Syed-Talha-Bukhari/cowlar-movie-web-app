import { NextFunction } from "express";
import { IRequest, IResponse } from "./../types/express";

const catchAsync = (
  fn: (req: IRequest, res: IResponse, next: NextFunction) => any
): ((req: IRequest, res: IResponse, next: NextFunction) => any) => {
  return (req: IRequest, res: IResponse, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export {catchAsync};