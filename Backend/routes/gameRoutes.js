const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const gameController = require('../controllers/gameController');

// Konfigurasi Multer untuk menyimpan file ke folder 'uploads/'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Routes
router.get('/', gameController.getGames);

// Endpoint POST menggunakan middleware upload.single('gameFile')
// Pastikan form-data di frontend menggunakan nama field 'gameFile'
router.post('/register', upload.single('gameFile'), gameController.registerGame);

module.exports = router;
