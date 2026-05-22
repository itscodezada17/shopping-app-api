const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const auth = require("../middlewares/authHandler");


// Get all cart items for a user
router.get("/:userId", auth, cartController.getCart);

// Add an item to cart
router.post("/:userId/add", auth, cartController.addToCart);

// Remove an item from cart
router.delete("/:userId/remove/:itemId", auth, cartController.removeFromCart);

// Update quantity
router.put("/:userId/update/:itemId", auth, cartController.updateQuantity);

module.exports = router;
