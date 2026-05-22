const express = require('express');
const router = express.Router();
const listItems = require('../controllers/availableItemsController');

router.get('/', listItems.availableItems);

module.exports = router;