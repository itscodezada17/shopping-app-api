require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const usersRouter = require('./routes/users');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/auth');
const itemsRoutes = require('./routes/items');
const cartRouter = require("./routes/carts");


const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/auth', authRoutes);
app.use('/api/items', itemsRoutes);
app.use("/cart", cartRouter);


// health check
app.get('/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// 404 for unknown routes
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// central error handler
app.use(errorHandler);

module.exports = app;
