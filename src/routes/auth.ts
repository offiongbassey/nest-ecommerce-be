import express from "express";
import { customerLogin, customerLogout, customerSignup, vendorLogin, vendorLogout, vendorSignup } from "../controllers/auth";
import { validationHandler } from "../helpers/validation";
import { customer_login_validator, customer_logout_validator, customer_signup_validator, vendor_login_validator, vendor_logout_validator, vendor_signup_validator } from "../middlewares/validator";
const router = express.Router();

//vendor routes
router.post('/vendor/signup', validationHandler(vendor_signup_validator), vendorSignup);
router.post('/vendor/login', validationHandler(vendor_login_validator), vendorLogin);
router.get('/vendor/logout', validationHandler(vendor_logout_validator), vendorLogout);

//customer routes
router.post('/customer/signup', validationHandler(customer_signup_validator), customerSignup);
router.post('/customer/login', validationHandler(customer_login_validator), customerLogin);
router.get('/customer/logout', validationHandler(customer_logout_validator), customerLogout);

export = router;