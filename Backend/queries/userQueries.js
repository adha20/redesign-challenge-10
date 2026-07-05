const db = require('../database/database');

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

const createUser = (name, email, company, country, password) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO users (name, email, company, country, password) 
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [name, email, company, country, password], (err, results) => {
      if (err) return reject(err);
      resolve(results.insertId);
    });
  });
};

module.exports = {
  findUserByEmail,
  createUser
};
