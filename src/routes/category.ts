import express from "express";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../controllers/category";
import { validationHandler } from "../helpers/validation";
import { create_category_validator, delete_category_validator, update_category_validator } from "../middlewares/validator";

const router = express.Router();

//admin route
router.post('/', validationHandler(create_category_validator), createCategory);
router.get('/', getAllCategories);
router.put('/:category_id', validationHandler(update_category_validator), updateCategory);
router.delete('/:category_id', validationHandler(delete_category_validator), deleteCategory);

export = router;