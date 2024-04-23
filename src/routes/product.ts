import express from "express";
import { createProduct, deleteProduct, getProductBySlug, getProductImage, getProducts, getProductsByStore, getProductsBySubCategory, getRandomProducts, getRelatedProducts, getVendorProductById, getVendorProducts, updateProduct } from "../controllers/product";
import { validationHandler } from "../helpers/validation";
import { create_product_validator, delete_product_validator, get_product_by_slug_validator, get_products_by_sub_category_validator, get_products_validator, get_store_product, update_product_validator } from "../middlewares/validator";
import { vendorAuth } from "../middlewares/auth";
import multer from "multer";

const upload = multer();
const router = express.Router();

router.post('/create', upload.array('files'), vendorAuth, validationHandler(create_product_validator), createProduct);
router.get('/all', validationHandler(get_products_validator), getProducts);
router.get('/random', getRandomProducts);
router.get('/sub-category/:sub_category_id', validationHandler(get_products_by_sub_category_validator), getProductsBySubCategory);
router.get('/related/:slug', validationHandler(get_product_by_slug_validator), getRelatedProducts);
router.get('/vendor', vendorAuth, getVendorProducts);
router.get('/vendor/:product_id', vendorAuth, getVendorProductById);
router.put('/update/:product_id', upload.array('files'), vendorAuth, validationHandler(update_product_validator), updateProduct);
router.get('/store/:store_id', vendorAuth, validationHandler(get_store_product), getProductsByStore);
router.delete('/delete/:product_id', vendorAuth, validationHandler(delete_product_validator), deleteProduct);
router.get('/image/:file_name', getProductImage);

router.get('/:slug', validationHandler(get_product_by_slug_validator), getProductBySlug);

export default router;