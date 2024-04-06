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
exports.logoutService = exports.loginService = exports.signupService = void 0;
const models_1 = __importDefault(require("../server/models"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const responseHandler_1 = require("../helpers/responseHandler");
const jwtVerification_1 = require("../helpers/jwtVerification");
const redis_1 = require("../server/config/redis");
const signupService = (req, res, property) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, password, phone } = req.body;
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashed_password = yield bcryptjs_1.default.hash(password, salt);
    const register = yield models_1.default[property].create({
        first_name,
        last_name,
        email,
        password: hashed_password,
        phone
    });
    register.password = undefined;
    return register;
});
exports.signupService = signupService;
const loginService = (req, res, property) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield models_1.default[property].findOne({ where: { email } });
    if (!user) {
        return (0, responseHandler_1.responseHandler)(res, 401, false, "Invalid Email or Password");
    }
    const verify_password = yield bcryptjs_1.default.compare(password, user.password);
    if (!verify_password) {
        return (0, responseHandler_1.responseHandler)(res, 401, false, "Invalid Email or Password");
    }
    //generate token
    const token = (0, jwtVerification_1.generateToken)(user.id);
    yield redis_1.client.setEx(`${property}_${user.id.toString()}`, 60000, token);
    const { id, first_name, last_name, phone, photo, status, is_verified } = user;
    const user_data = { id, email, first_name, last_name, phone, photo, status, is_verified, token };
    return (0, responseHandler_1.responseHandler)(res, 200, true, "Login Successful", user_data);
});
exports.loginService = loginService;
const logoutService = (req, res, property) => __awaiter(void 0, void 0, void 0, function* () {
    const token = `${req.headers.token}`;
    const verification = (0, jwtVerification_1.jwtVerification)(token);
    if (!verification.id) {
        return (0, responseHandler_1.responseHandler)(res, 401, false, "Invalid Token");
    }
    const redis_token = yield redis_1.client.get(`${property}_${verification.id.toString()}`);
    if (redis_token) {
        yield redis_1.client.DEL(`${property}_${verification.id.toString()}`);
    }
    return (0, responseHandler_1.responseHandler)(res, 200, true, "Account Successfully Logged Out");
});
exports.logoutService = logoutService;
