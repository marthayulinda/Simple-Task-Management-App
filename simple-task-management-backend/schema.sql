-- schema.sql

--Jalankan file schema.sql untuk membuat tabel dan data dummy ke PostgreSQL sebelum menjalankan backend Golang.--

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  assignee_id INT REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dummy data
INSERT INTO users (name, email) VALUES 
('Martha Tobing', 'martha@example.com'),
('Alex Pratama', 'alex@example.com'),
('Dina Silalahi', 'dina@example.com');