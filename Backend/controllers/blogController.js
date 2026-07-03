const blogQueries = require('../queries/blogQueries');

const getBlogs = async (req, res) => {
  try {
    const blogs = await blogQueries.getAllBlogs();
    res.status(200).json({
      message: 'Berhasil mengambil data blog',
      data: blogs
    });
  } catch (error) {
    console.error('Error saat mengambil blog:', error);
    res.status(500).json({ message: 'Terjadi kesalahan internal server' });
  }
};

module.exports = {
  getBlogs
};
