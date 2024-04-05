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
exports.deleteSize = exports.updateSize = exports.getActiveSizes = exports.createSize = void 0;
const errorHandler_1 = require("../helpers/errorHandler");
const responseHandler_1 = require("../helpers/responseHandler");
const models_1 = __importDefault(require("../server/models"));
const Op = models_1.default.Sequelize.Op;
const createSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const size = yield models_1.default.Size.create(req.body);
        return (0, responseHandler_1.responseHandler)(res, 201, true, "Size Created Successfully", size);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.createSize = createSize;
const getActiveSizes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sizes = yield models_1.default.Size.findAll({ where: { status: { [Op.ne]: "deleted" } } });
        if (!sizes) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Size unavailable");
        }
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Data retrieved", sizes);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.getActiveSizes = getActiveSizes;
const updateSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const size = yield models_1.default.Size.findOne({ where: { id: req.params.size_id } });
        if (!size) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Size not found");
        }
        const updated_size = yield models_1.default.Size.update(req.body, { where: { id: size.id }, returning: true });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Size Updated Successfully", updated_size);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.updateSize = updateSize;
const deleteSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const size = yield models_1.default.Size.findOne({ where: { id: req.params.size_id, status: { [Op.ne]: "deleted" } } });
        if (!size) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Size not found");
        }
        yield models_1.default.Size.update({ status: "deleted" }, { where: { id: size.id }, returning: true });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Size Deleted Successfully");
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.deleteSize = deleteSize;
