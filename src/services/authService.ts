import { Request, Response } from "express";
import Model from "../server/models";
import bcrypt from "bcryptjs";
import { responseHandler } from "../helpers/responseHandler";
import { generateToken, jwtVerification } from "../helpers/jwtVerification";
import { client } from "../server/config/redis";

export const signupService = async (req: Request, res: Response, property: string) => {
    const { first_name, last_name, email, password, phone } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const user = await Model[property].create({
        first_name,
        last_name,
        email,
        password: hashed_password,
        phone
    });
    user.password = undefined;
    //generate token
    const token = generateToken(user.id);
    await client.setEx(`${property}_${user.id.toString()}`, 60000, token);
    const {id, photo, status, is_verified } = user;
    const user_data = { id, email, first_name, last_name, phone, photo, status, is_verified, token };
    return user_data;
}

export const loginService = async (req: Request, res: Response, property: string) => {
    const { email, password } = req.body;
    const user = await Model[property].findOne({ where: { email }});
    if(!user){
        return responseHandler(res, 401, false, "Invalid Email or Password");
    }
    const verify_password = await bcrypt.compare(password, user.password);
    if(!verify_password){
        return responseHandler(res, 401, false, "Invalid Email or Password");
    }
    //generate token
    const token = generateToken(user.id);
    await client.setEx(`${property}_${user.id.toString()}`, 60000, token);
    const {id, first_name, last_name, phone, photo, status, is_verified } = user;
    const user_data = { id, email, first_name, last_name, phone, photo, status, is_verified, token };
    return responseHandler(res, 200, true, "Login Successful", user_data);
}

export const logoutService = async (req: Request, res: Response, property: string) => {
        const token = `${req.headers.token}`;
        const verification = jwtVerification(token) as any;
        if(!verification.id){
            return responseHandler(res, 401, false, "Invalid Token");
        }
        const redis_token = await client.get(`${property}_${verification.id.toString()}`);

        if(redis_token){
            await client.DEL(`${property}_${verification.id.toString()}`);
        }

        return responseHandler(res, 200, true, "Account Successfully Logged Out");
}