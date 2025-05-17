const Cart = require('../models/cartModel');

// Controller untuk keranjang belanja
const CartController = {
  // Mendapatkan keranjang berdasarkan user_id
  getCart: async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log('Getting cart for user:', userId);
      const cartItems = await Cart.getByUserId(userId);
      console.log('Cart items found:', cartItems);
      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error getting cart:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data keranjang', error: error.message });
    }
  },

  // Menambahkan item ke keranjang
  addToCart: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
      console.log('Adding to cart:', { userId, productId, quantity });
      
      // Validasi input
      if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: 'userId, productId, dan quantity wajib diisi' });
      }
      
      const cartItem = await Cart.addItem(userId, productId, quantity);
      console.log('Item added to cart:', cartItem);
      res.status(201).json(cartItem);
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan item ke keranjang', error: error.message });
    }
  },

  // Update quantity item di keranjang
  updateCartItem: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
      console.log('Updating cart item:', { userId, productId, quantity });
      
      // Validasi input
      if (!userId || !productId || quantity === undefined) {
        return res.status(400).json({ message: 'userId, productId, dan quantity wajib diisi' });
      }
      
      const cartItem = await Cart.updateQuantity(userId, productId, quantity);
      console.log('Cart item updated:', cartItem);
      res.status(200).json(cartItem);
    } catch (error) {
      console.error('Error updating cart item:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate item keranjang', error: error.message });
    }
  },

  // Menghapus item dari keranjang
  removeFromCart: async (req, res) => {
    try {
      const { userId, productId } = req.params;
      console.log('Removing from cart:', { userId, productId });
      
      // Validasi input
      if (!userId || !productId) {
        return res.status(400).json({ message: 'userId dan productId wajib diisi' });
      }
      
      await Cart.removeItem(userId, productId);
      console.log('Item removed from cart');
      res.status(200).json({ message: 'Item berhasil dihapus dari keranjang' });
    } catch (error) {
      console.error('Error removing from cart:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat menghapus item dari keranjang', error: error.message });
    }
  },

  // Mengosongkan keranjang
  clearCart: async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log('Clearing cart for user:', userId);
      
      // Validasi input
      if (!userId) {
        return res.status(400).json({ message: 'userId wajib diisi' });
      }
      
      await Cart.clearCart(userId);
      console.log('Cart cleared');
      res.status(200).json({ message: 'Keranjang berhasil dikosongkan' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mengosongkan keranjang', error: error.message });
    }
  }
};

module.exports = CartController;