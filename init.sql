CREATE DATABASE IF NOT EXISTS cart_db;
USE cart_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample user data
INSERT INTO users (id, username, email, password) VALUES
(1, 'user1', 'user1@example.com', 'password123')
ON DUPLICATE KEY UPDATE username = username;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255),
  stock INT NOT NULL DEFAULT 0,
  unit VARCHAR(20) DEFAULT 'pcs',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Sample data produk elektronik
INSERT INTO products (name, description, price, image_url, stock, unit) VALUES
('Smartphone', 'Latest model smartphone with high-end features', 799.99, 'https://via.placeholder.com/150?text=Smartphone', 50, 'pcs'),
('Laptop', '15-inch laptop with SSD and 16GB RAM', 1299.99, 'https://via.placeholder.com/150?text=Laptop', 30, 'pcs'),
('Headphones', 'Wireless noise-cancelling headphones', 199.99, 'https://via.placeholder.com/150?text=Headphones', 100, 'pcs'),
('Smartwatch', 'Fitness tracking smartwatch with heart rate monitor', 249.99, 'https://via.placeholder.com/150?text=Smartwatch', 45, 'pcs'),
('Tablet', '10-inch tablet with HD display', 399.99, 'https://via.placeholder.com/150?text=Tablet', 60, 'pcs'),
('Bluetooth Speaker', 'Portable waterproof bluetooth speaker', 89.99, 'https://via.placeholder.com/150?text=Speaker', 75, 'pcs')
ON DUPLICATE KEY UPDATE name = VALUES(name);