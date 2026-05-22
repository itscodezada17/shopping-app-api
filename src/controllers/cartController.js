const pool = require("../db");


// Get all items in a user's cart
exports.getCart = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const [rows] = await pool.execute(
      `SELECT ci.item_id, ci.quantity, ai.title, ai.description
       FROM cartItems ci
       JOIN availableItems ai ON ci.item_id = ai.id
       WHERE ci.user_id = ?`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// Add item to cart (if exists, increase quantity)
exports.addToCart = async (req, res, next) => {
  const { userId } = req.params;
  const { itemId, quantity } = req.body;

  try {
    // Try insert
    await pool.execute(
      `INSERT INTO cartItems (user_id, item_id, quantity) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
      [userId, itemId, quantity || 1]
    );

    res.json({ message: "Item added to cart" });
  } catch (err) {
    next(err);
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res, next) => {
  const { userId, itemId } = req.params;

  try {
    await pool.execute(`DELETE FROM cartItems WHERE user_id = ? AND item_id = ?`, [
      userId,
      itemId,
    ]);

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    next(err);
  }
};

// Update item quantity
exports.updateQuantity = async (req, res, next) => {
  const { userId, itemId } = req.params;
  const { quantity } = req.body;

  try {
    await pool.execute(
      `UPDATE cartItems SET quantity = ? WHERE user_id = ? AND item_id = ?`,
      [quantity, userId, itemId]
    );

    res.json({ message: "Quantity updated" });
  } catch (err) {
    next(err);
  }
};
