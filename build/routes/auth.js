"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const validation_1 = require("../helpers/validation");
const validator_1 = require("../middlewares/validator");
const router = express_1.default.Router();
//vendor routes
router.post('/vendor/signup', (0, validation_1.validationHandler)(validator_1.vendor_signup_validator), auth_1.vendorSignup);
router.post('/vendor/login', (0, validation_1.validationHandler)(validator_1.vendor_login_validator), auth_1.vendorLogin);
router.get('/vendor/logout', (0, validation_1.validationHandler)(validator_1.vendor_logout_validator), auth_1.vendorLogout);
//customer routes
router.post('/customer/signup', (0, validation_1.validationHandler)(validator_1.customer_signup_validator), auth_1.customerSignup);
router.post('/customer/login', (0, validation_1.validationHandler)(validator_1.customer_login_validator), auth_1.customerLogin);
router.get('/customer/logout', (0, validation_1.validationHandler)(validator_1.customer_logout_validator), auth_1.customerLogout);
module.exports = router;
