import { Request, Response } from "express";
import { responseHandler } from "../helpers/responseHandler";
import { errorHandler } from "../helpers/errorHandler";
import { loginService, logoutService, signupService } from "../services/authService";

export const vendorSignup = async (req: Request, res: Response) => {
    try {
        const vendor = await signupService(req, res, 'Vendor');
        return responseHandler(res, 201, true, "Account Successfully Created", vendor);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const vendorLogin = async (req: Request, res: Response) => {
    try {
        await loginService(req, res, 'Vendor');
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const vendorLogout = async (req: Request, res: Response) => {
    try {
        await logoutService(req, res, 'Vendor');
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const customerSignup = async (req: Request, res: Response) => {
    try {
        const customer = await signupService(req, res, 'Customer');
        return responseHandler(res, 201, true, "Account Successfully Created", customer);
        
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const customerLogin = async (req: Request, res: Response) => {
    try {
      await loginService(req, res, 'Customer');
        
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const customerLogout = async (req: Request, res: Response) => {
    try {
        await logoutService(req, res, 'Customer');
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}