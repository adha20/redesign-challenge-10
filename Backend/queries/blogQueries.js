const db = require('../database/database');

const getAllBlogs = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, title, description AS `desc`, image_url AS `img`, created_at FROM blogs ORDER BY id ASC';
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  getAllBlogs
};
