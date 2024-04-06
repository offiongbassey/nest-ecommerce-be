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
exports.getProductImage = exports.deleteProduct = exports.getProductsByStore = exports.updateProduct = exports.getProducts = exports.createProduct = void 0;
const errorHandler_1 = require("../helpers/errorHandler");
const responseHandler_1 = require("../helpers/responseHandler");
const models_1 = __importDefault(require("../server/models"));
const product_1 = require("../services/product");
const generateFiveDigitNumbers_1 = require("../helpers/generateFiveDigitNumbers");
const urlGenerator_1 = require("../utils/urlGenerator");
const fileUploadService_1 = require("../services/fileUploadService");
const Op = models_1.default.Sequelize.Op;
const product_include = [
    {
        model: models_1.default.Store,
        as: "store",
        attributes: [
            "id",
            "vendor_id",
            "store_code",
            "name",
            "slug",
            "status",
            "phone",
            "logo",
        ],
    },
    {
        model: models_1.default.Product_Size,
        as: "product_sizes",
        include: [
            {
                model: models_1.default.Size,
                as: "_size",
            },
        ],
    },
    {
        model: models_1.default.Product_Inventory,
        as: "product_inventory",
    },
    {
        model: models_1.default.Product_Color,
        as: "product_colors",
        include: [
            {
                model: models_1.default.Color,
                as: "_color",
            },
        ],
    },
];
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, regular_price, promo_price, currency, tax_rate, category_id, sub_category_id, store_id, quantity, sizes, colors, } = req.body;
        const product_code = `APR-${(0, generateFiveDigitNumbers_1.generateFiveDigitNumbers)()}`;
        const product = yield models_1.default.Product.create({
            name,
            description,
            slug: (0, urlGenerator_1.urlGenerator)(name),
            regular_price,
            promo_price,
            currency,
            tax_rate,
            category_id,
            sub_category_id,
            store_id,
            product_code,
        });
        //create product sizes
        if (sizes && sizes.length > 0) {
            yield (0, product_1.createProductSizes)(product.id, sizes);
        }
        //create product images
        yield (0, fileUploadService_1.uploadProductImages)(req.files, product.id);
        //create product color
        if (colors && colors.length > 0) {
            yield (0, product_1.createProductColors)(product.id, colors);
        }
        //create product inventory
        yield (0, product_1.createProductInventory)(product.id, quantity);
        return (0, responseHandler_1.responseHandler)(res, 201, true, "Product Created Successfully", product);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const page_size = Number(req.query.page_size) || 10;
        //get the exact count of the data
        const main_table_count = yield models_1.default.Product.count({ distinct: true, where: { status: "active" } });
        //get products based on pagination
        const { count, rows } = yield models_1.default.Product.findAndCountAll({
            offset: (page - 1) * page_size,
            limit: page_size,
            where: { status: "active" },
            include: product_include,
        });
        const total_pages = Math.ceil(count / page_size);
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Data retrieved", {
            page,
            page_size,
            total_pages,
            totalItem: main_table_count,
            data: rows,
        });
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.getProducts = getProducts;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.product_id);
        const { sizes, colors, quantity } = req.body;
        const product = yield models_1.default.Product.findOne({
            where: { id, status: { [Op.ne]: "deleted" } },
        });
        if (!product) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Product not found");
        }
        const updated_product = yield models_1.default.Product.update(req.body, {
            where: { id },
            returning: true,
        });
        // update product sizes
        if (sizes && sizes.length > 0) {
            yield (0, product_1.updateProductSizes)(id, sizes);
        }
        //update colors
        if (colors && colors.length > 0) {
            yield (0, product_1.updateProductColors)(id, colors);
        }
        //update product inventory
        yield (0, product_1.updateProductInventory)(id, quantity);
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Product updated successfully", updated_product);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.updateProduct = updateProduct;
const getProductsByStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { store_id } = req.params;
        const products = yield models_1.default.Product.findAll({
            where: { store_id, status: { [Op.ne]: "deleted" } },
            include: product_include,
        });
        if (!products) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Product not found");
        }
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Data retrieved", products);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.getProductsByStore = getProductsByStore;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.product_id;
        const { store_id } = req.body;
        const product = yield models_1.default.Product.findOne({
            where: { id, store_id, status: { [Op.ne]: "deleted" } },
        });
        if (!product) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Product not found");
        }
        yield models_1.default.Product.update({ status: "deleted" }, { where: { id } });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Product deleted successfully");
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.deleteProduct = deleteProduct;
const getProductImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { file_name } = req.params;
        yield (0, fileUploadService_1.getUploadedImage)(res, file_name, `${process.env.PRODUCT_BLOB_CONTAINER}`);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.getProductImage = getProductImage;
