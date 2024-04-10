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
exports.customerSignupValidation = exports.vendorSignUpValidation = exports.formatPhoneNumber = exports.acceptedPhoneNumber = exports.existingPhone = exports.existingEmail = exports.validationHandler = exports.checkAllowedFields = exports.titleCase = void 0;
const express_validator_1 = require("express-validator");
const responseHandler_1 = require("./responseHandler");
const models_1 = __importDefault(require("../server/models"));
const titleCase = (name) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    return (_a = name === null || name === void 0 ? void 0 : name.toLocaleLowerCase()) === null || _a === void 0 ? void 0 : _a.split(' ').map(function (text) {
        return ((text === null || text === void 0 ? void 0 : text.charAt(0).toUpperCase()) + (text === null || text === void 0 ? void 0 : text.slice(1)));
    }).join(' ');
});
exports.titleCase = titleCase;
const checkAllowedFields = (payload, fields) => {
    payload = Array.isArray(payload) ? payload : [payload];
    payload.forEach((item) => {
        const allowed = Object.keys(item).every(field => fields.includes(field));
        fields = typeof fields === 'string' ? fields : fields.join(', ');
        if (!allowed) {
            throw new Error(`Wrong field passed. Allowed fields: ${fields}`);
        }
    });
    return true;
};
exports.checkAllowedFields = checkAllowedFields;
const validationHandler = (values = []) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield Promise.all(values.map((value) => value.run(req)));
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        const _errors = errors.array();
        let message = "Invalid Parameters:";
        _errors.forEach((v) => {
            message += `${v.msg},`;
        });
        return (0, responseHandler_1.responseHandler)(res, 422, false, errors.array());
    });
};
exports.validationHandler = validationHandler;
const existingEmail = (email, type, id) => __awaiter(void 0, void 0, void 0, function* () {
    const check_email_existence = yield models_1.default[type].findOne({ where: { email } });
    if (check_email_existence) {
        if (!id) {
            throw new Error("Email already exist.");
        }
        else {
            if (check_email_existence.id !== Number(id)) {
                throw new Error("Email already exist.");
            }
        }
    }
    return true;
});
exports.existingEmail = existingEmail;
const existingPhone = (phone, type, id) => __awaiter(void 0, void 0, void 0, function* () {
    const check_phone_existence = yield models_1.default[type].findOne({ where: { phone } });
    if (check_phone_existence) {
        if (!id) {
            throw new Error("Phone Number already exist.");
        }
        else {
            if (check_phone_existence.id !== Number(id)) {
                throw new Error("Phone Number already exist.");
            }
        }
    }
    return true;
});
exports.existingPhone = existingPhone;
const acceptedPhoneNumber = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    const phone_type = phone.charAt(0);
    if (phone_type === `+` && (phone === null || phone === void 0 ? void 0 : phone.length) !== 14) {
        throw new Error("Wrong phone number type. Tips: 08011111111");
    }
    else if (Number(phone_type) === 0 && (phone === null || phone === void 0 ? void 0 : phone.length) !== 11) {
        throw new Error("Wrong phone number type. Tips: 08011111111");
    }
    else if (phone_type !== `+` && Number(phone_type) !== 0) {
        throw new Error("Invalid Phone Number");
    }
    return true;
});
exports.acceptedPhoneNumber = acceptedPhoneNumber;
const formatPhoneNumber = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    return `0${phone === null || phone === void 0 ? void 0 : phone.slice(-10)}`;
});
exports.formatPhoneNumber = formatPhoneNumber;
const vendorSignUpValidation = (body) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.existingEmail)(body.email, 'Vendor');
    yield (0, exports.acceptedPhoneNumber)(body.phone);
    yield (0, exports.existingPhone)(body.phone, 'Vendor');
});
exports.vendorSignUpValidation = vendorSignUpValidation;
const customerSignupValidation = (body) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.existingEmail)(body.email, 'Customer');
    yield (0, exports.acceptedPhoneNumber)(body.phone);
    yield (0, exports.existingPhone)(body.phone, 'Customer');
});
exports.customerSignupValidation = customerSignupValidation;
