const pool = require('../db');
const bcrypt = require('bcryptjs');

exports.availableItems = async (req, res, next) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM availableItems');
    res.json(rows);
  } catch (err) {
    next(err);
  }
};