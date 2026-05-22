CREATE TABLE IF NOT EXISTS wishlistItems (
  user_id INT NOT NULL,
  item_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, item_id),
  CONSTRAINT fk_wishlist_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_wishlist_item
    FOREIGN KEY (item_id) REFERENCES availableItems(id)
    ON DELETE CASCADE
);

