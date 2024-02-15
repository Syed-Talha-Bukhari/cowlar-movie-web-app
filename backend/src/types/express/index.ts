import { Request, Response } from 'express';

export interface IRequest extends Request {
    [key: string]: any
}

export interface IResponse extends Response {
    [key: string]: any
}

export interface IError extends Error {
    statusCode: number;
    status: string;
    name: string,
    code: number
}