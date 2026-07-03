const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Sangat penting agar React (port 5173) bisa berkomunikasi dengan Express (port 3000)
app.use(express.json()); // Agar bisa membaca body request format JSON
app.use(express.urlencoded({ extended: true })); // Agar bisa membaca form-data
app.use('/uploads', express.static('uploads')); // Agar folder uploads bisa diakses publik (download file zip/gambar)

// Import Routes
const gameRoutes = require('./routes/gameRoutes');
const blogRoutes = require('./routes/blogRoutes');

// Daftarkan Routes
app.use('/api/games', gameRoutes);
app.use('/api/blogs', blogRoutes);

// Jalankan Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
