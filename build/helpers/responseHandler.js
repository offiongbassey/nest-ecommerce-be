"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
const responseHandler = (res, statusCode, success, message, data) => {
    res.status(statusCode).json({ success, statusCode, message, data });
};
exports.responseHandler = responseHandler;
