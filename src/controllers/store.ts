import { Request, Response } from "express"
import { errorHandler } from "../helpers/errorHandler"
import { responseHandler } from "../helpers/responseHandler";
import Model from "../server/models";
import { urlGenerator } from "../utils/urlGenerator";
import { generateFiveDigitNumbers } from "../helpers/generateFiveDigitNumbers";

const Op = Model.Sequelize.Op;

export const createStore = async (req: Request, res: Response) => {
    try {
        const { name, desc, address, phone, alt_phone, email, state, city, logo } = req.body;
        const slug = urlGenerator(name);
        const store_code = generateFiveDigitNumbers();
        const store = await Model.Store.create({
            vendor_id:  req.vendor.id,
            store_code,
            name,
            desc,
            slug,
            address,
            phone,
            alt_phone,
            email,
            state,
            city,
            logo
        });

        return responseHandler(res, 201, true, "Store Created Successfully", store);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const vendorGetStores = async (req: Request, res: Response) => {
    try {
        const stores = await Model.Store.findAll({ where: { vendor_id: req.vendor.id, status: "active" }});
        if(!stores || stores?.length < 1){
            return responseHandler(res, 404, false, "You have no store. Create One.");
        }
        return responseHandler(res, 200, true, "Data retrieved", stores);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const deleteStore = async (req: Request, res: Response) => {
    try {
        const store_id = req.params.store_id;
        const store = await Model.Store.findOne({ where: { id: store_id, vendor_id: req.vendor.id }});
        if(!store){
            return responseHandler(res, 404, false, "Store not available");
        }
        await Model.Store.update({ status: "deleted"}, { where: { id: store_id } });

        return responseHandler(res, 200, true, "Store Deleted.");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const updateStore = async (req: Request, res: Response) => {
    try {
        const { name, desc, slug, address, phone, alt_phone, email, state, city, logo} = req.body;

        const store = await Model.Store.findOne({ where: { id: req.params.store_id, vendor_id: req.vendor.id, status: {[Op.ne]: "deleted"} } });
        if(!store){
            return responseHandler(res, 404, false, "Store not found");
        }
        
        const updated_store = await Model.Store.update({
            name,
             desc, 
             slug: store.slug === slug ? slug : urlGenerator(slug),
             address, 
             phone, 
             alt_phone, 
             email, 
             state, 
             city, 
             logo
        }, { where: {id: req.params.store_id }, returning: true });

        return responseHandler(res, 200, true, "Store Successfully Updated", updated_store);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const changeStoreStatus = async(req: Request, res: Response) => {
    try {
        const { params: { store_id }} = req;

        const store = await Model.Store.update(req.body, { where: { id: store_id, vendor_id: req.vendor.id }, returning: true});
        return responseHandler(res, 200, true, "Status Successfully Changed", store);
        
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}