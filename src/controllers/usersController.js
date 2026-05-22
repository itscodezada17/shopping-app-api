const pool = require('../db');
const bcrypt = require('bcryptjs');

exports.listUsers = async (req, res, next) => {
  try {
    const [rows] = await pool.execute('SELECT id, name, email, created_at FROM users');
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const {id} = req.query;
    const [rows] = await pool.execute('SELECT id, name, email, created_at FROM users WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email, and password required' });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const [newUserRows] = await pool.execute(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newUserRows[0]);
  } catch (err) {
    // handle duplicate email error
    if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'Email already exists' });
    next(err);
  }
};

