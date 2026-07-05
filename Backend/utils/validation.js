/**
 * Kumpulan Fungsi Validasi & Pembersihan (Sanitization) Input
 * Menggunakan library Joi untuk memvalidasi struktur atau skema data yang masuk.
 */

const Joi = require("joi");

// Daftar skema validasi untuk berbagai keperluan
const schemas = {
  // Skema untuk registrasi user
  registerUser: Joi.object({
    name: Joi.string().trim().required().max(255).messages({
      "string.required": "Nama lengkap wajib diisi",
    }),
    email: Joi.string().trim().email().required().max(255).messages({
      "string.required": "Email wajib diisi",
      "string.email": "Format email tidak valid",
    }),
    company: Joi.string().trim().allow("").max(255),
    country: Joi.string().trim().allow("").max(255),
    password: Joi.string().required().min(6).messages({
      "string.required": "Kata sandi wajib diisi",
      "string.min": "Kata sandi minimal 6 karakter",
    })
  }),

  // Skema untuk login user
  loginUser: Joi.object({
    email: Joi.string().trim().email().required().messages({
      "string.required": "Email wajib diisi",
      "string.email": "Format email tidak valid",
    }),
    password: Joi.string().required().messages({
      "string.required": "Kata sandi wajib diisi",
    })
  }),

  // Skema untuk mendaftarkan game baru
  registerGame: Joi.object({
    title: Joi.string().trim().required().max(255).messages({
      "string.required": "Judul game wajib diisi",
      "string.max": "Judul game maksimal 255 karakter",
    }),
    developer: Joi.string().trim().required().max(255).messages({
      "string.required": "Nama developer wajib diisi",
    }),
    description: Joi.string().trim().allow("").max(1000), // Boleh kosong, maksimal 1000 karakter
    releaseDate: Joi.date().required().messages({
      "date.required": "Tanggal rilis wajib diisi",
    }),
    genres: Joi.array()
      .items(Joi.number().integer().positive())
      .required()
      .messages({
        "array.required": "Minimal harus pilih satu genre",
      }),
    platforms: Joi.array()
      .items(Joi.number().integer().positive())
      .required()
      .messages({
        "array.required": "Minimal harus pilih satu platform",
      }),
    contentDescriptors: Joi.array().items(Joi.number().integer().positive()),
    rating: Joi.number().integer().min(1).max(5), // Rating skala 1 sampai 5
  }),

  // Skema untuk membuat artikel/blog baru
  createBlog: Joi.object({
    title: Joi.string().trim().required().max(255).messages({
      "string.required": "Judul blog wajib diisi",
    }),
    content: Joi.string().trim().required().min(10).messages({
      "string.required": "Konten blog wajib diisi",
      "string.min": "Konten minimal harus 10 karakter",
    }),
    author: Joi.string().trim().required().max(255),
    category: Joi.string().trim().required(),
  }),

  // Skema untuk update artikel/blog
  updateBlog: Joi.object({
    title: Joi.string().trim().max(255),
    content: Joi.string().trim().min(10),
    author: Joi.string().trim().max(255),
    category: Joi.string().trim(),
  }).min(1), // Minimal harus ada 1 field yang dikirim untuk di-update

  // Skema untuk membuat data meta
  createMeta: Joi.object({
    metaKey: Joi.string().trim().required().max(100),
    metaValue: Joi.string().trim().required(),
  }),
};

/**
 * Fungsi inti untuk mencocokkan data request dengan skema Joi
 * @param {Object} data - Data mentah yang mau divalidasi
 * @param {string} schemaName - Nama skema dari daftar `schemas` di atas
 * @returns {Object} Mengembalikan objek berisi { value, error }
 */
const validate = (data, schemaName) => {
  // Cek apakah nama skema yang diminta ada di daftar
  if (!schemas[schemaName]) {
    throw new Error(`Skema validasi "${schemaName}" tidak ditemukan`);
  }

  return schemas[schemaName].validate(data, {
    abortEarly: false, // Jangan berhenti di error pertama, kumpulkan semua error-nya
    stripUnknown: true, // Buang data siluman/tambahan yang tidak ada di dalam aturan skema
  });
};

/**
 * Middleware Express untuk memvalidasi body request sebelum masuk ke controller
 * @param {string} schemaName - Nama skema yang mau dipakai untuk validasi
 * @returns {Function} Fungsi middleware
 */
const validateRequest = (schemaName) => {
  return (req, res, next) => {
    // Validasi data dari req.body
    const { error, value } = validate(req.body, schemaName);

    // Kalau ada data yang tidak sesuai standar (error)
    if (error) {
      // Format ulang pesan error dari Joi biar lebih rapi dan mudah dibaca frontend
      const details = error.details.map((detail) => ({
        field: detail.path.join("."), // Nama field yang bermasalah
        message: detail.message, // Pesan kesalahannya
      }));

      // Bikin objek error custom untuk dilempar ke Global Error Handler
      const customError = new Error("Validasi gagal");
      customError.statusCode = 400; // 400 Bad Request
      customError.details = details;

      return next(customError); // Lempar error ke middleware selanjutnya
    }

    // Kalau sukses, simpan data yang sudah bersih & tervalidasi ke dalam request object
    // Ingat: Controller nantinya harus pakai `req.validatedData`, jangan `req.body` lagi
    req.validatedData = value;
    next(); // Lanjut ke controller
  };
};

/**
 * Fungsi untuk membersihkan (sanitize) input berupa teks/string
 * Berguna untuk mencegah serangan XSS dasar
 * @param {string} input - Teks yang mau dibersihkan
 * @returns {string} Teks yang sudah bersih
 */
const sanitizeString = (input) => {
  if (typeof input !== "string") return input;
  // Hapus spasi berlebih di awal/akhir dan buang karakter tag HTML (< atau >)
  return input.trim().replace(/[<>]/g, "");
};

/**
 * Fungsi untuk membersihkan semua nilai string di dalam sebuah objek (misal: isi req.body)
 * @param {Object} obj - Objek yang mau dibersihkan
 * @returns {Object} Objek baru yang sudah bersih
 */
const sanitizeObject = (obj) => {
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    // Kalau nilainya string, bersihkan pakai sanitizeString
    if (typeof value === "string") {
      sanitized[key] = sanitizeString(value);
    } else {
      // Kalau tipe data lain (angka, boolean, array), biarkan saja
      sanitized[key] = value;
    }
  }
  return sanitized;
};

module.exports = {
  validate,
  validateRequest,
  sanitizeString,
  sanitizeObject,
  schemas,
};
