"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const validation_1 = require("../helpers/validation");
const validator_1 = require("../middlewares/validator");
const auth_1 = require("../middlewares/auth");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
router.post('/create', upload.array('files'), auth_1.vendorAuth, (0, validation_1.validationHandler)(validator_1.create_product_validator), product_1.createProduct);
router.get('/all', (0, validation_1.validationHandler)(validator_1.get_products_validator), product_1.getProducts);
router.put('/update/:product_id', auth_1.vendorAuth, (0, validation_1.validationHandler)(validator_1.update_product_validator), product_1.updateProduct);
router.get('/store/:store_id', auth_1.vendorAuth, (0, validation_1.validationHandler)(validator_1.get_store_product), product_1.getProductsByStore);
router.delete('/delete/:product_id', auth_1.vendorAuth, (0, validation_1.validationHandler)(validator_1.delete_product_validator), product_1.deleteProduct);
router.get('/image/:file_name', product_1.getProductImage);
exports.default = router;
