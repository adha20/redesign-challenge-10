const metaQueries = require('../queries/metaQueries');

const getRatings = async (req, res) => {
  try {
    const ratings = await metaQueries.getAllRatings();
    res.status(200).json({
      message: 'Berhasil mengambil data rating',
      data: ratings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server saat mengambil data rating.' });
  }
};

const getClassifications = async (req, res) => {
  try {
    const classifications = await metaQueries.getAllClassifications();
    res.status(200).json({
      message: 'Berhasil mengambil data klasifikasi konten',
      data: classifications
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server saat mengambil data klasifikasi.' });
  }
};

module.exports = {
  getRatings,
  getClassifications
};
