const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");



router.post("/addProductToWishlist", wishlistController.addProductToWishlist);
router.get("/wishlist/:userId", wishlistController.getWishlistByUserId);
router.delete("/wishlist/:userId/product/:productId", wishlistController.deleteProductFromWishlist);
router.get("/wishlists", wishlistController.getAllWishlists);

module.exports = router;
