"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove_cart_item = exports.add_to_cart_validator = exports.remove_from_wishlist_validator = exports.add_to_wishlist_validator = exports.get_products_validator = exports.get_store_product = exports.delete_product_validator = exports.update_product_validator = exports.create_product_validator = exports.delete_color_validator = exports.update_color_validator = exports.create_color_validator = exports.delete_size_validator = exports.update_size_validator = exports.create_size_validator = exports.delete_sub_category_validator = exports.update_sub_category_validator = exports.get_sub_categories_validator = exports.create_sub_category_validator = exports.delete_category_validator = exports.update_category_validator = exports.create_category_validator = exports.change_store_status = exports.update_store_validator = exports.delete_store_validator = exports.create_store_validator = exports.customer_logout_validator = exports.customer_login_validator = exports.customer_signup_validator = exports.vendor_logout_validator = exports.vendor_login_validator = exports.vendor_signup_validator = void 0;
const express_validator_1 = require("express-validator");
const validation_1 = require("../helpers/validation");
exports.vendor_signup_validator = [
    (0, express_validator_1.body)("first_name")
        .exists()
        .withMessage("First Name is required")
        .notEmpty()
        .withMessage("First Name cannot be empty")
        .trim()
        .customSanitizer(validation_1.titleCase),
    (0, express_validator_1.body)("last_name")
        .exists()
        .withMessage("Last Name is required")
        .notEmpty()
        .withMessage("Last Name cannot be empty")
        .trim()
        .customSanitizer(validation_1.titleCase),
    (0, express_validator_1.body)("email")
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid Email")
        .normalizeEmail(),
    (0, express_validator_1.body)("password")
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ min: 6 })
        .withMessage("Password must be atleast 6 characters"),
    (0, express_validator_1.body)("phone")
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Phone Number cannot be empty")
        .isInt()
        .withMessage("Phone Number must be digit")
        .isLength({ min: 10 })
        .withMessage("Phone Number must be atleast 10 digits")
        .customSanitizer(validation_1.formatPhoneNumber),
    (0, express_validator_1.body)()
        .custom(validation_1.vendorSignUpValidation),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["first_name", "last_name", "email", "password", "phone"]))
];
exports.vendor_login_validator = [
    (0, express_validator_1.body)("email")
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid Email")
        .normalizeEmail(),
    (0, express_validator_1.body)("password")
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .withMessage("Password cannot be empty"),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["email", "password"]))
];
exports.vendor_logout_validator = [
    (0, express_validator_1.header)("token")
        .exists()
        .withMessage("Header is required")
        .notEmpty()
        .withMessage("Header cannot be empty")
        .trim()
];
exports.customer_signup_validator = [
    (0, express_validator_1.body)("first_name")
        .exists()
        .withMessage("First Name is required")
        .notEmpty()
        .withMessage("First Name cannot be empty")
        .trim()
        .customSanitizer(validation_1.titleCase),
    (0, express_validator_1.body)("last_name")
        .exists()
        .withMessage("Last Name is required")
        .notEmpty()
        .withMessage("Last Name cannot be empty")
        .trim()
        .customSanitizer(validation_1.titleCase),
    (0, express_validator_1.body)("email")
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid Email Address")
        .trim()
        .normalizeEmail(),
    (0, express_validator_1.body)("password")
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ min: 6 })
        .withMessage("Password must be atleast 6 characters"),
    (0, express_validator_1.body)("phone")
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Phone Number cannot be empty")
        .isLength({ min: 10 })
        .withMessage("Phone Number must be atleast 10 digits.")
        .isInt()
        .withMessage("Phone Number must be integers")
        .customSanitizer(validation_1.formatPhoneNumber),
    (0, express_validator_1.body)()
        .custom(validation_1.customerSignupValidation),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["first_name", "last_name", "email", "password", "phone"]))
];
exports.customer_login_validator = [
    (0, express_validator_1.body)("email")
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid Email")
        .normalizeEmail(),
    (0, express_validator_1.body)("password")
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .withMessage("Password cannot be empty"),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["email", "password"]))
];
exports.customer_logout_validator = [
    (0, express_validator_1.header)("token")
        .exists()
        .withMessage("Header is required")
        .notEmpty()
        .withMessage("Header cannot be empty")
        .trim()
];
exports.create_store_validator = [
    (0, express_validator_1.body)("name")
        .exists()
        .withMessage("Store Name is required")
        .notEmpty()
        .withMessage("Store Name cannot be empty")
        .customSanitizer(validation_1.titleCase)
        .trim(),
    (0, express_validator_1.body)("desc")
        .exists()
        .withMessage("Description is required")
        .notEmpty()
        .withMessage("Description cannot be empty"),
    (0, express_validator_1.body)("address")
        .exists()
        .withMessage("Address is required")
        .notEmpty()
        .withMessage("Address cannot be empty"),
    (0, express_validator_1.body)("phone")
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Phone Number cannot be empty"),
    (0, express_validator_1.body)("alt_phone")
        .optional(),
    (0, express_validator_1.body)("email")
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid Email")
        .normalizeEmail(),
    (0, express_validator_1.body)("state")
        .exists()
        .withMessage("State is required")
        .notEmpty()
        .withMessage("State cannot be empty"),
    (0, express_validator_1.body)("city")
        .exists()
        .withMessage("City is required")
        .notEmpty()
        .withMessage("City cannot be empty"),
    (0, express_validator_1.body)("logo")
        .optional(),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["name", "desc", "address", "phone", "alt_phone", "email", "state", "city", "logo"]))
];
exports.delete_store_validator = [
    (0, express_validator_1.param)("store_id")
        .exists()
        .withMessage("Store ID is required")
        .notEmpty()
        .withMessage("Store ID cannot be empty")
        .isInt()
        .withMessage("Store ID must be number")
];
exports.update_store_validator = [
    (0, express_validator_1.param)("store_id")
        .exists()
        .withMessage("Store ID is required")
        .notEmpty()
        .withMessage("Store ID cannot be empty")
        .isInt()
        .withMessage("Store ID must be number"),
    (0, express_validator_1.body)("name")
        .exists()
        .withMessage("Store Name is required")
        .notEmpty()
        .withMessage("Store Name cannot be empty")
        .customSanitizer(validation_1.titleCase)
        .trim(),
    (0, express_validator_1.body)("desc")
        .exists()
        .withMessage("Description is required")
        .notEmpty()
        .withMessage("Description cannot be empty"),
    (0, express_validator_1.body)("slug")
        .exists()
        .withMessage("Slug URL is required")
        .notEmpty()
        .withMessage("Slug URL cannot be empty"),
    (0, express_validator_1.body)("address")
        .exists()
        .withMessage("Address is required")
        .notEmpty()
        .withMessage("Address cannot be empty"),
    (0, express_validator_1.body)("phone")
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Phone Number cannot be empty"),
    (0, express_validator_1.body)("alt_phone")
        .optional(),
    (0, express_validator_1.body)("email")
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid Email")
        .normalizeEmail(),
    (0, express_validator_1.body)("state")
        .exists()
        .withMessage("State is required")
        .notEmpty()
        .withMessage("State cannot be empty"),
    (0, express_validator_1.body)("city")
        .exists()
        .withMessage("City is required")
        .notEmpty()
        .withMessage("City cannot be empty"),
    (0, express_validator_1.body)("logo")
        .optional(),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["name", "desc", "slug", "address", "phone", "alt_phone", "email", "state", "city", "logo"]))
];
exports.change_store_status = [
    (0, express_validator_1.param)("store_id")
        .exists()
        .withMessage("Store ID is required")
        .notEmpty()
        .withMessage("Store ID cannot be empty")
        .isInt()
        .withMessage("Store ID must be number"),
    (0, express_validator_1.body)("status")
        .exists()
        .withMessage("Status is required")
        .notEmpty()
        .withMessage("Status cannot be empty")
        .isIn(["active", "blocked"])
        .withMessage("Status must be active or blocked"),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["status"]))
];
exports.create_category_validator = [
    (0, express_validator_1.body)("name")
        .exists()
        .withMessage("Category Name is required")
        .notEmpty()
        .withMessage("Category Name cannot be empty")
        .customSanitizer(validation_1.titleCase)
        .trim(),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["name"]))
];
exports.update_category_validator = [
    (0, express_validator_1.param)("category_id")
        .exists()
        .withMessage("Category ID is required")
        .notEmpty()
        .withMessage("Category ID cannot be empty")
        .isInt()
        .withMessage("Category ID must be number"),
    (0, express_validator_1.body)("name")
        .exists()
        .withMessage("Category Name is required")
        .notEmpty()
        .withMessage("Category Name cannot be empty")
        .customSanitizer(validation_1.titleCase)
        .trim(),
    (0, express_validator_1.body)("slug")
        .exists()
        .withMessage("Slug URL is required")
        .notEmpty()
        .withMessage("Slug URL cannot be empty"),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["name", "slug"]))
];
exports.delete_category_validator = [
    (0, express_validator_1.param)("category_id")
        .exists()
        .withMessage("Category ID is required")
        .notEmpty()
        .withMessage("Category ID cannot be empty")
        .isInt()
        .withMessage("Category ID must be number")
];
exports.create_sub_category_validator = [
    (0, express_validator_1.body)("category_id")
        .exists()
        .withMessage("Category ID is required")
        .notEmpty()
        .withMessage("Category ID cannot be empty")
        .isInt()
        .withMessage("Category ID must be number"),
    (0, express_validator_1.body)("name")
        .exists()
        .withMessage("Sub Category Name is required")
        .notEmpty()
        .withMessage("Sub Category Name cannot be empty")
        .customSanitizer(validation_1.titleCase)
        .trim(),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ['category_id', 'name']))
];
exports.get_sub_categories_validator = [
    (0, express_validator_1.param)("category_id")
        .exists()
        .withMessage("Category ID is required")
        .notEmpty()
        .withMessage("Category ID cannot be empty")
        .isInt()
        .withMessage("Category ID must be number")
];
exports.update_sub_category_validator = [
    (0, express_validator_1.param)("sub_category_id")
        .exists()
        .withMessage("Sub Category ID is required")
        .notEmpty()
        .withMessage("Sub Category ID cannot be empty")
        .isInt()
        .withMessage("Sub Category ID must be number"),
    (0, express_validator_1.body)("category_id")
        .exists()
        .withMessage("Category ID is required")
        .notEmpty()
        .withMessage("Category ID cannot be empty")
        .isInt()
        .withMessage("Category ID must be number"),
    (0, express_validator_1.body)("name")
        .exists()
        .withMessage("Sub Category Name is required")
        .notEmpty()
        .withMessage("Sub Category Name cannot be empty"),
    (0, express_validator_1.body)("slug")
        .exists()
        .withMessage("Slug URL is required")
        .notEmpty()
        .withMessage("Slug URL cannot be empty"),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["category_id", "name", "slug"]))
];
exports.delete_sub_category_validator = [
    (0, express_validator_1.param)("sub_category_id")
        .exists()
        .withMessage("Sub Category ID is required")
        .notEmpty()
        .withMessage("Sub Category ID cannot be empty")
        .isInt()
        .withMessage("Sub Category ID must be number")
];
exports.create_size_validator = [
    (0, express_validator_1.body)("size")
        .exists()
        .withMessage("Size is required")
        .notEmpty()
        .withMessage("Size cannot be empty")
        .trim(),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["size"]))
];
exports.update_size_validator = [
    (0, express_validator_1.param)("size_id")
        .exists()
        .withMessage("Size ID is required")
        .notEmpty()
        .withMessage("Size ID cannot be empty")
        .isInt()
        .withMessage("Size ID must be number"),
    (0, express_validator_1.body)("size")
        .exists()
        .withMessage("Size is required")
        .notEmpty()
        .withMessage("Size cannot be empty")
        .trim(),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["size"]))
];
exports.delete_size_validator = [
    (0, express_validator_1.param)("size_id")
        .exists()
        .withMessage("Size ID is required")
        .notEmpty()
        .withMessage("Size ID cannot be empty")
        .isInt()
        .withMessage("Size ID must be number")
];
exports.create_color_validator = [
    (0, express_validator_1.body)("color")
        .exists()
        .withMessage("Color is required")
        .notEmpty()
        .withMessage("Color Cannot be empty")
        .trim(),
    (0, express_validator_1.body)("code")
        .exists()
        .withMessage("Color Code is required")
        .notEmpty()
        .withMessage("Color Code cannot be empty")
        .trim(),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["color", "code"]))
];
exports.update_color_validator = [
    (0, express_validator_1.param)("color_id")
        .exists()
        .withMessage("Color ID is required")
        .notEmpty()
        .withMessage("Color ID cannot be empty")
        .isInt()
        .withMessage("Color ID must be number"),
    (0, express_validator_1.body)("color")
        .exists()
        .withMessage("Color is required")
        .notEmpty()
        .withMessage("Color cannot be empty")
        .trim(),
    (0, express_validator_1.body)("code")
        .exists()
        .withMessage("Color Code is required")
        .notEmpty()
        .withMessage("Color Code cannot be empty")
        .trim(),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["color", "code"]))
];
exports.delete_color_validator = [
    (0, express_validator_1.param)("color_id")
        .exists()
        .withMessage("Color ID is required")
        .notEmpty()
        .withMessage("Color ID cannot be empty")
        .isInt()
        .withMessage("Color ID must be number")
];
exports.create_product_validator = [
    (0, express_validator_1.body)("name")
        .exists()
        .withMessage("Product Name is required")
        .notEmpty()
        .withMessage("Product Name cannot be empty")
        .customSanitizer(validation_1.titleCase),
    (0, express_validator_1.body)("description")
        .exists()
        .withMessage("Description is required")
        .notEmpty()
        .withMessage("Description cannot be empty"),
    (0, express_validator_1.body)("regular_price")
        .exists()
        .withMessage("Regular Price is required")
        .notEmpty()
        .withMessage("Regular Price cannot be empty")
        .isInt()
        .withMessage("Regular Price must be number"),
    (0, express_validator_1.body)("promo_price")
        .optional()
        .isInt()
        .withMessage("Promo Price must be number"),
    (0, express_validator_1.body)("currency")
        .exists()
        .withMessage("Currency is required")
        .notEmpty()
        .withMessage("Currency cannot be empty"),
    (0, express_validator_1.body)("tax_rate")
        .optional()
        .isInt()
        .withMessage("Tax Rate must be number"),
    (0, express_validator_1.body)("category_id")
        .exists()
        .withMessage("Category ID is required")
        .notEmpty()
        .withMessage("Category ID cannot be empty")
        .isInt()
        .withMessage("Category ID must be number"),
    (0, express_validator_1.body)("sub_category_id")
        .exists()
        .withMessage("Sub Category ID is required")
        .notEmpty()
        .withMessage("Sub Category cannot be empty")
        .isInt()
        .withMessage("Sub Category cannot be empty"),
    (0, express_validator_1.body)("store_id")
        .exists()
        .withMessage("Store ID is required")
        .notEmpty()
        .withMessage("Store ID cannot be empty")
        .isInt()
        .withMessage("Store ID must be number"),
    (0, express_validator_1.body)("quantity")
        .exists()
        .withMessage("Quantity is required")
        .notEmpty()
        .withMessage("Quantity cannot be empty")
        .isInt()
        .withMessage("Quantity must be number"),
    (0, express_validator_1.body)("sizes")
        .optional()
        .exists()
        .withMessage("Size are required")
        .notEmpty()
        .withMessage("Size cannot be empty")
        .isArray()
        .withMessage("Size must be an array"),
    (0, express_validator_1.body)("colors")
        .optional()
        .isArray()
        .withMessage("Color must be array"),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["name", "description", "regular_price", "promo_price", "currency", "tax_rate", "category_id", "sub_category_id", "store_id", "quantity", "sizes", "colors"]))
];
exports.update_product_validator = [
    (0, express_validator_1.param)("product_id")
        .exists()
        .withMessage("Product ID is required")
        .notEmpty()
        .withMessage("Product ID cannot be empty")
        .isInt()
        .withMessage("Product ID must be number"),
    (0, express_validator_1.body)("name")
        .exists()
        .withMessage("Product Name is required")
        .notEmpty()
        .withMessage("Product Name cannot be empty")
        .customSanitizer(validation_1.titleCase),
    (0, express_validator_1.body)("description")
        .exists()
        .withMessage("Product Description is required")
        .notEmpty()
        .withMessage("Product Description cannot be empty"),
    (0, express_validator_1.body)("regular_price")
        .exists()
        .withMessage("Regular Price is required")
        .notEmpty()
        .withMessage("Regular Price cannot be empty")
        .isInt()
        .withMessage("Regular Price must be number"),
    (0, express_validator_1.body)("promo_price")
        .optional()
        .isInt()
        .withMessage("Promo Price must be number"),
    (0, express_validator_1.body)("currency")
        .exists()
        .withMessage("Currency is required")
        .notEmpty()
        .withMessage("Currency cannot be empty"),
    (0, express_validator_1.body)("tax_rate")
        .optional()
        .isInt()
        .withMessage("Tax Rate must be number"),
    (0, express_validator_1.body)("category_id")
        .exists()
        .withMessage("Category ID is required")
        .notEmpty()
        .withMessage("Category ID cannot be empty")
        .isInt()
        .withMessage("Category ID must be number"),
    (0, express_validator_1.body)("sub_category_id")
        .exists()
        .withMessage("Sub Category ID is required")
        .notEmpty()
        .withMessage("Sub Category cannot be empty")
        .isInt()
        .withMessage("Sub Category cannot be empty"),
    (0, express_validator_1.body)("quantity")
        .exists()
        .withMessage("Quantity is required")
        .notEmpty()
        .withMessage("Quantity cannot be empty")
        .isInt()
        .withMessage("Quantity must be number"),
    (0, express_validator_1.body)("sizes")
        .exists()
        .withMessage("Size are required")
        .notEmpty()
        .withMessage("Size cannot be empty")
        .isArray()
        .withMessage("Size must be an array"),
    (0, express_validator_1.body)("colors")
        .optional()
        .isArray()
        .withMessage("Color must be array"),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["name", "description", "regular_price", "promo_price", "currency", "tax_rate", "category_id", "sub_category_id", "store_id", "quantity", "sizes", "colors"]))
];
exports.delete_product_validator = [
    (0, express_validator_1.param)("product_id")
        .exists()
        .withMessage("Product ID is required")
        .notEmpty()
        .withMessage("Product ID cannot be empty")
        .isInt()
        .withMessage("Product ID must be number"),
    (0, express_validator_1.body)("store_id")
        .exists()
        .withMessage("Store ID is required")
        .notEmpty()
        .withMessage("Store Id cannot be empty")
        .isInt()
        .withMessage("Store ID must be number"),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["store_id"]))
];
exports.get_store_product = [
    (0, express_validator_1.param)("store_id")
        .exists()
        .withMessage("Store ID is required")
        .notEmpty()
        .withMessage("Store Id cannot be empty")
        .isInt()
        .withMessage("Store ID must be number"),
];
exports.get_products_validator = [
    (0, express_validator_1.query)("page")
        .optional()
        .isInt()
        .withMessage("Page must be number"),
    (0, express_validator_1.query)("page_size")
        .optional()
        .isInt()
        .withMessage("Page Size must be number")
];
exports.add_to_wishlist_validator = [
    (0, express_validator_1.body)("product_id")
        .exists()
        .withMessage("Product ID is required")
        .notEmpty()
        .withMessage("Product ID cannot be empty")
        .isInt()
        .withMessage("Product ID must be number"),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ['product_id']))
];
exports.remove_from_wishlist_validator = [
    (0, express_validator_1.param)("wishlist_item_id")
        .exists()
        .withMessage("Wishlist Item ID is required")
        .notEmpty()
        .withMessage("Wishlist Item ID cannot be empty")
        .isInt()
        .withMessage("Wishlist Item ID must be number"),
    (0, express_validator_1.body)("wishlist_id")
        .exists()
        .withMessage("Wishlist ID is required")
        .notEmpty()
        .withMessage("Wishlist ID cannot be empty")
        .isInt()
        .withMessage("Wishlist ID must be number"),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["wishlist_id"]))
];
exports.add_to_cart_validator = [
    (0, express_validator_1.body)("product_id")
        .exists()
        .withMessage("Product ID is required")
        .notEmpty()
        .withMessage("Product ID cannot be empty")
        .isInt()
        .withMessage("Product ID must be number"),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ['product_id']))
];
exports.remove_cart_item = [
    (0, express_validator_1.param)("product_id")
        .exists()
        .withMessage("Product ID is required")
        .notEmpty()
        .withMessage("Product ID cannot be empty")
        .isInt()
        .withMessage("Product ID must be number"),
    (0, express_validator_1.body)("cart_id")
        .exists()
        .withMessage("Cart ID is required")
        .notEmpty()
        .withMessage("Cart ID cannot be empty")
        .isInt()
        .withMessage("Cart ID must be number"),
    (0, express_validator_1.body)()
        .custom(body => (0, validation_1.checkAllowedFields)(body, ["cart_id"]))
];
