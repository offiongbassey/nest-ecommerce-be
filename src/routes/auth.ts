import express from "express";
import { vendorLogin, vendorLogout, vendorSignup } from "../controllers/auth";
import { validationHandler } from "../helpers/validation";
import { vendor_login_validator, vendor_logout_validator, vendor_signup_validator } from "../middlewares/validator";
const router = express.Router();

//vendor routes
router.post('/vendor/signup', validationHandler(vendor_signup_validator), vendorSignup);
router.post('/vendor/login', validationHandler(vendor_login_validator), vendorLogin);
router.get('/vendor/logout', validationHandler(vendor_logout_validator), vendorLogout);

export = router;