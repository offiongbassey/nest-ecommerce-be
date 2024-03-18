import { body, header } from "express-validator";
import { checkAllowedFields, customerSignupValidation, formatPhoneNumber, titleCase, vendorSignUpValidation } from "../helpers/validation";

export const vendor_signup_validator = [
    body("first_name")
        .exists()
        .withMessage("First Name is required")
        .notEmpty()
        .withMessage("First Name cannot be empty")
        .trim()
        .customSanitizer(titleCase),
    body("last_name")
        .exists()
        .withMessage("Last Name is required")
        .notEmpty()
        .withMessage("Last Name cannot be empty")
        .trim()
        .customSanitizer(titleCase),
    body("email")
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid Email")
        .normalizeEmail(),
    body("password")
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({min: 6})
        .withMessage("Password must be atleast 6 characters"),
    body("phone")
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Phone Number cannot be empty")
        .isInt()
        .withMessage("Phone Number must be digit")
        .isLength({ min: 10})
        .withMessage("Phone Number must be atleast 10 digits")
        .customSanitizer(formatPhoneNumber),
    body()
        .custom(vendorSignUpValidation),
    body()
        .custom(body => checkAllowedFields(body, ["first_name", "last_name", "email", "password", "phone"]))
]

export const vendor_login_validator = [
    body("email")
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid Email")
        .normalizeEmail(),
    body("password")
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .withMessage("Password cannot be empty"),
    body()
        .custom(body => checkAllowedFields(body, ["email", "password"]))
]

export const vendor_logout_validator = [
    header("token")
        .exists()
        .withMessage("Header is required")
        .notEmpty()
        .withMessage("Header cannot be empty")
        .trim()
]

export const customer_signup_validator = [
    body("first_name")
        .exists()
        .withMessage("First Name is required")
        .notEmpty()
        .withMessage("First Name cannot be empty")
        .trim()
        .customSanitizer(titleCase),
    body("last_name")
        .exists()
        .withMessage("Last Name is required")
        .notEmpty()
        .withMessage("Last Name cannot be empty")
        .trim()
        .customSanitizer(titleCase),
    body("email")
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid Email Address")
        .trim()
        .normalizeEmail(),
    body("password")
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({min: 6})
        .withMessage("Password must be atleast 6 characters"),
    body("phone")
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Phone Number cannot be empty")
        .isLength({min: 10})
        .withMessage("Phone Number must be atleast 10 digits.")
        .isInt()
        .withMessage("Phone Number must be integers")
        .customSanitizer(formatPhoneNumber),
    body()
        .custom(customerSignupValidation),
    body()
        .custom(body => checkAllowedFields(body, ["first_name", "last_name", "email", "password", "phone"]))
]

export const customer_login_validator = [
    body("email")
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid Email")
        .normalizeEmail(),
    body("password")
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .withMessage("Password cannot be empty"),
    body()
        .custom(body => checkAllowedFields(body, ["email", "password"]))
]

export const customer_logout_validator = [
    header("token")
        .exists()
        .withMessage("Header is required")
        .notEmpty()
        .withMessage("Header cannot be empty")
        .trim()
]