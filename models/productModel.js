const db = require('../config/db');

// Model untuk produk
const Product = {
  // Mendapatkan semua produk
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM products');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Mendapatkan produk berdasarkan ID
  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Membuat produk baru
  create: async (product) => {
    try {
      const { name, description, price, image_url, stock, unit } = product;
      const [result] = await db.query(
        'INSERT INTO products (name, description, price, image_url, stock, unit) VALUES (?, ?, ?, ?, ?, ?)',
        [name, description, price, image_url, stock, unit]
      );
      return { id: result.insertId, ...product };
    } catch (error) {
      throw error;
    }
  },

  // Mengupdate produk
  update: async (id, product) => {
    try {
      const { name, description, price, image_url, stock, unit } = product;
      await db.query(
        'UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, stock = ?, unit = ? WHERE id = ?',
        [name, description, price, image_url, stock, unit, id]
      );
      return { id, ...product };
    } catch (error) {
      throw error;
    }
  },

  // Menghapus produk
  delete: async (id) => {
    try {
      await db.query('DELETE FROM products WHERE id = ?', [id]);
      return { id };
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Product;