import { validationResult } from "express-validator";
import { responseHandler } from "./responseHandler";
import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Model from "../server/models";

export const titleCase = async (name: string) => {
    return name?.toLocaleLowerCase()?.split(' ').map(function (text) {
        return (text?.charAt(0).toUpperCase() + text?.slice(1));
    }).join(' ');
}

export const checkAllowedFields = (payload: any, fields: string | string[]) => {
    payload = Array.isArray(payload) ? payload : [payload];

    payload.forEach((item: {}) => {
        const allowed = Object.keys(item).every(field => fields.includes(field));
        fields = typeof fields === 'string' ? fields : fields.join(', ');

        if(!allowed){
            throw new Error(`Wrong field passed. Allowed fields: ${ fields }`);
        }
    })
    return true;
}

export const validationHandler = (values: any[] = []) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        await Promise.all(values.map((value: { run: (arg0: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) => any; }) => value.run(req)));

        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        const _errors = errors.array();
        let message = "Invalid Parameters:";

        _errors.forEach((v) => {
            message += `${ v.msg },`;
        });
        responseHandler(res, 422, false, { errors: errors.array() })
    }
}

export const existingEmail = async (email: string, type: string, id?: string) => {
    const check_email_existence = await Model[type].findOne({ where: { email }});

    if(check_email_existence){
        if(!id){
            throw new Error("Email already exist.");
        }else{
            if(check_email_existence.id !== Number(id)){
                throw new Error("Email already exist.");
            }
        }
    }
    return true;
}

export const existingPhone = async (phone: string, type: string, id?: string) => {
    const check_phone_existence = await Model[type].findOne({ where: { phone } });

    if(check_phone_existence){
        if(!id){
            throw new Error("Phone Number already exist.");
        }else{
            if(check_phone_existence.id !== Number(id)){
                throw new Error("Phone Number already exist.")
            }
        }
    }
    return true;
}

export const acceptedPhoneNumber = async (phone: string) => {
    const phone_type = phone.charAt(0);
    if(phone_type === `+` && phone?.length !== 14){
        throw new Error("Wrong phone number type. Tips: 08011111111");
    }else if(Number(phone_type) === 0 && phone?.length !== 11){
        throw new Error("Wrong phone number type. Tips: 08011111111")
    }else if(phone_type !== `+` && Number(phone_type) !== 0){
        throw new Error("Invalid Phone Number");
    }
    return true;
}

export const formatPhoneNumber = async (phone: string) => {
    return `0${phone?.slice(-10)}`;
}

export const vendorSignUpValidation = async (body: { email: string, phone: string}) => {
    await existingEmail(body.email, 'Vendor');
    await acceptedPhoneNumber(body.phone);
    await existingPhone(body.phone, 'Vendor');
}

export const customerSignupValidation = async (body: {email: string, phone: string}) => {
    await existingEmail(body.email, 'Customer');
    await acceptedPhoneNumber(body.phone);
    await existingPhone(body.phone, 'Customer');
}

