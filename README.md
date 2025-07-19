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

> Pastikan telah menginstall Go (https://golang.org/dl/)

```bash
cd simple-task-management-backend

# (Opsional jika belum ada)
go mod init simple-task-management-backend

# Jalankan server
go run .
```

📍 Aplikasi backend akan berjalan di: `http://localhost:8080`

---

### 3. Menjalankan Frontend (Next.js)

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

### 4. Konfigurasi Koneksi Frontend ke Backend

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

---

## 📌 Teknologi yang Digunakan

- **Frontend**: [Next.js](https://nextjs.org/), Tailwind CSS (opsional)
- **Backend**: [Go (Golang)](https://golang.org/), HTTP native
- **Penyimpanan sementara**: In-memory array (bisa ditingkatkan ke database seperti PostgreSQL/MySQL)

---

## 👩‍💻 Author

**Martha Yulinda Tobing**  
📧 [LinkedIn](https://www.linkedin.com/in/marthayulinda)

---
