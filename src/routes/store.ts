import express from "express";
import { changeStoreStatus, createStore, deleteStore, updateStore, vendorGetStores } from "../controllers/store";
import { vendorAuth } from "../middlewares/auth";
import { validationHandler } from "../helpers/validation";
import { change_store_status, create_store_validator, delete_store_validator, update_store_validator } from "../middlewares/validator";

const router = express.Router();

//vendor route
router.post('/vendor', vendorAuth, validationHandler(create_store_validator),  createStore);
router.get('/vendor', vendorAuth, vendorGetStores);
router.delete('/vendor/:store_id', vendorAuth, validationHandler(delete_store_validator), deleteStore);
router.put('/vendor/:store_id', vendorAuth, validationHandler(update_store_validator), updateStore);
router.patch('/vendor/change-status/:store_id', vendorAuth, validationHandler(change_store_status), changeStoreStatus);

export = router;