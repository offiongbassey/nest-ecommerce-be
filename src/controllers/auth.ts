import { Request, Response } from "express";
import { responseHandler } from "../helpers/responseHandler";
import { errorHandler } from "../helpers/errorHandler";
import { signupService } from "../services/authService";
import Model from "../server/models";
import bcrypt from "bcryptjs";
import { generateToken, jwtVerification } from "../helpers/jwtVerification";
import { client } from "../server/config/redis";

export const vendorSignup = async (req: Request, res: Response) => {
    try {
        const vendor = await signupService(req, res);
        return responseHandler(res, 201, true, "Account Successfully Created", vendor);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const vendorLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const vendor = await Model.Vendor.findOne({ where: { email }});
        if(!vendor){
            return responseHandler(res, 400, false, "Invalid email or password");
        }
        const verify_password = await bcrypt.compare(password, vendor.password);
        if(!verify_password){
            return responseHandler(res, 400, false, "Invalid email or password");
        }

        //generating token
        const token = generateToken(vendor.id);

        //saving token to redis server
       await client.setEx(`vendor_${ vendor.id.toString() }`, 60000, token)

        const { id, first_name, last_name, phone, is_verified, photo, status } = vendor;
        const user_info = { id, email, first_name, last_name, phone, is_verified, photo, status, token };
        
        return responseHandler(res, 200, true, "Login Successful", user_info);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const vendorLogout = async (req: Request, res: Response) => {
    try {
        const token = `${req.headers.token}`;
        const verification = jwtVerification(token) as any;
        const redis_token = await client.get(`vendor_${verification.id.toString()}`);
        if(redis_token){
            await client.DEL(`vendor_${verification.id.toString()}`);
        }

        return responseHandler(res, 200, true, "Account Successfully Logged Out");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}