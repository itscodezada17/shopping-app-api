const pool = require("../db");

const getItemId = (rawItemId) => {
  const itemId = Number(rawItemId);
  return Number.isInteger(itemId) && itemId > 0 ? itemId : null;
};

exports.getWishlist = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const [rows] = await pool.execute(
      `SELECT wi.item_id AS itemId, wi.created_at AS addedAt, ai.title, ai.description
       FROM wishlistItems wi
       JOIN availableItems ai ON wi.item_id = ai.id
       WHERE wi.user_id = ?
       ORDER BY wi.created_at DESC`,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.addToWishlist = async (req, res, next) => {
  const userId = req.user.id;
  const itemId = getItemId(req.params.itemId);

  if (!itemId) {
    return res.status(400).json({ error: "Valid itemId is required" });
  }

  try {
    const [items] = await pool.execute("SELECT id FROM availableItems WHERE id = ?", [itemId]);
    if (!items.length) {
      return res.status(404).json({ error: "Item not found" });
    }

    await pool.execute(
      `INSERT INTO wishlistItems (user_id, item_id) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE created_at = created_at`,
      [userId, itemId]
    );

    res.status(201).json({ message: "Item added to wishlist", itemId });
  } catch (err) {
    next(err);
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  const userId = req.user.id;
  const itemId = getItemId(req.params.itemId);

  if (!itemId) {
    return res.status(400).json({ error: "Valid itemId is required" });
  }

  try {
    const [result] = await pool.execute(
      "DELETE FROM wishlistItems WHERE user_id = ? AND item_id = ?",
      [userId, itemId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }

    res.json({ message: "Item removed from wishlist", itemId });
  } catch (err) {
    next(err);
  }
};

