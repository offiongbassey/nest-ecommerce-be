import express from "express";
import authRoute from "./auth";
import storeRoute from "./store";
import categoryRoute from "./category";
import subCategoryRoute from "./subCategory";
import sizeRoute from "./size";
import colorRoute from "./color";
import productRoute from "./product";
import wishlistRoute from './wishlist';
import cartRoute from "./cart";

const router = express.Router();

router.use('/auth', authRoute);
router.use('/store', storeRoute);
router.use('/category', categoryRoute);
router.use('/sub-category', subCategoryRoute);
router.use('/size', sizeRoute);
router.use('/color', colorRoute);
router.use('/product', productRoute);
router.use('/wishlist', wishlistRoute);
router.use('/cart', cartRoute);

export default router;