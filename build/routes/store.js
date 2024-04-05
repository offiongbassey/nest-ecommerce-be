"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const store_1 = require("../controllers/store");
const auth_1 = require("../middlewares/auth");
const validation_1 = require("../helpers/validation");
const validator_1 = require("../middlewares/validator");
const router = express_1.default.Router();
//vendor route
router.post('/vendor', auth_1.vendorAuth, (0, validation_1.validationHandler)(validator_1.create_store_validator), store_1.createStore);
router.get('/vendor', auth_1.vendorAuth, store_1.vendorGetStores);
router.delete('/vendor/:store_id', auth_1.vendorAuth, (0, validation_1.validationHandler)(validator_1.delete_store_validator), store_1.deleteStore);
router.put('/vendor/:store_id', auth_1.vendorAuth, (0, validation_1.validationHandler)(validator_1.update_store_validator), store_1.updateStore);
router.patch('/vendor/change-status/:store_id', auth_1.vendorAuth, (0, validation_1.validationHandler)(validator_1.change_store_status), store_1.changeStoreStatus);
module.exports = router;
