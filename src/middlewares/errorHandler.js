// src/middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error('💥 Error:', err); // logs full error stack
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
};

