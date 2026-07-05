# Indonesia Game Rating System (IGRS) - Fullstack Redesign

Repositori ini memuat solusi *Full-Stack* lengkap (Frontend dan Backend) untuk tantangan perancangan ulang UI/UX (Redesign Challenge) **Indonesia Game Rating System (IGRS)** pada ajang GDG 2026. 

Proyek ini dibangun tidak hanya berfokus pada keindahan antarmuka yang *pixel-perfect* dengan desain Figma, melainkan juga mengutamakan arsitektur sistem berskala produksi (*production-ready*) dengan integrasi *database* relasional.

---

## 🏗️ Struktur Proyek (Monorepo)

Proyek ini dipecah menjadi dua direktori utama yang beroperasi secara independen namun saling terhubung melalui REST API:

1. **[`/Frontend`](./Frontend/)**
   - Berisi antarmuka pengguna interaktif (Client-side).
   - **Teknologi:** React.js, Vite, Tailwind CSS (v4), React Router.
   - *Untuk detail lebih lanjut, baca [Dokumentasi Frontend](./Frontend/README.md).*

2. **[`/Backend`](./Backend/)**
   - Berisi peladen API dan layanan penyedia data terpusat (Server-side).
   - **Teknologi:** Node.js, Express.js, MySQL.
   - *Untuk detail lebih lanjut, baca [Dokumentasi Backend](./Backend/README.md).*

---

## ✨ Sorotan Pencapaian Teknis (Key Highlights)

- **Akurasi UI/UX Tinggi:** Mengimplementasikan desain secara presisi, mencakup efek gradien, tata letak responsif, *custom shadow*, hingga proporsi ukuran visual (*Pixel Perfect*).
- **Integrasi Full-Stack (Tanpa Data Dummy):** Seluruh informasi (daftar gim, penerbit, metadata) ditarik dinamis dari MySQL.
- **Sistem Keamanan:** Terintegrasi dengan sistem otentikasi menggunakan JSON Web Token (JWT) dan enkripsi sandi (*bcrypt*).
- **Arsitektur Modular:** 
  - *Frontend* menerapkan *Atomic Design* dengan memisahkan komponen *reusable* (`UI Components`) dan mendelegasikan fungsionalitas kompleks ke *Custom Hooks*.
  - *Backend* menerapkan pola *MVC (Model-View-Controller)* dengan lapisan akses data terabstraksi (`Queries`).
- **Sentralisasi Aset:** *Backend* bertindak sebagai penyedia aset statis tunggal (SSOT - *Single Source of Truth*), meminimalisir duplikasi memori gambar di *Frontend*.

---

## 🚀 Panduan Memulai Cepat (*Quick Start*)

Untuk menjalankan ekosistem aplikasi ini di lingkungan lokal Anda, Anda harus menjalankan *Backend* terlebih dahulu agar aplikasi *Frontend* memiliki suplai data API dan gambar.

### 1. Menjalankan Backend (Server)
Buka terminal baru:
```bash
cd Backend
npm install

# ⚠️ PENTING: Pastikan layanan database MySQL Anda sudah menyala! 
# (Silakan hidupkan modul MySQL melalui XAMPP, Laragon, atau Docker terlebih dahulu).

# Konfigurasi file .env Anda (Lihat Panduan di Backend/README.md)
# Jalankan Seeder untuk membuat tabel dan data awal
node database/seed.js

# Hidupkan server
npm run dev
```
*Backend akan berjalan di `http://localhost:5000`.*

### 2. Menjalankan Frontend (Client)
Buka terminal baru lainnya:
```bash
cd Frontend
npm install

# Hidupkan antarmuka
npm run dev
```
*Buka tautan lokal yang tertera (misal: `http://localhost:5173`) di peramban Anda.*

---

**Hak Cipta © 2026.** Dikembangkan untuk keperluan tantangan GDG.