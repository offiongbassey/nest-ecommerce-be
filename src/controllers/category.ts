import { Request, Response } from "express";
import { errorHandler } from "../helpers/errorHandler"
import { responseHandler } from "../helpers/responseHandler";
import Model from "../server/models";
import { urlGenerator } from "../utils/urlGenerator";

import { deleteUploadedImage, fileUploadService, getUploadedImage } from "../services/fileUploadService";
import { acceptedFileType } from "../utils/fileType";
interface MulterRequest extends Request {
    file: any
}

const Op = Model.Sequelize.Op;

const CATEGORY_URL = `${process.env.SERVER_URL}/api/v1/category/image/`;
const { CATEGORY_BLOB_CONTAINER } = process.env;



export const createCategory = async (req: Request, res: Response) => {
    try {
        if(!req.file){
            return responseHandler(res, 401, false, "Category Image is required");
        }

        const { originalname, buffer, size, mimetype } = (req as MulterRequest).file;

        //file size validation
        if(size > 10000 * 1024){
            return responseHandler(res, 401, false, "Maximum File size is 10MB");
        }

        //file type validation
         if(!acceptedFileType(mimetype)){
            return responseHandler(res, 401, false, `Unaccepted File Type: ${mimetype.split('/')[1]}`)
        }
        
        const file_name = await fileUploadService(originalname, size, buffer, `${CATEGORY_BLOB_CONTAINER}`);

        const category = await Model.Category.create({
            name: req.body.name,
            slug: urlGenerator(req.body.name),
            image: file_name,
            image_url: CATEGORY_URL+file_name
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
        return responseHandler(res, 500, false, "Somethng went wrong, try again later", { error });
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
            slug: category.slug === slug ? slug : urlGenerator(slug)
        }, { where : { id: category.id }, returning: true});

        return responseHandler(res, 200, true, "Category Updated Successfully", updated_category);

    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Somethng went wrong, try again later", {error: error});
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const category = await Model.Category.findOne({ where: { id: req.params.category_id } });
        if(!category){
            return responseHandler(res, 404, false, "Category not found");
        } 
        //delete category image from server
        const file_name = category.image;
        await deleteUploadedImage(file_name, `${CATEGORY_BLOB_CONTAINER}`);

        await Model.Category.update({
            status: "deleted"
        }, { where: { id: category.id } });

        return responseHandler(res, 200, true, "Category Successfully Deleted");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Somethng went wrong, try again later");
    }
}

export const getCategoryImage = async (req: Request, res: Response) => {
    try {
        const { file_name } = req.params;

        await getUploadedImage(res, file_name, `${CATEGORY_BLOB_CONTAINER}`);
        
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Somethng went wrong, try again later");
    }
}