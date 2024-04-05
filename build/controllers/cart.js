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
exports.deleteCartItem = exports.removeCartItem = exports.getCart = exports.addToCart = void 0;
const errorHandler_1 = require("../helpers/errorHandler");
const responseHandler_1 = require("../helpers/responseHandler");
const models_1 = __importDefault(require("../server/models"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id } = req.body;
        const customer_id = req.customer.id;
        const product = yield models_1.default.Product.findOne({ where: { id: product_id, status: "active" } });
        if (!product) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Product does not exsit");
        }
        //check if user has cart already 
        const cart = yield models_1.default.Cart.findOne({ where: { customer_id, status: "active" } });
        if (cart) {
            //check if product already exist in cart items
            const cart_item = yield models_1.default.Cart_Item.findOne({ where: { cart_id: cart.id, status: "active", product_id } });
            if (cart_item) {
                //update the item quantity
                yield models_1.default.Cart_Item.update({ quantity: cart_item.quantity += 1 }, { where: { id: cart_item.id } });
            }
            else {
                //otherwise create new
                yield models_1.default.Cart_Item.create({
                    cart_id: cart.id,
                    product_id,
                    quantity: 1
                });
            }
        }
        else {
            //create new cart 
            const new_cart = yield models_1.default.Cart.create({
                customer_id,
                total: 0,
            });
            //create new cart_item
            yield models_1.default.Cart_Item.create({
                cart_id: new_cart.id,
                product_id,
                quantity: 1
            });
        }
        return (0, responseHandler_1.responseHandler)(res, 201, true, "Product added successfully");
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.addToCart = addToCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield models_1.default.Cart.findOne({ where: { customer_id: req.customer.id, status: "active" } });
        if (!cart) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Cart is empty");
        }
        const cart_items = yield models_1.default.Cart_Item.findAll({ where: { cart_id: cart.id, status: "active" },
            include: [
                {
                    model: models_1.default.Product,
                    as: "cart-product",
                    attributes: [
                        "id",
                        "name",
                        "description",
                        "product_code",
                        "slug",
                        "regular_price",
                        "promo_price",
                        "currency",
                        "status"
                    ]
                }
            ] });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Data retrieved", { cart, cart_items });
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.getCart = getCart;
const removeCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id } = req.params;
        const { cart_id } = req.body;
        //check if wishlist exist and belongs to the user
        const cart = yield models_1.default.Cart.findOne({ where: { id: cart_id, customer_id: req.customer.id, status: "active" } });
        if (!cart) {
            return (0, responseHandler_1.responseHandler)(res, 401, false, "Invalid Cart ID");
        }
        //check if product exist 
        const product = yield models_1.default.Product.findOne({ where: { id: product_id, status: "active" } });
        if (!product) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Product not found");
        }
        //reduce cart_item quantity if it's more than 1 
        const cart_item = yield models_1.default.Cart_Item.findOne({ where: { product_id, status: "active" } });
        if (!cart_item) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Item not available");
        }
        else if (cart_item.quantity > 1) {
            //reduce the quantity
            yield models_1.default.Cart_Item.update({ quantity: cart_item.quantity -= 1 }, { where: { id: cart_item.id } });
            return (0, responseHandler_1.responseHandler)(res, 200, true, "Item quantity updated");
        }
        else {
            yield models_1.default.Cart_Item.update({ quantity: 0, status: "deleted" }, { where: { id: cart_item.id } });
            return (0, responseHandler_1.responseHandler)(res, 200, true, "Product removed successfully");
        }
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.removeCartItem = removeCartItem;
const deleteCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id } = req.params;
        const { cart_id } = req.body;
        //check if wishlist exist and belongs to the user
        const cart = yield models_1.default.Cart.findOne({ where: { id: cart_id, customer_id: req.customer.id, status: "active" } });
        if (!cart) {
            return (0, responseHandler_1.responseHandler)(res, 401, false, "Invalid Cart ID");
        }
        //check if product exist 
        const product = yield models_1.default.Product.findOne({ where: { id: product_id, status: "active" } });
        if (!product) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Product not found");
        }
        //reduce cart_item quantity if it's more than 1 
        const cart_item = yield models_1.default.Cart_Item.findOne({ where: { product_id, status: "active" } });
        if (!cart_item) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Item not available");
        }
        else {
            yield models_1.default.Cart_Item.update({ status: "deleted" }, { where: { id: cart_item.id } });
            return (0, responseHandler_1.responseHandler)(res, 200, true, "Product deleted successfully");
        }
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.deleteCartItem = deleteCartItem;
