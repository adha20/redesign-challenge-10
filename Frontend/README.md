# IGRS Frontend Redesign (GDG 2026 Challenge)

Repositori ini berisi implementasi *Front-End* untuk proyek perancangan ulang antarmuka (UI/UX Redesign) **Indonesia Game Rating System (IGRS)**. Proyek ini difokuskan pada kebersihan struktur kode, akurasi dengan desain Figma, modularitas komponen, serta implementasi *best practices*.

## Tech Stack
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS (v4)
- **Routing:** React Router v6
- **Data Fetching:** Fetch API (Native)

---

## Implementasi Fitur

### 1. Integrasi API Backend
Proyek ini terintegrasi penuh dengan REST API *Backend* (Node.js/Express + MySQL). Tidak menggunakan *hardcoded JSON* atau data statis. Semua data diambil secara dinamis, meliputi:
- **Game Data:** Pengambilan daftar gim, detail gim, platform, dan genre.
- **Meta Data:** Pengambilan klasifikasi konten dan daftar rating usia.
- **Media:** Render aset visual (cover, galeri gim, ikon) yang disediakan langsung dari direktori terpusat di server backend.

### 2. Fitur Halaman Utama
- **Beranda (Home):** Implementasi UI interaktif untuk section Hero, KPI, Daftar Rating, Slider Klasifikasi Konten, dan Artikel Blog.
- **Pencarian (Search):** Sistem filter multi-kriteria (Teks, Rating, Genre, Platform) secara asinkron dengan sinkronisasi parameter URL (`useSearchParams`).
- **Detail Gim:** Pembuatan *Image Gallery Slider* dinamis berdasarkan data spesifik gim yang dipilih.
- **Lainnya:** Implementasi fitur Otentikasi (*Login* & *Register*) yang terhubung langsung ke API Backend.

### 3. Struktur Kode & Modularitas
Implementasi didasarkan pada pendekatan *Atomic Design* untuk menghindari pengulangan (DRY) dan meningkatkan skalabilitas kode:
- **UI Components:** Mengekstrak elemen visual berulang menjadi komponen independen (`SectionHeader`, `SliderNavButton`, `ClassificationCard`).
- **Custom Hooks:** Memisahkan logika fungsional kompleks (seperti kalkulasi ukuran dan interval animasi pada *slider* tak terbatas) ke dalam *custom hook* (`useInfiniteSlider`).
- **Tailwind Utilities:** Optimalisasi *class* yang berulang (misal: efek *text-gradient*) ke dalam utilitas khusus di `index.css`.

---

## Struktur Direktori
```text
Frontend/
├── public/                 # Aset statis yang tidak diproses (favicon, dll)
├── src/
│   ├── assets/             # Aset UI lokal (logo, background statis)
│   ├── components/         # Komponen UI utama aplikasi
│   │   ├── about/          
│   │   ├── auth/           
│   │   ├── home/           
│   │   ├── recommendation/ 
│   │   ├── register/       
│   │   ├── search/         
│   │   └── ui/             # Reusable UI components
│   ├── hooks/              # Reusable custom hooks
│   ├── App.jsx             # Konfigurasi rute aplikasi (React Router)
│   └── index.css           # Global styling & Tailwind utilities
└── package.json            # Konfigurasi dependensi
```

---

## Panduan Instalasi & Menjalankan Aplikasi

1. Pindah ke direktori `Frontend`:
   ```bash
   cd Frontend
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. **Konfigurasi Lingkungan:** Salin *file* `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
4. *Pastikan server Backend IGRS sudah berjalan di port yang sesuai agar fitur fetch data API dan load gambar dapat berfungsi normal.*
5. Mulai server pengembangan (*development server*):
   ```bash
   npm run dev
   ```
5. Buka `http://localhost:5173` pada peramban Anda.
