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
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerLogout = exports.customerLogin = exports.customerSignup = exports.vendorLogout = exports.vendorLogin = exports.vendorSignup = void 0;
const responseHandler_1 = require("../helpers/responseHandler");
const errorHandler_1 = require("../helpers/errorHandler");
const authService_1 = require("../services/authService");
const vendorSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendor = yield (0, authService_1.signupService)(req, res, 'Vendor');
        return (0, responseHandler_1.responseHandler)(res, 201, true, "Account Successfully Created", vendor);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.vendorSignup = vendorSignup;
const vendorLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, authService_1.loginService)(req, res, 'Vendor');
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.vendorLogin = vendorLogin;
const vendorLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, authService_1.logoutService)(req, res, 'Vendor');
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.vendorLogout = vendorLogout;
const customerSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield (0, authService_1.signupService)(req, res, 'Customer');
        return (0, responseHandler_1.responseHandler)(res, 201, true, "Account Successfully Created", customer);
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.customerSignup = customerSignup;
const customerLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, authService_1.loginService)(req, res, 'Customer');
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.customerLogin = customerLogin;
const customerLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, authService_1.logoutService)(req, res, 'Customer');
    }
    catch (error) {
        yield (0, errorHandler_1.errorHandler)(error);
        return (0, responseHandler_1.responseHandler)(res, 500, false, "Something went wrong, try again later.");
    }
});
exports.customerLogout = customerLogout;
