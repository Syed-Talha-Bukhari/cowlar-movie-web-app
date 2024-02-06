import { NextFunction } from "express";
import { IRequest, IResponse } from "../../types/express";
import { AppError } from "../../utils/appError";
import { catchAsync } from "../../utils/catchAsync";
import { createToken } from "../../utils/jwt";
import { loginService } from "../../services/auth";

const loginController = catchAsync(async (req: IRequest, res: IResponse, next: NextFunction) => {
    const { password, email } = req.body;

    const user = await loginService(email, password);

    if (!user) {
        return next(new AppError("Invalid Credentials. Please provide correct credentials", 401));
    }

    const jwtToken = createToken(user.id, next)

    return res.status(200).json({
        message: "success",
        token: jwtToken,
        data: {
            name: user?.name,
            email: user?.email,
        }
    });
});

export default loginController;