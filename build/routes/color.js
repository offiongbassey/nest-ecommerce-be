"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const validation_1 = require("../helpers/validation");
const validator_1 = require("../middlewares/validator");
const color_1 = require("../controllers/color");
const router = express_1.default.Router();
router.post('/', (0, validation_1.validationHandler)(validator_1.create_color_validator), color_1.createColor);
router.get('/', color_1.getActiveColors);
router.put('/:color_id', (0, validation_1.validationHandler)(validator_1.update_color_validator), color_1.updateColor);
router.delete('/:color_id', (0, validation_1.validationHandler)(validator_1.delete_color_validator), color_1.deleteColor);
module.exports = router;
