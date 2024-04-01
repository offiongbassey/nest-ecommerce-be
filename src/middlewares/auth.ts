import { Request, Response, NextFunction } from "express"
import { errorHandler } from "../helpers/errorHandler"
import { responseHandler } from "../helpers/responseHandler";
import { jwtVerification } from "../helpers/jwtVerification";
import { client } from "../server/config/redis";
import Model from "../server/models";

export const authMiddleware = (userType: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = `${req.headers.token}`;
        if(!req.headers.token){
            return responseHandler(res, 401, false, "Token is required");
        }
        const verification = jwtVerification(token) as any;
        if(!verification.id){
            return responseHandler(res, 401, false, "User not logged In");
        }

        const redis_token = await client.get(`${userType === "vendor" ? "Vendor" : "Customer"}_${verification.id.toString()}`);
        if(!redis_token){
            return responseHandler(res, 401, false, "User not logged In");
        }
        if(userType === "vendor"){
            const vendor = await Model.Vendor.findOne({ where: { id: verification.id }});
            if(!vendor){
                return responseHandler(res, 401, false, "Vendor not found");
            }
            req.vendor = vendor;
        }else if(userType === "customer"){
            const customer = await Model.Customer.findOne({ where: { id: verification.id }});
            if(!customer){
                return responseHandler(res, 401, false, "Account not found");
            }
            req.customer = customer;
        }
        next();
        

    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const vendorAuth = authMiddleware("vendor");
export const customerAuth = authMiddleware("customer");