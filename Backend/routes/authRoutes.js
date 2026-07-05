const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRequest } = require('../utils/validation');

// Rute untuk pendaftaran (Register) dengan validasi
router.post('/register', validateRequest('registerUser'), authController.register);

// Rute untuk masuk (Login) dengan validasi
router.post('/login', validateRequest('loginUser'), authController.login);

module.exports = router;
