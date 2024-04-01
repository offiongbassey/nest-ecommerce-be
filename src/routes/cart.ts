import expres from "express";
import { validationHandler } from "../helpers/validation";
import { add_to_cart_validator, remove_cart_item } from "../middlewares/validator";
import { addToCart, deleteCartItem, getCart, removeCartItem } from "../controllers/cart";
import { customerAuth } from "../middlewares/auth";

const router = expres.Router();

router.post('/', customerAuth, validationHandler(add_to_cart_validator), addToCart);
router.get('/', customerAuth, getCart);
router.patch('/:product_id', customerAuth, validationHandler(remove_cart_item), removeCartItem);
router.delete('/:product_id', customerAuth, validationHandler(remove_cart_item), deleteCartItem);

export default router;