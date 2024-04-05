import { Request, Response } from "express";

export const responseHandler =  (res: Response, statusCode: number, success:boolean, message:string | {}, data?:string | {} | []) => {
    res.status(statusCode).json({ success, statusCode, message, data});
}