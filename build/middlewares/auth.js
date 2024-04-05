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
exports.customerAuth = exports.vendorAuth = exports.authMiddleware = void 0;
const errorHandler_1 = require("../helpers/errorHandler");
const responseHandler_1 = require("../helpers/responseHandler");
const jwtVerification_1 = require("../helpers/jwtVerification");
const redis_1 = require("../server/config/redis");
const models_1 = __importDefault(require("../server/models"));
const authMiddleware = (userType) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = `${req.headers.token}`;
        if (!req.headers.token) {
            return (0, responseHandler_1.responseHandler)(res, 401, false, "Token is required");
        }
        const verification = (0, jwtVerification_1.jwtVerification)(token);
        if (!verification.id) {
            return (0, responseHandler_1.responseHandler)(res, 401, false, "User not logged In");
        }
        const redis_token = yield redis_1.client.get(`${userType === "vendor" ? "Vendor" : "Customer"}_${verification.id.toString()}`);
        if (!redis_token) {
            return (0, responseHandler_1.responseHandler)(res, 401, false, "User not logged In");
        }
        if (userType === "vendor") {
            const vendor = yield models_1.default.Vendor.findOne({ where: { id: verification.id } });
            if (!vendor) {
                return (0, responseHandler_1.responseHandler)(res, 401, false, "Vendor not found");
            }
            req.vendor = vendor;
        }
        else if (userType === "customer") {
            const customer = yield models_1.default.Customer.findOne({ where: { id: verification.id } });
            if (!customer) {
                return (0, responseHandler_1.responseHandler)(res, 401, false, "Account not found");
            }
            req.customer = customer;
        }
        next();
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.authMiddleware = authMiddleware;
exports.vendorAuth = (0, exports.authMiddleware)("vendor");
exports.customerAuth = (0, exports.authMiddleware)("customer");
