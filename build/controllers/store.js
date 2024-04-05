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
exports.changeStoreStatus = exports.updateStore = exports.deleteStore = exports.vendorGetStores = exports.createStore = void 0;
const errorHandler_1 = require("../helpers/errorHandler");
const responseHandler_1 = require("../helpers/responseHandler");
const models_1 = __importDefault(require("../server/models"));
const urlGenerator_1 = require("../utils/urlGenerator");
const generateFiveDigitNumbers_1 = require("../helpers/generateFiveDigitNumbers");
const Op = models_1.default.Sequelize.Op;
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, desc, address, phone, alt_phone, email, state, city, logo } = req.body;
        const slug = (0, urlGenerator_1.urlGenerator)(name);
        const store_code = (0, generateFiveDigitNumbers_1.generateFiveDigitNumbers)();
        const store = yield models_1.default.Store.create({
            vendor_id: req.vendor.id,
            store_code,
            name,
            desc,
            slug,
            address,
            phone,
            alt_phone,
            email,
            state,
            city,
            logo
        });
        return (0, responseHandler_1.responseHandler)(res, 201, true, "Store Created Successfully", store);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.createStore = createStore;
const vendorGetStores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield models_1.default.Store.findAll({ where: { vendor_id: req.vendor.id, status: "active" } });
        if (!stores || (stores === null || stores === void 0 ? void 0 : stores.length) < 1) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "You have no store. Create One.");
        }
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Data retrieved", stores);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.vendorGetStores = vendorGetStores;
const deleteStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store_id = req.params.store_id;
        const store = yield models_1.default.Store.findOne({ where: { id: store_id, vendor_id: req.vendor.id } });
        if (!store) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Store not available");
        }
        yield models_1.default.Store.update({ status: "deleted" }, { where: { id: store_id } });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Store Deleted.");
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.deleteStore = deleteStore;
const updateStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, desc, slug, address, phone, alt_phone, email, state, city, logo } = req.body;
        const store = yield models_1.default.Store.findOne({ where: { id: req.params.store_id, vendor_id: req.vendor.id, status: { [Op.ne]: "deleted" } } });
        if (!store) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Store not found");
        }
        const updated_store = yield models_1.default.Store.update({
            name,
            desc,
            slug: store.slug === slug ? slug : (0, urlGenerator_1.urlGenerator)(slug),
            address,
            phone,
            alt_phone,
            email,
            state,
            city,
            logo
        }, { where: { id: req.params.store_id }, returning: true });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Store Successfully Updated", updated_store);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.updateStore = updateStore;
const changeStoreStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { store_id } } = req;
        const store = yield models_1.default.Store.update(req.body, { where: { id: store_id, vendor_id: req.vendor.id }, returning: true });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Status Successfully Changed", store);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.changeStoreStatus = changeStoreStatus;
