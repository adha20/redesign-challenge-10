const gameQueries = require("../queries/gameQueries");
const { sendSuccess } = require("../utils/responses");

const getGames = async (req, res, next) => {
  try {
    const games = await gameQueries.getAllGames();

    return sendSuccess(res, 200, "Berhasil mengambil data gim", games);
  } catch (error) {
    // console.error("Error saat mengambil game:", error);
    // res.status(500).json({ message: "Terjadi kesalahan internal server" });
    next(error);
  }
};

const registerGame = async (req, res) => {
  try {
    const { title, rating, platform } = req.body;

    // Multer menyimpan informasi file di req.file
    const file_path = req.file ? req.file.path : null;

    if (!title) {
      return res.status(400).json({ message: "Judul gim wajib diisi!" });
    }

    const newGame = { title, rating, platform, file_path };
    const result = await gameQueries.createGame(newGame);

    return sendSuccess(res, 201, "Gim berhasil didaftarkan!", {
      id: result.insertId,
      ...newGame,
    });
  } catch (error) {
    // console.error("Error saat mendaftar game:", error);
    // res.status(500).json({ message: "Gagal mendaftarkan gim" });
    next(error);
  }
};

module.exports = {
  getGames,
  registerGame,
};
