import express from "express";
import { validationHandler } from "../helpers/validation";
import { create_color_validator, delete_color_validator, update_color_validator } from "../middlewares/validator";
import { createColor, deleteColor, getActiveColors, updateColor } from "../controllers/color";

const router = express.Router();

router.post('/', validationHandler(create_color_validator), createColor);
router.get('/', getActiveColors);
router.put('/:color_id', validationHandler(update_color_validator), updateColor);
router.delete('/:color_id', validationHandler(delete_color_validator), deleteColor);

export = router;