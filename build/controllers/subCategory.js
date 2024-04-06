"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubCategoryImage = exports.deleteSubCategory = exports.updateSubCategory = exports.getSubCategory = exports.getAllSubCategories = exports.createSubCategory = void 0;
const errorHandler_1 = require("../helpers/errorHandler");
const responseHandler_1 = require("../helpers/responseHandler");
const models_1 = __importDefault(require("../server/models"));
const urlGenerator_1 = require("../utils/urlGenerator");
const fileType_1 = require("../utils/fileType");
const fileUploadService_1 = require("../services/fileUploadService");
const Op = models_1.default.Sequelize.Op;
const SUB_CATEGORY_URL = `${process.env.SERVER_URL}/api/v1/sub-category/image/`;
const { CATEGORY_BLOB_CONTAINER } = process.env;
const createSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_id, name } = req.body;
        const { originalname, size, buffer, mimetype } = req.file;
        //file size validation 
        if (size > 10000 * 1024) {
            return (0, responseHandler_1.responseHandler)(res, 401, false, "Maximum File size is 10MB");
        }
        //file type validation
        if (!(0, fileType_1.acceptedFileType)(mimetype)) {
            return (0, responseHandler_1.responseHandler)(res, 401, false, `Unaccepted File Type: ${mimetype.split('/')[1]}`);
        }
        const file_name = yield (0, fileUploadService_1.fileUploadService)(originalname, size, buffer, `${CATEGORY_BLOB_CONTAINER}`);
        const sub_category = yield models_1.default.SubCategory.create({
            category_id,
            name,
            slug: (0, urlGenerator_1.urlGenerator)(name),
            image: file_name,
            image_url: SUB_CATEGORY_URL + file_name
        });
        return (0, responseHandler_1.responseHandler)(res, 201, true, "Sub Category Created Successfully", sub_category);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.createSubCategory = createSubCategory;
const getAllSubCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sub_categories = yield models_1.default.SubCategory.findAll({ where: { status: { [Op.ne]: "deleted" } } });
        if (!sub_categories) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Sub Categories Unavailable");
        }
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Data Retrieved", sub_categories);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.getAllSubCategories = getAllSubCategories;
const getSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sub_categories = yield models_1.default.SubCategory.findAll({ where: { category_id: req.params.category_id, status: { [Op.ne]: "deleted" } } });
        if (!sub_categories) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Sub Categories Unavailable");
        }
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Data Retrieved", sub_categories);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.getSubCategory = getSubCategory;
const updateSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_id, name, slug } = req.body;
        const id = req.params.sub_category_id;
        const sub_category = yield models_1.default.SubCategory.findOne({ where: { id } });
        if (!sub_category) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Sub Category Not found");
        }
        const updated_sub_category = yield models_1.default.SubCategory.update({
            category_id,
            name,
            slug: sub_category.slug === slug ? slug : (0, urlGenerator_1.urlGenerator)(slug)
        }, { where: { id }, returning: true });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Sub Category Updated Successfully", updated_sub_category);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.updateSubCategory = updateSubCategory;
const deleteSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.sub_category_id;
        const sub_category = yield models_1.default.SubCategory.findOne({ where: { id, status: { [Op.ne]: "deleted" } } });
        if (!sub_category) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Sub Category Not Found");
        }
        const { image } = sub_category;
        yield (0, fileUploadService_1.deleteUploadedImage)(image, `${CATEGORY_BLOB_CONTAINER}`);
        yield models_1.default.SubCategory.update({ status: "deleted" }, { where: { id } });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Sub Category Deleted Successfully");
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.deleteSubCategory = deleteSubCategory;
const getSubCategoryImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { file_name } = req.params;
        yield (0, fileUploadService_1.getUploadedImage)(res, file_name, `${CATEGORY_BLOB_CONTAINER}`);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.getSubCategoryImage = getSubCategoryImage;
