const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const auth = require("../middlewares/authHandler");

router.get("/", auth, wishlistController.getWishlist);
router.post("/items/:itemId", auth, wishlistController.addToWishlist);
router.delete("/items/:itemId", auth, wishlistController.removeFromWishlist);

module.exports = router;

