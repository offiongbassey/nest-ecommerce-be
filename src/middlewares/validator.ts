import { body, header, param } from "express-validator";
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

export const create_store_validator = [
    body("name")
        .exists()
        .withMessage("Store Name is required")
        .notEmpty()
        .withMessage("Store Name cannot be empty")
        .customSanitizer(titleCase)
        .trim(),
    body("desc")
        .exists()
        .withMessage("Description is required")
        .notEmpty()
        .withMessage("Description cannot be empty"),
    body("address")
        .exists()
        .withMessage("Address is required")
        .notEmpty()
        .withMessage("Address cannot be empty"),
    body("phone")
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Phone Number cannot be empty"),
    body("alt_phone")
        .optional(),
    body("email")
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid Email")
        .normalizeEmail(),
    body("state")
        .exists()
        .withMessage("State is required")
        .notEmpty()
        .withMessage("State cannot be empty"),
    body("city")
        .exists()
        .withMessage("City is required")
        .notEmpty()
        .withMessage("City cannot be empty"),
    body("logo")
        .optional(),
    body()
        .custom(body => checkAllowedFields(body, ["name", "desc", "address", "phone", "alt_phone", "email", "state", "city", "logo"]))
]

export const delete_store_validator = [
    param("store_id")
        .exists()
        .withMessage("Store ID is required")
        .notEmpty()
        .withMessage("Store ID cannot be empty")
        .isInt()
        .withMessage("Store ID must be number")
]

export const update_store_validator = [
    param("store_id")
        .exists()
        .withMessage("Store ID is required")
        .notEmpty()
        .withMessage("Store ID cannot be empty")
        .isInt()
        .withMessage("Store ID must be number"),
    body("name")
        .exists()
        .withMessage("Store Name is required")
        .notEmpty()
        .withMessage("Store Name cannot be empty")
        .customSanitizer(titleCase)
        .trim(),
    body("desc")
        .exists()
        .withMessage("Description is required")
        .notEmpty()
        .withMessage("Description cannot be empty"),
    body("slug")
        .exists()
        .withMessage("Slug URL is required")
        .notEmpty()
        .withMessage("Slug URL cannot be empty"),
    body("address")
        .exists()
        .withMessage("Address is required")
        .notEmpty()
        .withMessage("Address cannot be empty"),
    body("phone")
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Phone Number cannot be empty"),
    body("alt_phone")
        .optional(),
    body("email")
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid Email")
        .normalizeEmail(),
    body("state")
        .exists()
        .withMessage("State is required")
        .notEmpty()
        .withMessage("State cannot be empty"),
    body("city")
        .exists()
        .withMessage("City is required")
        .notEmpty()
        .withMessage("City cannot be empty"),
    body("logo")
        .optional(),
    body()
        .custom(body => checkAllowedFields(body, ["name", "desc", "slug", "address", "phone", "alt_phone", "email", "state", "city", "logo"]))
]

export const change_store_status = [
    param("store_id")
        .exists()
        .withMessage("Store ID is required")
        .notEmpty()
        .withMessage("Store ID cannot be empty")
        .isInt()
        .withMessage("Store ID must be number"),
    body("status")
        .exists()
        .withMessage("Status is required")
        .notEmpty()
        .withMessage("Status cannot be empty")
        .isIn(["active", "blocked"])
        .withMessage("Status must be active or blocked"),
    body()
        .custom(body => checkAllowedFields(body, ["status"]))
]

export const create_category_validator = [
    body("name")
        .exists()
        .withMessage("Category Name is required")
        .notEmpty()
        .withMessage("Category Name cannot be empty")
        .customSanitizer(titleCase)
        .trim(),
    body()
        .custom(body => checkAllowedFields(body, ["name"]))
]

export const update_category_validator = [
    param("category_id")
        .exists()
        .withMessage("Category ID is required")
        .notEmpty()
        .withMessage("Category ID cannot be empty")
        .isInt()
        .withMessage("Category ID must be number"),
    body("name")
        .exists()
        .withMessage("Category Name is required")
        .notEmpty()
        .withMessage("Category Name cannot be empty")
        .customSanitizer(titleCase)
        .trim(),
    body("slug")
        .exists()
        .withMessage("Slug URL is required")
        .notEmpty()
        .withMessage("Slug URL cannot be empty"),
    body()
        .custom(body => checkAllowedFields(body, ["name", "slug"]))
]

export const delete_category_validator = [
    param("category_id")
        .exists()
        .withMessage("Category ID is required")
        .notEmpty()
        .withMessage("Category ID cannot be empty")
        .isInt()
        .withMessage("Category ID must be number")
]

export const create_sub_category_validator = [
    body("category_id")
        .exists()
        .withMessage("Sub Category ID is required")
        .notEmpty()
        .withMessage("Sub Category ID cannot be empty")
        .isInt()
        .withMessage("Sub Category ID must be number"),
    body("name")
        .exists()
        .withMessage("Sub Category Name is required")
        .notEmpty()
        .withMessage("Sub Category Name cannot be empty")
        .customSanitizer(titleCase)
        .trim(),
    body()
        .custom(body => checkAllowedFields(body, ['category_id', 'name']))
]

export const get_sub_categories_validator = [
    param("category_id")
        .exists()
        .withMessage("Category ID is required")
        .notEmpty()
        .withMessage("Category ID cannot be empty")
        .isInt()
        .withMessage("Category ID must be number")
]

export const update_sub_category_validator = [
    param("sub_category_id")
        .exists()
        .withMessage("Sub Category ID is required")
        .notEmpty()
        .withMessage("Sub Category ID cannot be empty")
        .isInt()
        .withMessage("Sub Category ID must be number"),
    body("category_id")
        .exists()
        .withMessage("Category ID is required")
        .notEmpty()
        .withMessage("Category ID cannot be empty")
        .isInt()
        .withMessage("Category ID must be number"),
    body("name")
        .exists()
        .withMessage("Sub Category Name is required")
        .notEmpty()
        .withMessage("Sub Category Name cannot be empty"),
    body("slug")
        .exists()
        .withMessage("Slug URL is required")
        .notEmpty()
        .withMessage("Slug URL cannot be empty"),
    body()
        .custom(body => checkAllowedFields(body, ["category_id", "name", "slug"]))
]

export const delete_sub_category_validator = [
    param("sub_category_id")
        .exists()
        .withMessage("Sub Category ID is required")
        .notEmpty()
        .withMessage("Sub Category ID cannot be empty")
        .isInt()
        .withMessage("Sub Category ID must be number")
]