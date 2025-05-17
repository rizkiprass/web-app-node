const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

// Routes untuk keranjang belanja
router.get('/:userId', CartController.getCart);
router.post('/add', CartController.addToCart);
router.put('/update', CartController.updateCartItem);
router.delete('/clear/:userId', CartController.clearCart);
router.delete('/:userId/:productId', CartController.removeFromCart);

module.exports = router;