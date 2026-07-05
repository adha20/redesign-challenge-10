const blogQueries = require("../queries/blogQueries");
const { sendSuccess } = require("../utils/responses");

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await blogQueries.getAllBlogs();

    return sendSuccess(res, 200, "Berhasil mengambil data blog", blogs);
  } catch (error) {
    // console.error("Error saat mengambil blog:", error);
    // res.status(500).json({ message: "Terjadi kesalahan internal server" });
    next(error);
  }
};

module.exports = {
  getBlogs,
};
