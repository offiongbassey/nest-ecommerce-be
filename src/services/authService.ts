import { Request, Response } from "express";
import Model from "../server/models";
import bcrypt from "bcryptjs";
import { responseHandler } from "../helpers/responseHandler";

export const signupService = async (req: Request, res: Response) => {
    const { first_name, last_name, email, password, phone } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const register = await Model.Vendor.create({
        first_name,
        last_name,
        email,
        password: hashed_password,
        phone
    });
    register.password = undefined;
    return register;
}