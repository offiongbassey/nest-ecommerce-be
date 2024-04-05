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
exports.updateProductInventory = exports.updateProductColors = exports.updateProductSizes = exports.createProductInventory = exports.createProductColors = exports.createProductSizes = void 0;
const models_1 = __importDefault(require("../server/models"));
const createProductSizes = (product_id, sizes) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //preparing an array of object for bulk create;
        const product_sizes = sizes.map(size => ({ product_id, size_id: size }));
        yield models_1.default.Product_Size.bulkCreate(product_sizes);
        console.log("Product Sizes created successfully.");
    }
    catch (error) {
        console.error("Error creating product sizes: ", error);
    }
});
exports.createProductSizes = createProductSizes;
const createProductColors = (product_id, colors) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //preparing an array of object for bulk create;
        const product_colors = colors.map(color => ({ product_id, color_id: color }));
        yield models_1.default.Product_Color.bulkCreate(product_colors);
        console.log("Product Colors created successfully");
    }
    catch (error) {
        console.error("Error creating product colors: ", error);
    }
});
exports.createProductColors = createProductColors;
const createProductInventory = (product_id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Product_Inventory.create({ product_id, quantity });
        console.log("Product Inventory Created Successfully");
    }
    catch (error) {
        console.error("Error creating product inventory: ", error);
    }
});
exports.createProductInventory = createProductInventory;
const updateProductSizes = (product_id, sizes) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //check if the product already has the sizes
        let old_sizes = yield models_1.default.Product_Size.findAll({ where: { product_id, status: "active" }, attributes: ["size_id"] });
        //set new as object
        old_sizes = new Set(old_sizes.map((item) => item.dataValues.size_id));
        for (const size of sizes) {
            //check if the incoming size already exist, if it does, then don't add 
            if (!old_sizes.has(size)) {
                //    console.log("new size add: ")
                yield models_1.default.Product_Size.create({ product_id, size_id: size });
            }
        }
    }
    catch (error) {
        console.error("Error updating product sizes: ", error);
    }
});
exports.updateProductSizes = updateProductSizes;
const updateProductColors = (product_id, colors) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //check if the product already has the colors
        let old_colors = yield models_1.default.Product_Color.findAll({ where: { product_id, status: "active" }, attributes: ["color_id"] });
        //set new as object
        old_colors = new Set(old_colors.map((item) => item.dataValues.color_id));
        for (const color of colors) {
            if (!old_colors.has(color)) {
                yield models_1.default.Product_Color.create({ product_id, color_id: color });
            }
        }
    }
    catch (error) {
        console.error("Error updating product colors: ", error);
    }
});
exports.updateProductColors = updateProductColors;
const updateProductInventory = (product_id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Product_Inventory.update({ quantity }, { where: { product_id } });
    }
    catch (error) {
        console.error("Error updating product inventory: ", error);
    }
});
exports.updateProductInventory = updateProductInventory;
