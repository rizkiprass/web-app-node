-- Hapus foreign key constraint sementara
ALTER TABLE cart DROP FOREIGN KEY cart_ibfk_1;

-- Tambahkan user dengan ID 1
INSERT INTO users (id, username, email, password) VALUES 
(1, 'user1', 'user1@example.com', 'password123')
ON DUPLICATE KEY UPDATE username=username;

-- Tambahkan kembali foreign key constraint
ALTER TABLE cart ADD CONSTRAINT cart_ibfk_1 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;