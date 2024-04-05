"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishlist_1 = require("../controllers/wishlist");
const auth_1 = require("../middlewares/auth");
const validation_1 = require("../helpers/validation");
const validator_1 = require("../middlewares/validator");
const router = express_1.default.Router();
router.post('/', auth_1.customerAuth, (0, validation_1.validationHandler)(validator_1.add_to_wishlist_validator), wishlist_1.addToWishlist);
router.get('/', auth_1.customerAuth, wishlist_1.getWishlist);
router.patch('/:wishlist_item_id', auth_1.customerAuth, (0, validation_1.validationHandler)(validator_1.remove_from_wishlist_validator), wishlist_1.removeFromWishlist);
exports.default = router;
