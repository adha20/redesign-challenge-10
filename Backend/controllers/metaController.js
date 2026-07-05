const metaQueries = require("../queries/metaQueries");
const { sendSuccess } = require("../utils/responses");

const getRatings = async (req, res, next) => {
  try {
    const ratings = await metaQueries.getAllRatings();

    return sendSuccess(res, 200, "Berhasil mengambil data rating", ratings);
  } catch (error) {
    // console.error(error);
    // res.status(500).json({
    //   message: "Terjadi kesalahan pada server saat mengambil data rating.",
    // });
    next(error);
  }
};

const getClassifications = async (req, res, next) => {
  try {
    const classifications = await metaQueries.getAllClassifications();

    return sendSuccess(
      res,
      200,
      "Berhasil mengambil data klasifikasi konten",
      classifications,
    );
  } catch (error) {
    // console.error(error);
    // res.status(500).json({
    //   message: "Terjadi kesalahan pada server saat mengambil data klasifikasi.",
    // });
    next(error);
  }
};

module.exports = {
  getRatings,
  getClassifications,
};
