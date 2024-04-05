"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const validation_1 = require("../helpers/validation");
const validator_1 = require("../middlewares/validator");
const size_1 = require("../controllers/size");
const router = express_1.default.Router();
router.post('/', (0, validation_1.validationHandler)(validator_1.create_size_validator), size_1.createSize);
router.get('/', size_1.getActiveSizes);
router.put('/:size_id', (0, validation_1.validationHandler)(validator_1.update_size_validator), size_1.updateSize);
router.delete('/:size_id', (0, validation_1.validationHandler)(validator_1.delete_size_validator), size_1.deleteSize);
module.exports = router;
