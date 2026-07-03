const db = require('../database/database');

const getAllRatings = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM ratings ORDER BY id ASC';
    db.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const getAllClassifications = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM content_descriptors ORDER BY id ASC';
    db.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  getAllRatings,
  getAllClassifications
};
