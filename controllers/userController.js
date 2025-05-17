const User = require('../models/userModel');

// Controller untuk user
const UserController = {
  // Mendapatkan user berdasarkan ID
  getUserById: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.getById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User tidak ditemukan' });
      }
      
      res.status(200).json(user);
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data user' });
    }
  },

  // Membuat user baru
  createUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
      // Validasi input
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, dan password wajib diisi' });
      }
      
      const newUser = await User.create({
        username,
        email,
        password: password // Dalam produksi, password harus di-hash
      });
      
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat membuat user baru' });
    }
  }
};

module.exports = UserController;