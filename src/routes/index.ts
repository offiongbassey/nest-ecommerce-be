import express from "express";
import authRoute from "./auth";
import storeRoute from "./store";
const router = express.Router();

router.use('/auth', authRoute);
router.use('/store', storeRoute);

export default router;