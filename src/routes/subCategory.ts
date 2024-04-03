import express from "express";
import { validationHandler } from "../helpers/validation";
import { create_sub_category_validator, delete_sub_category_validator, get_sub_categories_validator, update_sub_category_validator } from "../middlewares/validator";
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategory, getSubCategoryImage, updateSubCategory } from "../controllers/subCategory";
import multer from "multer";

const upload = multer();
const router = express.Router();

router.post('/', upload.single("file"), validationHandler(create_sub_category_validator), createSubCategory);
router.get('/', getAllSubCategories);
router.get('/:category_id', validationHandler(get_sub_categories_validator), getSubCategory);
router.put('/:sub_category_id', validationHandler(update_sub_category_validator), updateSubCategory);
router.delete('/:sub_category_id', validationHandler(delete_sub_category_validator), deleteSubCategory);
router.get('/image/:file_name', getSubCategoryImage);

export = router;