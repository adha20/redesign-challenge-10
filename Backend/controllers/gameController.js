const gameQueries = require('../queries/gameQueries');

const getGames = async (req, res) => {
  try {
    const games = await gameQueries.getAllGames();
    res.status(200).json({
      message: 'Berhasil mengambil data gim',
      data: games
    });
  } catch (error) {
    console.error('Error saat mengambil game:', error);
    res.status(500).json({ message: 'Terjadi kesalahan internal server' });
  }
};

const registerGame = async (req, res) => {
  try {
    const { title, rating, platform } = req.body;
    
    // Multer menyimpan informasi file di req.file
    const file_path = req.file ? req.file.path : null;

    if (!title) {
      return res.status(400).json({ message: 'Judul gim wajib diisi!' });
    }

    const newGame = { title, rating, platform, file_path };
    const result = await gameQueries.createGame(newGame);

    res.status(201).json({
      message: 'Gim berhasil didaftarkan!',
      data: { id: result.insertId, ...newGame }
    });
  } catch (error) {
    console.error('Error saat mendaftar game:', error);
    res.status(500).json({ message: 'Gagal mendaftarkan gim' });
  }
};

module.exports = {
  getGames,
  registerGame
};
