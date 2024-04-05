import { Request, Response } from "express";
import { errorHandler } from "../helpers/errorHandler";
import { responseHandler } from "../helpers/responseHandler";
import Model from "../server/models";

const Op = Model.Sequelize.Op;

export const createColor = async (req: Request, res: Response) => {
    try {
        const color = await Model.Color.create(req.body);

        return responseHandler(res, 201, true, "Color Created Successfully", color);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const getActiveColors = async (req: Request, res: Response) =>{
    try {
        const colors = await Model.Color.findAll({ where: { status: {[Op.ne]: "deleted" }}});

        return responseHandler(res, 200, true, "Data Retrieved", colors);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong,try again later");
    }
}

export const updateColor = async(req: Request,  res: Response) => {
    try {
        const color = await Model.Color.findOne({ where: { id: req.params.color_id, status: {[Op.ne]: "deleted" }  }});
        if(!color){
            return responseHandler(res, 404, false, "Color not found");
        }
        const updated_color = await Model.Color.update(req.body, { where: { id: color.id }, returning: true});
        
        return responseHandler(res, 200, true, "Color Updated Successfully", updated_color);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong,try again later");
    }
}

export const deleteColor = async(req: Request, res: Response) => {
    try {
        const color = await Model.Color.findOne({ where: { id: req.params.color_id, status: {[Op.ne]: "deleted" } }});
        if(!color){
            return responseHandler(res, 404, false, "Color not found");
        }
        await Model.Color.update({ status: "deleted"}, { where: { id: color.id }});

        return responseHandler(res, 200, true, "Color Deleted Successfully");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong,try again later");
    }
}