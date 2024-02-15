import { NextFunction } from "express";
import UserModel from "../../models/user";


const verifyUserService = async (userId: string, next: NextFunction) => {

    const user = await UserModel.findById(userId);

    return user;
}

export default verifyUserService;