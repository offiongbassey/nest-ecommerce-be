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
exports.deleteColor = exports.updateColor = exports.getActiveColors = exports.createColor = void 0;
const errorHandler_1 = require("../helpers/errorHandler");
const responseHandler_1 = require("../helpers/responseHandler");
const models_1 = __importDefault(require("../server/models"));
const Op = models_1.default.Sequelize.Op;
const createColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const color = yield models_1.default.Color.create(req.body);
        return (0, responseHandler_1.responseHandler)(res, 201, true, "Color Created Successfully", color);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later");
    }
});
exports.createColor = createColor;
const getActiveColors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const colors = yield models_1.default.Color.findAll({ where: { status: { [Op.ne]: "deleted" } } });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Data Retrieved", colors);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong,try again later");
    }
});
exports.getActiveColors = getActiveColors;
const updateColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const color = yield models_1.default.Color.findOne({ where: { id: req.params.color_id, status: { [Op.ne]: "deleted" } } });
        if (!color) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Color not found");
        }
        const updated_color = yield models_1.default.Color.update(req.body, { where: { id: color.id }, returning: true });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Color Updated Successfully", updated_color);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong,try again later");
    }
});
exports.updateColor = updateColor;
const deleteColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const color = yield models_1.default.Color.findOne({ where: { id: req.params.color_id, status: { [Op.ne]: "deleted" } } });
        if (!color) {
            return (0, responseHandler_1.responseHandler)(res, 404, false, "Color not found");
        }
        yield models_1.default.Color.update({ status: "deleted" }, { where: { id: color.id } });
        return (0, responseHandler_1.responseHandler)(res, 200, true, "Color Deleted Successfully");
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong,try again later");
    }
});
exports.deleteColor = deleteColor;
