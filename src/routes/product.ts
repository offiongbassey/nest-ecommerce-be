import express from "express";
import { createProduct, deleteProduct, getProducts, getProductsByStore, updateProduct } from "../controllers/product";
import { validationHandler } from "../helpers/validation";
import { create_product_validator, delete_product_validator, get_products_validator, get_store_product, update_product_validator } from "../middlewares/validator";
import { vendorAuth } from "../middlewares/auth";
const router = express.Router();

router.post('/create', vendorAuth, validationHandler(create_product_validator), createProduct);
router.get('/all', validationHandler(get_products_validator), getProducts);
router.put('/update/:product_id', vendorAuth, validationHandler(update_product_validator), updateProduct);
router.get('/store/:store_id', vendorAuth, validationHandler(get_store_product), getProductsByStore);
router.delete('/delete/:product_id', vendorAuth, validationHandler(delete_product_validator), deleteProduct);

export default router;