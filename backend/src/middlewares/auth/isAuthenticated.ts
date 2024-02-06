import { NextFunction } from "express";
import { IRequest, IResponse } from "../../types/express";
import { catchAsync } from "../../utils/catchAsync";
import { getUserFromRequest } from "../../utils/jwt";
import UserModel from "../../models/user";

const isAuthenticated = catchAsync(
  async (req: IRequest, res: IResponse, next: NextFunction) => {
    const id = getUserFromRequest(req, next);

    const user = await UserModel.findById(id);

    if (!user) {
      res
        .status(401)
        .json({ status: "fail", message: "No user exists with these credentials!" });
    }

    req.user = user;
    next();
  }
);

export default isAuthenticated;