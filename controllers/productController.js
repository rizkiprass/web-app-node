const Product = require('../models/productModel');

// Controller untuk produk
const ProductController = {
  // Mendapatkan semua produk
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.getAll();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error getting products:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data produk' });
    }
  },

  // Mendapatkan produk berdasarkan ID
  getProductById: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Product.getById(id);
      
      if (!product) {
        return res.status(404).json({ message: 'Produk tidak ditemukan' });
      }
      
      res.status(200).json(product);
    } catch (error) {
      console.error('Error getting product by ID:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data produk' });
    }
  },

  // Membuat produk baru
  createProduct: async (req, res) => {
    try {
      const { name, description, price, image_url, stock, unit } = req.body;
      
      // Validasi input
      if (!name || !price) {
        return res.status(400).json({ message: 'Nama dan harga produk wajib diisi' });
      }
      
      const newProduct = await Product.create({
        name,
        description: description || '',
        price,
        image_url: image_url || 'https://via.placeholder.com/150?text=' + name,
        stock: stock || 0,
        unit: unit || 'pcs'
      });
      
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat membuat produk baru' });
    }
  },

  // Mengupdate produk
  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, description, price, image_url, stock, unit } = req.body;
      
      // Cek apakah produk ada
      const existingProduct = await Product.getById(id);
      if (!existingProduct) {
        return res.status(404).json({ message: 'Produk tidak ditemukan' });
      }
      
      // Update produk
      const updatedProduct = await Product.update(id, {
        name: name || existingProduct.name,
        description: description || existingProduct.description,
        price: price || existingProduct.price,
        image_url: image_url || existingProduct.image_url,
        stock: stock !== undefined ? stock : existingProduct.stock,
        unit: unit || existingProduct.unit
      });
      
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate produk' });
    }
  },

  // Menghapus produk
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      
      // Cek apakah produk ada
      const existingProduct = await Product.getById(id);
      if (!existingProduct) {
        return res.status(404).json({ message: 'Produk tidak ditemukan' });
      }
      
      await Product.delete(id);
      res.status(200).json({ message: 'Produk berhasil dihapus' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat menghapus produk' });
    }
  }
};

module.exports = ProductController;