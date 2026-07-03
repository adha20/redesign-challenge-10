# Dokumentasi API & Arsitektur Backend IGRS

Dokumen ini ditujukan untuk menjelaskan arsitektur sistem, struktur kode, dan spesifikasi REST API yang dibangun untuk platform IGRS (Indonesia Game Rating System) versi *Redesign*. 

Dokumentasi ini disusun secara khusus untuk memenuhi 4 Kriteria Penilaian utama:
1. **Struktur Kode** (Modularitas & Kebersihan)
2. **Kesesuaian Spesifikasi API** (Fungsionalitas)
3. **Penggunaan Arsitektur** (REST & MVC)
4. **Dokumentasi** (Kelengkapan Penjelasan)

---

## 🏗️ 1. Pemilihan Arsitektur (REST & MVC)

Backend ini dibangun menggunakan **Node.js** dan **Express.js** dengan menerapkan arsitektur hybrid yang sangat populer di industri modern: **Headless REST API dengan struktur MVC (Model-View-Controller)**.

*   **REST (Representational State Transfer):** Komunikasi antara Backend dan Frontend murni menggunakan REST. Backend tidak melakukan *rendering* UI (HTML), melainkan hanya mengembalikan respons berupa format data **JSON**. Hal ini memastikan Backend sangat ringan dan skalabel.
*   **MVC (Model-View-Controller):** Walaupun berformat REST, struktur internal *source code* Backend diatur menggunakan prinsip MVC agar sangat bersih (clean code) dan modular:
    *   **Model (`/queries` & `/database`)**: Bertanggung jawab murni untuk berinteraksi dengan MySQL, mengeksekusi *query*, dan melakukan *Data Definition Language* (migrasi otomatis).
    *   **Controller (`/controllers`)**: Menerima HTTP *request*, memvalidasi *input*, memanggil Model, dan merakit respons HTTP (status code & JSON).
    *   **View (Frontend React)**: View sepenuhnya dipisahkan (decoupled) ke aplikasi Frontend (React/Vite).
    *   **Router (`/routes`)**: Memisahkan definisi *endpoint* (URL) dari logika bisnis, sehingga *file* utama `main.js` tetap bersih.

---

## 📂 2. Struktur Kode (Modularitas & Kebersihan)

Kode dipecah menjadi beberapa modul spesifik (Separation of Concerns) untuk memastikan tingkat keterbacaan (readability) yang tinggi:

```text
Backend/
├── main.js                  # Entry point aplikasi & konfigurasi Express
├── .env                     # File konfigurasi variabel lingkungan (Port, DB Credentials)
├── database/
│   ├── database.js          # Koneksi MySQL & Auto-Migration (Otomatis membuat 9 tabel)
│   └── seed.js              # Seeder otomatis untuk mengisi data master (Ratings, Genres, dll)
├── routes/
│   └── gameRoutes.js        # Definisi semua rute/endpoint (GET, POST) khusus Entitas Gim
├── controllers/
│   └── gameController.js    # Logika penanganan Request/Response dari rute gim
├── queries/
│   └── gameQueries.js       # Repositori fungsi SQL kompleks (contoh: JOIN 6 tabel)
└── uploads/                 # Direktori statis untuk menyimpan aset gambar & file lokal
```

---

## 🔌 3. Spesifikasi API (REST Endpoints)

Base URL: `http://localhost:5000/api`

### A. Mengambil Daftar Gim Lengkap (Get All Games)
Endpoint ini didesain khusus untuk memenuhi kebutuhan fungsional halaman Beranda/Katalog (menampilkan detail gim beserta rating dan klasifikasi). Query SQL-nya menggunakan `JSON_ARRAYAGG` dan `JOIN` kompleks untuk menggabungkan 6 tabel relasional (games, ratings, platforms, genres, content_descriptors, dsb) secara efisien dalam 1 pemanggilan.

- **URL:** `/games`
- **Method:** `GET`
- **Headers:** *(None)*
- **Response Success (200 OK):**
```json
{
  "message": "Berhasil mengambil data gim",
  "data": [
    {
      "id": 1,
      "title": "Genshin Impact",
      "publisher": "HoYoverse",
      "description": [
        "Genshin Impact merupakan gim open world action RPG..."
      ],
      "rating": {
        "id": 4,
        "name": "15+",
        "icon_url": "http://localhost:5000/uploads/assets/rating-15.png"
      },
      "classifications": [
        { "id": 1, "name": "Interaksi Daring", "icon_url": "..." },
        { "id": 2, "name": "Kekerasan", "icon_url": "..." }
      ],
      "genres": [
        { "id": 1, "name": "Petualangan" },
        { "id": 3, "name": "RPG" }
      ],
      "platforms": [
        { "id": 1, "name": "Windows", "icon_url": "..." }
      ]
    }
  ]
}
```

### B. Mendaftarkan Gim Baru (Register Game)
Endpoint ini digunakan untuk halaman "Daftarkan Gim". Menerima data *multipart/form-data* untuk menangani *upload* dokumen.

- **URL:** `/games/register`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **Body / Payload:**
  - `title` (String, Required): Judul gim.
  - `rating` (String): ID atau nama rating.
  - `platform` (String): ID atau nama platform.
  - `gameFile` (File): Dokumen persyaratan (PDF/DOCX) atau Cover image.
- **Response Success (201 Created):**
```json
{
  "message": "Gim berhasil didaftarkan!",
  "data": {
    "id": 5,
    "title": "Judul Gim Keren",
    "rating": "15+",
    "platform": "Windows",
    "file_path": "uploads\\1723456789012-987654321.zip"
  }
}
```

**Respons Error - Validasi Gagal (400 Bad Request):**
*Terjadi jika `title` dikosongkan.*
```json
{
  "message": "Judul gim wajib diisi!"
}
```

**Respons Error - Kegagalan Database (500 Internal Server Error):**
```json
{
  "message": "Gagal mendaftarkan gim"
}
```

---

## Catatan Penting Terkait Skema Relasional
Saat ini struktur API di atas (khususnya *controller* `gameController.js`) masih menggunakan pendekatan *dummy/denormalized*. Mengingat kita baru saja meng-upgrade `database.js` menjadi skema **Relasional Penuh (9 Tabel)**, nantinya format body saat mendaftarkan gim (`POST`) akan membutuhkan modifikasi lebih lanjut untuk menangani Array dari genre, platform, dan klasifikasi.
