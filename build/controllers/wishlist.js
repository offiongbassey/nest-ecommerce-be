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
exports.removeFromWishlist = exports.getWishlist = exports.addToWishlist = void 0;
const errorHandler_1 = require("../helpers/errorHandler");
const responseHandler_1 = require("../helpers/responseHandler");
const models_1 = __importDefault(require("../server/models"));
const addToWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer_id = req.customer.id;
        const id = req.body.product_id;
        const product = yield models_1.default.Product.findOne({ where: { id, status: "active" } });
        if (!product) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Product does not exist");
        }
        //check if wishlist exist 
        let wishlist = yield models_1.default.Wishlist.findOne({ where: { customer_id, status: "active" } });
        if (wishlist) {
            //check if the product already exist in wishlist_item
            const wishlist_item = yield models_1.default.Wishlist_Item.findOne({ where: { wishlist_id: wishlist.id, product_id: id, status: "active" } });
            if (wishlist_item) {
                return (0, responseHandler_1.responseHandler)(res, 401, false, "Product Already added to wishlist");
            }
            //otherwise create new wishlist_item
            yield models_1.default.Wishlist_Item.create({
                wishlist_id: wishlist.id,
                product_id: id
            });
        }
        else {
            //create new wishlist 
            wishlist = yield models_1.default.Wishlist.create({
                customer_id,
                total: 0
            });
            yield models_1.default.Wishlist_Item.create({
                wishlist_id: wishlist.id,
                product_id: id,
            });
        }
        return (0, responseHandler_1.responseHandler)(res, 201, true, "Item Added to Wishlist", wishlist);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.addToWishlist = addToWishlist;
const getWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer_id = req.customer.id;
        const wishlist = yield models_1.default.Wishlist.findOne({ where: { customer_id, status: "active" } });
        if (!wishlist) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Wishlist Empty");
        }
        const wishlist_items = yield models_1.default.Wishlist_Item.findAll({ where: { wishlist_id: wishlist.id, status: "active" },
            include: [
                {
                    model: models_1.default.Product,
                    as: "wishlist-product",
                    attributes: [
                        "id",
                        "name",
                        "product_code",
                        "description",
                        "slug",
                        "regular_price",
                        "promo_price",
                        "currency",
                        "status"
                    ]
                }
            ] });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Data retrieved", wishlist_items);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.getWishlist = getWishlist;
const removeFromWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { wishlist_id } = req.body;
        const id = req.params.wishlist_item_id;
        //confirm that wishlist belongs to the user
        const wishlist = yield models_1.default.Wishlist.findOne({ where: { id: wishlist_id, customer_id: req.customer.id } });
        if (!wishlist) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Wishlist ID is invalid");
        }
        //check if wishlist item exist 
        const wishlist_item = yield models_1.default.Wishlist_Item.findOne({ where: { wishlist_id, id, status: "active" } });
        if (!wishlist_item) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Product does not exist in wishlist");
        }
        yield models_1.default.Wishlist_Item.update({ status: "deleted" }, { where: { id, status: "active" } });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Product removed successfully");
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.removeFromWishlist = removeFromWishlist;
