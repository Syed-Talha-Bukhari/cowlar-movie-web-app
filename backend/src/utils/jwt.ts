import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './appError';
import { IRequest } from '../types/express';
import { Types } from "mongoose";

export const createToken = (id: string | Types.ObjectId, next: NextFunction) => {
	const jwtKey  = process.env.JWT_SECRET_KEY;

    if (!jwtKey) {
		return next(new AppError("Internal Server Error", 500))
	}

	const token = jwt.sign({ id }, jwtKey, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});

    if(!token){
        return next(new AppError("Internal Server Error", 500))
    }

	return token;
};

export const getUserFromRequest = (req: IRequest, next : NextFunction) => {
    let token: string = "";

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}

    if(!token){
        return next(new AppError("Invalid access token", 401))
    }

    const jwtKey = process.env.JWT_SECRET_KEY;

    if (!jwtKey) {
		return next(new AppError("Internal Server Error", 500))
	}
    
    const decoded = jwt.verify(token, jwtKey);

	if (typeof decoded === 'string') {
		return next(new AppError("Invalid access token", 401))
	}

	return decoded.id;
}