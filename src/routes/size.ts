import express from "express";
import { validationHandler } from "../helpers/validation";
import { create_size_validator, delete_size_validator, update_size_validator } from "../middlewares/validator";
import { createSize, deleteSize, getActiveSizes, updateSize } from "../controllers/size";

const router = express.Router();

router.post('/', validationHandler(create_size_validator), createSize);
router.get('/', getActiveSizes);
router.put('/:size_id', validationHandler(update_size_validator), updateSize);
router.delete('/:size_id', validationHandler(delete_size_validator), deleteSize);
export = router;