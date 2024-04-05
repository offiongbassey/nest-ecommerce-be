"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const validation_1 = require("../helpers/validation");
const validator_1 = require("../middlewares/validator");
const subCategory_1 = require("../controllers/subCategory");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
router.post('/', upload.single("file"), (0, validation_1.validationHandler)(validator_1.create_sub_category_validator), subCategory_1.createSubCategory);
router.get('/', subCategory_1.getAllSubCategories);
router.get('/:category_id', (0, validation_1.validationHandler)(validator_1.get_sub_categories_validator), subCategory_1.getSubCategory);
router.put('/:sub_category_id', (0, validation_1.validationHandler)(validator_1.update_sub_category_validator), subCategory_1.updateSubCategory);
router.delete('/:sub_category_id', (0, validation_1.validationHandler)(validator_1.delete_sub_category_validator), subCategory_1.deleteSubCategory);
router.get('/image/:file_name', subCategory_1.getSubCategoryImage);
module.exports = router;
