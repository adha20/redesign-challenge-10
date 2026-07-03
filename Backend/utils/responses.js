/**
 * Kumpulan Fungsi Bantuan (Utility) untuk Format Response yang Konsisten
 * Tujuannya agar semua balasan API (sukses maupun gagal) punya struktur yang seragam.
 */

/**
 * Mengirimkan response sukses (berhasil)
 * @param {Object} res - Objek response bawaan Express
 * @param {number} statusCode - Kode status HTTP (default: 200 OK)
 * @param {string} message - Pesan informasi (default: 'Success')
 * @param {*} data - Data (payload) yang ingin dikirimkan ke frontend (opsional)
 */
const sendSuccess = (
  res,
  statusCode = 200,
  message = "Success",
  data = null,
) => {
  res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    // Jika ada data yang dioper, masukkan ke dalam objek response
    ...(data && { data }),
  });
};

/**
 * Mengirimkan response error (gagal)
 * (Catatan: Biasanya ini dipakai jika tidak ingin melempar error ke Global Error Handler)
 * @param {Object} res - Objek response bawaan Express
 * @param {number} statusCode - Kode status HTTP (default: 500 Internal Server Error)
 * @param {string} message - Pesan error (default: 'Error')
 * @param {Object} details - Info detail tambahan terkait error tersebut (opsional)
 */
const sendError = (
  res,
  statusCode = 500,
  message = "Error",
  details = null,
) => {
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    // Jika ada detail tambahan, masukkan ke dalam objek response
    ...(details && { details }),
  });
};

/**
 * Fungsi bantuan (helper) untuk meracik custom error (error buatan sendiri)
 * Sangat cocok digabungkan dengan Global Error Handler dengan cara di-throw atau di-next()
 * @param {string} message - Pesan error yang ingin ditampilkan
 * @param {number} statusCode - Kode status HTTP (default: 500)
 * @param {Object} details - Info detail tambahan (opsional)
 */
const createError = (message, statusCode = 500, details = null) => {
  // Buat instance error bawaan JavaScript
  const error = new Error(message);

  // Sisipkan status code ke dalam objek error
  error.statusCode = statusCode;

  // Jika ada info detail tambahan, sisipkan juga
  if (details) error.details = details;

  return error; // Kembalikan objek error yang sudah diracik
};

module.exports = {
  sendSuccess,
  sendError,
  createError,
};
