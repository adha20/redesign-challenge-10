const { sendError } = require("../utils/responses");

/**
 * Global Error Handler
 *
 * Menangani seluruh error yang dilempar dari controller,
 * middleware, maupun validation agar response API selalu konsisten.
 */
const errorHandler = (err, req, res, next) => {
  // Tampilkan error di console untuk proses debugging
  //   console.error(err);
  console.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);

  // Ambil status code, default 500 jika tidak tersedia
  const statusCode = err.statusCode || 500;

  // Ambil pesan error, default jika tidak ada
  const message = err.message || "Internal Server Error";

  // Ambil detail error (misalnya hasil validasi Joi)
  const details = err.details;

  // Kirim response error yang konsisten
  return sendError(res, statusCode, message, details);
};

module.exports = errorHandler;
