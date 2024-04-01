import { Request, Response } from "express";
import { errorHandler } from "../helpers/errorHandler";
import { responseHandler } from "../helpers/responseHandler";
import Model from "../server/models";
import { urlGenerator } from "../utils/urlGenerator";
const Op = Model.Sequelize.Op;

export const createSubCategory = async (req: Request, res: Response) => {
    try {
        const  { category_id, name } = req.body;
        const sub_category = await Model.SubCategory.create({
            category_id,
            name,
            slug: urlGenerator(name)
        });

        return responseHandler(res, 201, true, "Sub Category Created Successfully", sub_category);

    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const getAllSubCategories = async (req: Request, res: Response) => {
    try {
        const sub_categories = await Model.SubCategory.findAll({ where: { status: {[Op.ne]: "deleted"}}});
        if(!sub_categories){
            return responseHandler(res, 404, false, "Sub Categories Unavailable");
        }

        return responseHandler(res, 200, true, "Data Retrieved", sub_categories);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const getSubCategory = async (req: Request, res: Response) => {
    try {
        const sub_categories = await Model.SubCategory.findAll({ where: { category_id: req.params.category_id, status: {[Op.ne]: "deleted"}}});
        if(!sub_categories){
            return responseHandler(res, 404, false, "Sub Categories Unavailable");
        }
        return responseHandler(res, 200, true, "Data Retrieved", sub_categories);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const updateSubCategory = async (req: Request, res: Response) => {
    try {
        const { category_id, name, slug } = req.body;
        const  id  = req.params.sub_category_id

        const sub_category = await Model.SubCategory.findOne({ where: { id } });
        if(!sub_category){
            return responseHandler(res, 404, false, "Sub Category Not found");
        }
        const updated_sub_category = await Model.SubCategory.update({
            category_id,
            name,
            slug: sub_category.slug === slug ? slug : urlGenerator(slug)
        }, {where : { id }, returning: true});

        return responseHandler(res, 200, true, "Sub Category Updated Successfully", updated_sub_category);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const deleteSubCategory = async (req: Request, res: Response) => {
    try {
        const id = req.params.sub_category_id;

        const sub_category = await Model.SubCategory.findOne({ where: { id, status: {[Op.ne]: "deleted" } }});
        if(!sub_category){
            return responseHandler(res, 404, false, "Sub Category Not Found");
        }
        await Model.SubCategory.update({ status: "deleted" }, { where: { id }});

        return responseHandler(res, 200, true, "Sub Category Deleted Successfully");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}