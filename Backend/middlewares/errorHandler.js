/**
 * Middleware Penanganan Error Global (Global Error Handler)
 * Berfungsi untuk menangkap semua error dari aplikasi dan mengirimkan format response yang seragam/konsisten.
 */

const errorHandler = (err, req, res, next) => {
  // Catat error di console server (sangat berguna untuk proses debugging)
  console.error("[ERROR]", err.message, err.stack);

  // Ambil status code dari error, jika tidak ada gunakan default 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;

  // Ambil pesan error, jika kosong berikan pesan default
  const message = err.message || "Internal Server Error";

  // Cek apakah aplikasi sedang berjalan di mode production (live)
  const isProduction = process.env.NODE_ENV === "production";

  // Kirim response error ke client (frontend/user) dalam bentuk JSON
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    // Jika di mode production, tambahkan waktu (timestamp) kapan error terjadi
    ...(isProduction && { timestamp: new Date().toISOString() }),
    // Jika ada detail tambahan terkait error, ikut sertakan dalam response
    ...(err.details && { details: err.details }),
  });
};

module.exports = errorHandler;
