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
exports.getCategoryImage = exports.deleteCategory = exports.updateCategory = exports.getAllCategories = exports.createCategory = void 0;
const errorHandler_1 = require("../helpers/errorHandler");
const responseHandler_1 = require("../helpers/responseHandler");
const models_1 = __importDefault(require("../server/models"));
const urlGenerator_1 = require("../utils/urlGenerator");
const fileUploadService_1 = require("../services/fileUploadService");
const fileType_1 = require("../utils/fileType");
const Op = models_1.default.Sequelize.Op;
const CATEGORY_URL = `${process.env.SERVER_URL}/api/v1/category/image/`;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return (0, responseHandler_1.responseHandler)(res, 401, false, "Category Image is required");
        }
        const { originalname, buffer, size, mimetype } = req.file;
        //file size validation
        if (size > 10000 * 1024) {
            return (0, responseHandler_1.responseHandler)(res, 401, false, "Maximum File size is 10MB");
        }
        //file type validation
        if (!(0, fileType_1.acceptedFileType)(mimetype)) {
            return (0, responseHandler_1.responseHandler)(res, 401, false, `Unaccepted File Type: ${mimetype.split('/')[1]}`);
        }
        const file_name = yield (0, fileUploadService_1.fileUploadService)(originalname, size, buffer, 'category');
        const category = yield models_1.default.Category.create({
            name: req.body.name,
            slug: (0, urlGenerator_1.urlGenerator)(req.body.name),
            image: file_name,
            image_url: CATEGORY_URL + file_name
        });
        return (0, responseHandler_1.responseHandler)(res, 201, true, "Category Created Successfully", category);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Somethng went wrong, try again later");
    }
});
exports.createCategory = createCategory;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield models_1.default.Category.findAll({ where: { status: { [Op.ne]: "deleted" } } });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Data Retrieved", categories);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Somethng went wrong, try again later", { error });
    }
});
exports.getAllCategories = getAllCategories;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, slug } = req.body;
        const category = yield models_1.default.Category.findOne({ where: { id: req.params.category_id } });
        if (!category) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Category not found");
        }
        const updated_category = yield models_1.default.Category.update({
            name,
            slug: category.slug === slug ? slug : (0, urlGenerator_1.urlGenerator)(slug)
        }, { where: { id: category.id }, returning: true });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Category Updated Successfully", updated_category);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Somethng went wrong, try again later", { error: error });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield models_1.default.Category.findOne({ where: { id: req.params.category_id } });
        if (!category) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Category not found");
        }
        //delete category image from server
        const file_name = category.image;
        yield (0, fileUploadService_1.deleteUploadedImage)(file_name, 'category');
        yield models_1.default.Category.update({
            status: "deleted"
        }, { where: { id: category.id } });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Category Successfully Deleted");
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Somethng went wrong, try again later");
    }
});
exports.deleteCategory = deleteCategory;
const getCategoryImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { file_name } = req.params;
        yield (0, fileUploadService_1.getUploadedImage)(res, file_name, 'category');
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Somethng went wrong, try again later");
    }
});
exports.getCategoryImage = getCategoryImage;
