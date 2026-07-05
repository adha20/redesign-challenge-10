const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendSuccess, createError } = require('../utils/responses');
const userQueries = require('../queries/userQueries');

// Kunci rahasia JWT (biasanya disimpan di .env, kita beri default jika belum ada)
const JWT_SECRET = process.env.JWT_SECRET || 'igrs_super_secret_key_2026';

const register = async (req, res, next) => {
  try {
    const { name, email, company, country, password } = req.body;

    // Cek apakah email sudah terdaftar
    const existingUser = await userQueries.findUserByEmail(email);
    if (existingUser) {
      throw createError('Email sudah terdaftar. Silakan gunakan email lain.', 400);
    }

    // Hash kata sandi
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan ke database
    const newUserId = await userQueries.createUser(name, email, company, country, hashedPassword);

    return sendSuccess(res, 201, 'Registrasi berhasil. Silakan login.', {
      userId: newUserId
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Cari user berdasarkan email
    const user = await userQueries.findUserByEmail(email);
    if (!user) {
      throw createError('Email atau kata sandi salah.', 401);
    }

    // Bandingkan kata sandi
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createError('Email atau kata sandi salah.', 401);
    }

    // Buat token JWT
    const payload = {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    // Hapus password dari object user sebelum dikirim ke client
    delete user.password;

    return sendSuccess(res, 200, 'Login berhasil.', {
      token,
      user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login
};
