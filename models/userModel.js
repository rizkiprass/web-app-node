const db = require('../config/db');

// Model untuk user
const User = {
  // Mendapatkan user berdasarkan ID
  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT id, username, email FROM users WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Membuat user baru
  create: async (user) => {
    try {
      const { username, email, password } = user;
      const [result] = await db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password]
      );
      return { id: result.insertId, username, email };
    } catch (error) {
      throw error;
    }
  }
};

module.exports = User;