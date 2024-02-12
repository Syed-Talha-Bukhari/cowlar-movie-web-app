import { IRequest, IResponse } from "../../types/express";
import { NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/appError";
import verifyUserService from "../../services/auth/verifyUser";

const verifyUserController = catchAsync(
  async (req: IRequest, res: IResponse, next: NextFunction) => {
    const user = await verifyUserService(req.user.id, next);
    if (!user) return next(new AppError("Token is not valid", 403));

    return res.status(200).json({
      message: "success",
      data: {
        name: user?.name,
        email: user?.email,
      },
    });
  }
);

export default verifyUserController;
