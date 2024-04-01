import { Request, Response } from "express";
import { errorHandler } from "../helpers/errorHandler";
import { responseHandler } from "../helpers/responseHandler";
import Model from "../server/models";

const Op = Model.Sequelize.Op;

export const createSize = async (req: Request, res: Response) => {
    try {
        const size = await Model.Size.create(req.body);
        return responseHandler(res, 201, true, "Size Created Successfully", size);

    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const getActiveSizes = async (req: Request, res: Response) => {
    try {
        const sizes = await Model.Size.findAll({ where: { status: {[Op.ne]: "deleted"}}});
        if(!sizes){
            return responseHandler(res, 404, false, "Size unavailable");
        }

        return responseHandler(res, 200, true, "Data retrieved", sizes);
        
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const updateSize = async (req: Request, res: Response) => {
    try {
        const size = await Model.Size.findOne({ where: { id: req.params.size_id }});
        if(!size){
            return responseHandler(res, 404, false, "Size not found");
        }
        const updated_size = await Model.Size.update(req.body, { where: { id: size.id }, returning: true});
        return responseHandler(res, 200, true, "Size Updated Successfully", updated_size);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const deleteSize = async (req: Request, res: Response) => {
    try {
        const size = await Model.Size.findOne({ where: { id: req.params.size_id, status: {[Op.ne]: "deleted" } }});
        if(!size){
            return responseHandler(res, 404, false, "Size not found");
        }
        await Model.Size.update({ status: "deleted"}, { where: { id: size.id }, returning: true});
        
        return responseHandler(res, 200, true, "Size Deleted Successfully");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
        
    }
}