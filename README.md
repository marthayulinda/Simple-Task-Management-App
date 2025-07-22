
# 📝 Simple Task Management App

Aplikasi manajemen tugas sederhana berbasis **Frontend Next.js** dan **Backend Golang**.

## 📁 Struktur Folder

```
Simple-Task-Management-App/
├── simple-task-management-frontend/   # Next.js frontend
└── simple-task-management-backend/    # Golang backend
```

---

## 🚀 Cara Menjalankan Proyek

### 1. Clone Repository

```bash
git clone https://github.com/marthayulinda/Simple-Task-Management-App.git
cd Simple-Task-Management-App
```

---

### 2. Menjalankan Backend (Golang)

> Pastikan telah menginstall Go (https://golang.org/dl/) dan PostgreSQL

```bash
cd simple-task-management-backend

# (Opsional jika belum ada)
go mod init simple-task-management-backend

# Jalankan server
go run .
```

📍 Aplikasi backend akan berjalan di: `http://localhost:8080`

---

### 3. Setup Database PostgreSQL

1. Buat database bernama `simpletask_moonlay`

2. Jalankan SQL berikut untuk membuat tabel:

```sql
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
  deadline DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. Masukkan data dummy:

```sql
INSERT INTO users (name, email) VALUES
('Martha Tobing', 'martha@example.com'),
('Alex Pratama', 'alex@example.com'),
('Dina Silalahi', 'dina@example.com');
```

---

### 4. Menjalankan Frontend (Next.js)

> Pastikan telah menginstall Node.js & npm/yarn

```bash
cd ../simple-task-management-frontend

# Install dependensi
npm install
# atau
yarn install

# Jalankan aplikasi
npm run dev
# atau
yarn dev
```

🌐 Aplikasi frontend akan berjalan di: `http://localhost:3000`

---

### 5. Konfigurasi Koneksi Frontend ke Backend

Pastikan file konfigurasi API di frontend (`services/api.js` atau sejenisnya) menggunakan URL backend yang benar:

```js
const BASE_URL = "http://localhost:8080";
```

---

## 🛠 Fitur Utama

- ✅ Melihat daftar tugas
- ➕ Menambah tugas
- ✏️ Mengedit tugas
- ❌ Menghapus tugas
- 👥 Menampilkan daftar user sebagai assignee

---

## 📌 Teknologi yang Digunakan

- **Frontend**: [Next.js](https://nextjs.org/), Tailwind CSS
- **Backend**: [Go (Golang)](https://golang.org/), PostgreSQL, HTTP native
- **Database**: PostgreSQL

---

## 👩‍💻 Author

**Martha Yulinda Tobing**  
📧 [LinkedIn](https://www.linkedin.com/in/marthayulinda)

---
