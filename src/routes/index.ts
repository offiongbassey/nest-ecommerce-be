import express from "express";
import authRoute from "./auth";
import storeRoute from "./store";
import categoryRoute from "./category";
import subCategoryRoute from "./subCategory";
const router = express.Router();

router.use('/auth', authRoute);
router.use('/store', storeRoute);
router.use('/category', categoryRoute);
router.use('/sub-category', subCategoryRoute);

export default router;