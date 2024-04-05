"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const category_1 = require("../controllers/category");
const validation_1 = require("../helpers/validation");
const validator_1 = require("../middlewares/validator");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
//admin route
router.post('/', upload.single("file"), (0, validation_1.validationHandler)(validator_1.create_category_validator), category_1.createCategory);
router.get('/', category_1.getAllCategories);
router.put('/:category_id', (0, validation_1.validationHandler)(validator_1.update_category_validator), category_1.updateCategory);
router.delete('/:category_id', (0, validation_1.validationHandler)(validator_1.delete_category_validator), category_1.deleteCategory);
router.get('/image/:file_name', category_1.getCategoryImage);
module.exports = router;
