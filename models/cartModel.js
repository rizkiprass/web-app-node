const db = require('../config/db');

// Model untuk keranjang belanja
const Cart = {
  // Mendapatkan semua item di keranjang berdasarkan user_id
  getByUserId: async (userId) => {
    try {
      console.log('DB query: Getting cart items for user:', userId);
      const [rows] = await db.query(`
        SELECT c.id, c.user_id, c.product_id, c.quantity, p.name, p.price, p.image_url
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?
      `, [userId]);
      console.log('DB result: Found', rows.length, 'cart items');
      return rows;
    } catch (error) {
      console.error('DB error in getByUserId:', error);
      throw error;
    }
  },

  // Menambahkan item ke keranjang
  addItem: async (userId, productId, quantity) => {
    try {
      console.log('DB query: Checking if item exists in cart');
      // Cek apakah item sudah ada di keranjang
      const [existing] = await db.query(
        'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      console.log('DB result: Item exists?', existing.length > 0);

      if (existing.length > 0) {
        // Update quantity jika item sudah ada
        const newQuantity = existing[0].quantity + quantity;
        console.log('DB query: Updating quantity to', newQuantity);
        await db.query(
          'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
          [newQuantity, userId, productId]
        );
        return { id: existing[0].id, user_id: userId, product_id: productId, quantity: newQuantity };
      } else {
        // Tambahkan item baru jika belum ada
        console.log('DB query: Inserting new cart item');
        const [result] = await db.query(
          'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
          [userId, productId, quantity]
        );
        console.log('DB result: New item inserted with ID', result.insertId);
        return { id: result.insertId, user_id: userId, product_id: productId, quantity };
      }
    } catch (error) {
      console.error('DB error in addItem:', error);
      throw error;
    }
  },

  // Update quantity item di keranjang
  updateQuantity: async (userId, productId, quantity) => {
    try {
      console.log('DB query: Updating cart item quantity');
      await db.query(
        'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
        [quantity, userId, productId]
      );
      console.log('DB result: Cart item updated');
      return { user_id: userId, product_id: productId, quantity };
    } catch (error) {
      console.error('DB error in updateQuantity:', error);
      throw error;
    }
  },

  // Menghapus item dari keranjang
  removeItem: async (userId, productId) => {
    try {
      console.log('DB query: Removing item from cart');
      await db.query(
        'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      console.log('DB result: Item removed from cart');
      return { user_id: userId, product_id: productId };
    } catch (error) {
      console.error('DB error in removeItem:', error);
      throw error;
    }
  },

  // Mengosongkan keranjang
  clearCart: async (userId) => {
    try {
      console.log('DB query: Clearing cart for user', userId);
      await db.query('DELETE FROM cart WHERE user_id = ?', [userId]);
      console.log('DB result: Cart cleared');
      return { user_id: userId };
    } catch (error) {
      console.error('DB error in clearCart:', error);
      throw error;
    }
  }
};

module.exports = Cart;