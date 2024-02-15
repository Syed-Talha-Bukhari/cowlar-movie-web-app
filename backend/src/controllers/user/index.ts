import { IRequest, IResponse } from "../../types/express";
import { NextFunction } from "express";
import { AppError } from "../../utils/appError";
import { catchAsync } from "../../utils/catchAsync";
import { deleteUserService } from "../../services/user";

const deleteUser = catchAsync(
  async (req: IRequest, res: IResponse, next: NextFunction) => {
    const deletedUser = await deleteUserService(req.user.id);

    if (!deletedUser) {
        return next(new AppError("User deletion process failed", 404));
      }

    return res.status(204).json({
      message: "success",
    });
  }
);

export { deleteUser };
