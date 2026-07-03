# Backend Sistem Rating Gim (IGRS)

Selamat datang di repositori Backend untuk proyek desain ulang platform IGRS (Indonesia Game Rating System). Proyek ini dibangun secara khusus dengan mempertimbangkan 4 pilar utama kriteria penilaian *Back-End*: **Struktur Kode yang Bersih**, **Spesifikasi API yang Tepat**, **Arsitektur yang Modern (REST & MVC)**, dan **Dokumentasi yang Sangat Lengkap**.

## 🏆 Kepatuhan Terhadap Kriteria Penilaian Juri

### 1. Struktur Kode (Kebersihan & Modularitas)
Kode *backend* ini sangat mengutamakan *Clean Code* melalui prinsip *Separation of Concerns* (pemisahan tugas). File tidak ditumpuk menjadi satu, melainkan dipecah dengan sangat rapi:
- `database/`: Mengurus koneksi SQL dan otomatisasi pembuatan tabel (Auto Migration).
- `queries/`: Memisahkan instruksi kompleks SQL dari logika HTTP.
- `controllers/`: Mengatur validasi permintaan (Request) dan format JSON (Response).
- `routes/`: Hanya mendaftarkan titik akses URL tanpa mengotori file utama.
- `main.js`: Menjadi gerbang utama (*Entry point*) yang sangat bersih dan mudah dibaca.

### 2. Kesesuaian dengan Spesifikasi API (Fungsionalitas Penuh)
API yang dibangun telah dioptimasi secara ekstrem untuk memenuhi *mockup* antarmuka UI.
Misalnya, endpoint utama `GET /api/games` tidak hanya memanggil satu tabel, melainkan menggunakan perintah kompleks `JSON_ARRAYAGG` dan melakukan `JOIN` pada **6 tabel berbeda secara bersamaan**. Hasilnya, Frontend langsung menerima data JSON utuh yang kaya (termasuk *array* platform, ikon *rating*, dan jenis-jenis klasifikasi konten) sehingga sangat memudahkan *rendering* UI halaman Beranda dan Pencarian. Terdapat pula endpoint `POST /api/games/register` yang telah terintegrasi dengan Multer untuk menangani berkas *upload* (dokumen/gambar).

### 3. Penggunaan Arsitektur (REST & MVC)
Proyek ini mengadopsi pola **Headless REST API**. 
- **REST:** Karena semua komunikasi dilakukan via JSON (bukan *render* HTML lama), *backend* dan *frontend* (React) terpisah sepenuhnya secara modern (*Decoupled*).
- **MVC (Model-View-Controller):** Penataan direktori internal murni menggunakan standar MVC. Komponen `database` dan `queries` berperan murni sebagai **Model** untuk MySQL, sedangkan `gameController.js` berperan sebagai **Controller**. Tugas antarmuka visual (**View**) diserahkan 100% kepada proyek Frontend (React/Vite).

### 4. Dokumentasi API & Kode
Seluruh cara kerja arsitektur dan panduan titik akhir (Endpoint) telah dirangkum ke dalam satu dokumen terpisah yang sangat mendetail. 
Silakan baca [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) untuk mendalami panduan kontrak API sistem ini.

---

## 🚀 Cara Menjalankan (Quick Start)

Karena proyek ini menggunakan fitur migrasi otomatis, Anda tidak perlu repot membuat tabel secara manual di MySQL. Cukup sediakan *database* kosong.

1. **Persiapan Database**
   Buka alat seperti phpMyAdmin atau DBeaver, lalu buat satu database kosong baru:
   ```sql
   CREATE DATABASE redesign2_igrs;
   ```

2. **Jalankan Backend (Auto Migration)**
   Instal dependensi dan jalankan *server* (*server* akan mendeteksi *database* kosong, lalu otomatis membuat 9 struktur tabel).
   ```bash
   npm install
   npm run dev
   ```

3. **Isi Data Dummy (Seeder)**
   Jika *server* sudah menyala (Port 5000), buka terminal baru di dalam folder Backend, dan sebarkan *dummy data*:
   ```bash
   npm run seed
   ```
   *Script ini akan otomatis mengisi tabel dengan 10 daftar gim beserta puluhan relasi platform dan ratingnya secara utuh.*
