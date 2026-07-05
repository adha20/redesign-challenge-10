# IGRS Backend Redesign (GDG 2026 Challenge)

Repositori ini memuat *source code* lapisan peladen (*Backend*) untuk proyek **Indonesia Game Rating System (IGRS)**. *Backend* ini berfungsi sebagai sistem *Central Data Provider* (Penyedia Data Pusat) bagi aplikasi antarmuka (*Frontend*) menggunakan arsitektur *RESTful API*.

## Tech Stack
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MySQL (relational database)
- **Otentikasi:** JWT (JSON Web Token) & bcrypt
- **Modul Tambahan:** `cors`, `mysql2`, `joi`

---

## Struktur Arsitektur (MVC Pattern)
Aplikasi ini diimplementasikan menggunakan pola arsitektur **Model-View-Controller (MVC)** yang dimodifikasi khusus untuk perancangan API (menggantikan *Model* dengan modul *Queries* abstrak):

```text
Backend/
├── controllers/       # Menangani logika permintaan HTTP (HTTP Request Logic)
│   ├── authController.js
│   ├── blogController.js
│   ├── gameController.js
│   └── metaController.js
├── database/          # Konfigurasi koneksi MySQL dan Seeding
│   ├── database.js
│   └── seed.js
├── queries/           # Abstraksi perintah SQL murni (Data Access Layer)
│   ├── blogQueries.js
│   ├── gameQueries.js
│   ├── metaQueries.js
│   └── userQueries.js
├── routes/            # Pemetaan endpoint (URL) ke Controller yang tepat
│   ├── authRoutes.js
│   ├── blogRoutes.js
│   ├── gameRoutes.js
│   └── metaRoutes.js
├── uploads/           # Direktori penyimpanan media (images) terpusat
├── main.js            # Entry point peladen (konfigurasi Express)
└── API_DOCUMENTATION.md # Referensi teknis struktur *Response* API
```

---

## Implementasi Fitur

### 1. Sistem *Database* Relasional Terpusat
Menggunakan MySQL dengan implementasi relasi (*One-to-Many* dan *Many-to-Many*) untuk memetakan arsitektur data gim yang kompleks:
- Relasi antara tabel `games` dengan `platforms` (Melalui `game_platforms`).
- Relasi tabel `games` dengan `genres` dan tangkapan layar galeri.
- Penggunaan skrip *Database Seeder* (`seed.js`) untuk inisialisasi awal skema tabel dan injeksi data awal tanpa intervensi manual.

### 2. Layanan API Inti (*Core Endpoints*)
Pengembangan modul *endpoints* untuk suplai data secara masif dan terstruktur:
- **`POST /api/auth/register` & `/api/auth/login`**: Otentikasi pengguna menggunakan enkripsi kata sandi (*bcrypt*) dan token JWT.
- **`GET /api/games`**: Mengembalikan daftar katalog gim beserta objek relasi detail (rating, publisher, platform).
- **`GET /api/games/:id`**: Pengambilan informasi spesifik suatu entitas gim tunggal.
- **`GET /api/blogs`**: Pengambilan daftar artikel terkait dari *database*.
- **`GET /api/meta/classifications` & `/api/meta/ratings`**: Menyediakan data metadata operasional (seperti deskripsi kategori usia dan standar rating).

### 3. Layanan Berkas Statis (*Static Asset Delivery*)
Penyediaan direktori `/uploads/` yang diekspos menggunakan fungsi statis Express (`express.static`). Fitur ini menjadikan Backend sebagai satu-satunya *Source of Truth* bagi aset visual Frontend (foto profil, sampul gim, ikon klasifikasi), mengeliminasi duplikasi fail pada sisi antarmuka.

---

## Panduan Instalasi & Eksekusi

1. **Konfigurasi Variabel Lingkungan**:
   Buat file `.env` pada *root* direktori `Backend` dan sesuaikan kredensial MySQL lokal Anda:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=redesign2_igrs
   PORT=5000
   JWT_SECRET=rahasia_super_aman_123
   ```
2. **Instalasi Modul**:
   Buka terminal di direktori `Backend` lalu eksekusi:
   ```bash
   npm install
   ```
3. **Inisialisasi Database (Wajib)**:
   Jalankan seeder untuk membuat tabel dan memasukkan data:
   ```bash
   node database/seed.js
   ```
4. **Menjalankan Peladen**:
   ```bash
   npm run dev
   ```
   *Server akan berjalan di `http://localhost:5000` dan siap melayani lalu lintas HTTP.*
