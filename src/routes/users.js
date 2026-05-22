const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usersController');

router.get('/', ctrl.listUsers);
router.get('/search', ctrl.getUser);
router.post('/', ctrl.createUser);

module.exports = router;
