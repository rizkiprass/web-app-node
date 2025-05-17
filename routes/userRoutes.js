const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Routes untuk user
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);

module.exports = router;