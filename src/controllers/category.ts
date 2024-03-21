import { Request, Response } from "express";
import { errorHandler } from "../helpers/errorHandler"
import { responseHandler } from "../helpers/responseHandler";
import Model from "../server/models";

const Op = Model.Sequelize.Op;

export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await Model.Category.create({
            name: req.body.name,
            slug: req.body.name.replace(/\s+/g, '-').replace(/:/g, "-").replace("/", "-").toLowerCase()
        });

        return responseHandler(res, 201, true, "Category Created Successfully", category);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Somethng went wrong, try again later");
    }
}

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Model.Category.findAll({ where: { status: {[Op.ne]: "deleted"}}});

        return responseHandler(res, 200, true, "Data Retrieved", categories);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Somethng went wrong, try again later");
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { name, slug } = req.body;
        const category = await Model.Category.findOne({ where: { id: req.params.category_id } });
        if(!category){
            return responseHandler(res, 404, false, "Category not found");
        }
        const updated_category = await Model.Category.update({
            name,
            slug: category.slug === slug ? slug : slug.replace(/\s+/g, '-').replace(/:/g, "-").replace("/", "-").toLowerCase()
        }, { where : { id: category.id }, returning: true});

        return responseHandler(res, 200, true, "Category Updated Successfully", updated_category);

    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Somethng went wrong, try again later");
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const category = await Model.Category.findOne({ where: { id: req.params.category_id } });
        if(!category){
            return responseHandler(res, 404, false, "Category not found");
        } 

        await Model.Category.update({
            status: "deleted"
        }, { where: { id: category.id } });

        return responseHandler(res, 200, true, "Category Successfully Deleted");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Somethng went wrong, try again later");
    }
}