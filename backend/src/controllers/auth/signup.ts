import { IRequest, IResponse } from "../../types/express";
import { NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/appError";
import { createToken } from "../../utils/jwt";
import signupService from "../../services/auth/signup";
import checkEmailService from "../../services/auth/checkEmail";

const signUpController = catchAsync(async (req: IRequest, res: IResponse, next: NextFunction) => {
    const { name, password, email, phoneNumber } = req.body;

    const existingUser = await checkEmailService(email);

    if(existingUser){
        return next(new AppError("User with this email already exists", 400));
    }

    const user = await signupService(name, password, email, phoneNumber);

    if (!user) {
        return next(new AppError("Sign up process failed! Pleae try again", 500));
    }

    const jwtToken = createToken(user._id, next);

    return res.status(200).json({
        message: "success",
        token: jwtToken,
        data: {
            name: user?.name,
            email: user?.email,
        }
    })
});

export default signUpController;


