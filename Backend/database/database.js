const mysql = require('mysql2');
require('dotenv').config();

// Koneksi awal tanpa menyebutkan database agar tidak error jika database belum ada
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Helper function untuk menjalankan query menggunakan Promise agar eksekusi tabel berurutan
const queryAsync = (conn, sql) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

connection.connect(async (err) => {
  if (err) {
    console.error('Koneksi ke server MySQL gagal:', err);
    return;
  }
  console.log('Tersambung ke server MySQL!');

  const dbName = process.env.DB_NAME || 'redesign2_igrs';
  
  try {
    // 1. Buat database
    await queryAsync(connection, `CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database "${dbName}" siap.`);
    
    // 2. Gunakan database
    await queryAsync(connection, `USE \`${dbName}\``);

    // 3. Buat Tabel Master (Tanpa Foreign Key)
    const tables = [
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        company VARCHAR(255),
        country VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        avatar VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS ratings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        icon_url VARCHAR(255)
      )`,
      `CREATE TABLE IF NOT EXISTS platforms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        icon_url VARCHAR(255)
      )`,
      `CREATE TABLE IF NOT EXISTS genres (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS content_descriptors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        icon_url VARCHAR(255)
      )`,
      `CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    ];

    for (let sql of tables) {
      await queryAsync(connection, sql);
    }

    // 4. Buat Tabel Inti (Games) yang memiliki Foreign Key ke Master
    const createGamesTable = `
      CREATE TABLE IF NOT EXISTS games (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        publisher VARCHAR(255),
        description TEXT,
        rating_id INT,
        cover_image VARCHAR(255),
        gallery_images JSON,
        file_path VARCHAR(255),
        developer_id INT,
        status ENUM('pending', 'approved') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (rating_id) REFERENCES ratings(id) ON DELETE SET NULL,
        FOREIGN KEY (developer_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    await queryAsync(connection, createGamesTable);

    // 5. Buat Tabel Relasi (Junction Tables)
    const relationTables = [
      `CREATE TABLE IF NOT EXISTS game_platforms (
        game_id INT,
        platform_id INT,
        PRIMARY KEY (game_id, platform_id),
        FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
        FOREIGN KEY (platform_id) REFERENCES platforms(id) ON DELETE CASCADE
      )`,
      `CREATE TABLE IF NOT EXISTS game_genres (
        game_id INT,
        genre_id INT,
        PRIMARY KEY (game_id, genre_id),
        FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
        FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
      )`,
      `CREATE TABLE IF NOT EXISTS game_descriptors (
        game_id INT,
        descriptor_id INT,
        PRIMARY KEY (game_id, descriptor_id),
        FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
        FOREIGN KEY (descriptor_id) REFERENCES content_descriptors(id) ON DELETE CASCADE
      )`
    ];

    for (let sql of relationTables) {
      await queryAsync(connection, sql);
    }

    console.log('Seluruh skema database relasional (9 tabel) berhasil dimuat/siap digunakan!');

  } catch (error) {
    console.error('Terjadi kesalahan saat membangun skema database:', error);
  }
});

module.exports = connection;
