import express from "express";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlist";
import { customerAuth } from "../middlewares/auth";
import { validationHandler } from "../helpers/validation";
import { add_to_wishlist_validator, remove_from_wishlist_validator } from "../middlewares/validator";

const router = express.Router();

router.post('/', customerAuth, validationHandler(add_to_wishlist_validator), addToWishlist);
router.get('/', customerAuth, getWishlist);
router.patch('/:wishlist_item_id', customerAuth, validationHandler(remove_from_wishlist_validator), removeFromWishlist);

export default router;