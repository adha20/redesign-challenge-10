const mysql = require('mysql2/promise');
require('dotenv').config();

const seedDatabase = async () => {
  const dbName = process.env.DB_NAME || 'redesign2_igrs';
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: dbName
    });

    console.log('Mulai melakukan seeding data...');

    // 1. Membersihkan data lama (Opsional, agar seed bisa dijalankan berulang)
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('TRUNCATE TABLE game_descriptors');
    await connection.query('TRUNCATE TABLE game_genres');
    await connection.query('TRUNCATE TABLE game_platforms');
    await connection.query('TRUNCATE TABLE games');
    await connection.query('TRUNCATE TABLE content_descriptors');
    await connection.query('TRUNCATE TABLE genres');
    await connection.query('TRUNCATE TABLE platforms');
    await connection.query('TRUNCATE TABLE ratings');
    await connection.query('TRUNCATE TABLE users');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    // 2. Insert Users
    // Dummy User (Adha) - ID 1
    await connection.query(`INSERT INTO users (id, name, email, company, country, password, role, avatar) VALUES (1, 'adha', 'adha20@gmail.com', 'adha', 'indonesia', '12345678', 'user', 'http://localhost:5000/uploads/assets/image17.png')`);

    // Admin User - ID 2
    const [userResult] = await connection.query(`INSERT INTO users (name, email, password, role) VALUES ('Admin IGRS', 'admin@igrs.id', 'hashedpassword123', 'admin')`);
    const devId = userResult.insertId;

    // 3. Insert Ratings
    await connection.query(`INSERT INTO ratings (id, name, icon_url) VALUES 
      (1, '3+', 'http://localhost:5000/uploads/assets/rating-3.png'),
      (2, '7+', 'http://localhost:5000/uploads/assets/rating-7.png'),
      (3, '13+', 'http://localhost:5000/uploads/assets/rating-13.png'),
      (4, '15+', 'http://localhost:5000/uploads/assets/rating-15.png'),
      (5, '18+', 'http://localhost:5000/uploads/assets/rating-18.png')
    `);

    // 4. Insert Platforms
    await connection.query(`INSERT INTO platforms (id, name, icon_url) VALUES 
      (1, 'Windows', 'http://localhost:5000/uploads/assets/platform-windows.svg'),
      (2, 'Android', 'http://localhost:5000/uploads/assets/platform-android.svg'),
      (3, 'Playstation', 'http://localhost:5000/uploads/assets/platform-ps.svg'),
      (4, 'iOS', 'http://localhost:5000/uploads/assets/platform-ios.svg')
    `);

    // 5. Insert Genres
    await connection.query(`INSERT INTO genres (id, name) VALUES 
      (1, 'Petualangan'), (2, 'Open World'), (3, 'RPG'), 
      (4, 'Survival'), (5, 'Simulasi'), (6, 'Shooter'), (7, 'Puzzle')
    `);

    // 6. Insert Content Descriptors (Klasifikasi Penuh)
    await connection.query(`INSERT INTO content_descriptors (id, name, icon_url) VALUES 
      (1, 'Interaksi Daring', 'http://localhost:5000/uploads/assets/class-interaksi.png'),
      (2, 'Kekerasan', 'http://localhost:5000/uploads/assets/class-kekerasan.png'),
      (3, 'Simulasi Judi', 'http://localhost:5000/uploads/assets/class-judi.png'),
      (4, 'Bahasa Kasar', 'http://localhost:5000/uploads/assets/class-bahasa.png'),
      (5, 'Darah', 'http://localhost:5000/uploads/assets/class-darah.png'),
      (6, 'Horror', 'http://localhost:5000/uploads/assets/class-horror.png'),
      (7, 'Penampilan', 'http://localhost:5000/uploads/assets/class-penampilan.png'),
      (8, 'Pornografi', 'http://localhost:5000/uploads/assets/class-pornografi.png'),
      (9, 'Rokok/Alkohol', 'http://localhost:5000/uploads/assets/class-rokok.png')
    `);

    // 7. Insert Games (10 Gim Lengkap)
    const gamesData = [
      {
        title: "Genshin Impact",
        publisher: "HoYoverse",
        description: JSON.stringify([
          "Genshin Impact merupakan gim open world action RPG yang memungkinkan pemain menjelajahi dunia Teyvat, menyelesaikan berbagai misi, serta melawan musuh menggunakan karakter dengan kemampuan unik.",
          "Genshin Impact menawarkan eksplorasi dunia terbuka dengan berbagai aktivitas, seperti bertarung, menyelesaikan misi, memasak, mengumpulkan sumber daya, dan meningkatkan kemampuan karakter."
        ]),
        rating_id: 4, // 15+
        cover_image: "http://localhost:5000/uploads/games/genshin-cover.png",
        gallery_images: JSON.stringify([
          "http://localhost:5000/uploads/games/genshin-gallery-1.png",
          "http://localhost:5000/uploads/games/genshin-gallery-2.png",
          "http://localhost:5000/uploads/games/genshin-gallery-3.png",
          "http://localhost:5000/uploads/games/genshin-gallery-4.png"
        ]),
        platforms: [1, 2, 3, 4], // Windows, Android, PS, iOS
        genres: [1, 2, 3], // Petualangan, Open World, RPG
        descriptors: [1, 2, 3] // Interaksi, Kekerasan, Judi
      },
      {
        title: "Wuthering Waves",
        publisher: "Kuro Games",
        description: JSON.stringify(["Wuthering Waves adalah game open-world action RPG yang berlatar di dunia pasca-apokaliptik dengan cerita yang mendalam dan kebebasan berekspresi dalam pertarungan."]),
        rating_id: 4, // 15+
        cover_image: "http://localhost:5000/uploads/games/wuthering-waves.png",
        gallery_images: JSON.stringify(["http://localhost:5000/uploads/games/wuthering-waves.png"]),
        platforms: [1, 2, 4], // Windows, Android, iOS
        genres: [3, 2, 1], // RPG, Open World, Petualangan
        descriptors: [2] // Kekerasan
      },
      {
        title: "Tower of Fantasy",
        publisher: "Hotta Studio",
        description: JSON.stringify(["Game Sci-Fi Open World RPG dengan kebebasan kustomisasi dan sistem pertarungan yang intens."]),
        rating_id: 4, // 15+
        cover_image: "http://localhost:5000/uploads/games/tower-of-fantasy.png",
        gallery_images: JSON.stringify(["http://localhost:5000/uploads/games/tower-of-fantasy.png"]),
        platforms: [1, 2], // Windows, Android
        genres: [3, 2], // RPG, Open World
        descriptors: [1] // Interaksi Daring
      },
      {
        title: "Black Desert Mobile",
        publisher: "Pearl Abyss",
        description: JSON.stringify(["Game MMORPG aksi kelas dunia dengan sistem pertarungan non-targeting dan grafis luar biasa."]),
        rating_id: 5, // 18+
        cover_image: "http://localhost:5000/uploads/games/black-desert.png",
        gallery_images: JSON.stringify(["http://localhost:5000/uploads/games/black-desert.png"]),
        platforms: [2, 4], // Android, iOS
        genres: [3, 1], // RPG, Petualangan
        descriptors: [2] // Kekerasan
      },
      {
        title: "Albion Online",
        publisher: "Sandbox Interactive",
        description: JSON.stringify(["Game Sandbox MMORPG di mana ekonomi digerakkan sepenuhnya oleh pemain."]),
        rating_id: 4, // 15+
        cover_image: "http://localhost:5000/uploads/games/albion.png",
        gallery_images: JSON.stringify(["http://localhost:5000/uploads/games/albion.png"]),
        platforms: [1, 2], // Windows, Android
        genres: [3, 2], // RPG, Open World
        descriptors: [1] // Interaksi Daring
      },
      {
        title: "Dragon Raja",
        publisher: "Archosaur Games",
        description: JSON.stringify(["MMORPG dengan grafis memukau yang dibangun menggunakan Unreal Engine 4."]),
        rating_id: 4, // 15+
        cover_image: "http://localhost:5000/uploads/games/dragon-raja.png",
        gallery_images: JSON.stringify(["http://localhost:5000/uploads/games/dragon-raja.png"]),
        platforms: [2, 4], // Android, iOS
        genres: [3], // RPG
        descriptors: [1] // Interaksi Daring
      },
      {
        title: "Sky: Children of the Light",
        publisher: "thatgamecompany",
        description: JSON.stringify(["Eksplorasi dunia magis yang menenangkan, berinteraksi dan membentuk ikatan dengan pemain lain di seluruh dunia."]),
        rating_id: 1, // 3+
        cover_image: "http://localhost:5000/uploads/games/sky.png",
        gallery_images: JSON.stringify(["http://localhost:5000/uploads/games/sky.png"]),
        platforms: [2, 4], // Android, iOS
        genres: [1, 7], // Petualangan, Puzzle
        descriptors: [1] // Interaksi Daring
      },
      {
        title: "Minecraft",
        publisher: "Mojang Studios",
        description: JSON.stringify(["Game sandbox legendaris yang memberikan kebebasan tanpa batas untuk membangun dan bertahan hidup."]),
        rating_id: 2, // 7+
        cover_image: "http://localhost:5000/uploads/games/minecraft.png",
        gallery_images: JSON.stringify(["http://localhost:5000/uploads/games/minecraft.png"]),
        platforms: [1, 3], // Windows, Playstation
        genres: [4, 5, 2], // Survival, Simulasi, Open World
        descriptors: [1] // Interaksi Daring
      },
      {
        title: "Undawn",
        publisher: "Lightspeed Studios (Tencent)",
        description: JSON.stringify(["Game open world survival menantang di dunia pasca-apokaliptik yang dipenuhi zombie."]),
        rating_id: 5, // 18+
        cover_image: "http://localhost:5000/uploads/games/undawn.png",
        gallery_images: JSON.stringify(["http://localhost:5000/uploads/games/undawn.png"]),
        platforms: [1, 2], // Windows, Android
        genres: [4, 6, 2], // Survival, Shooter, Open World
        descriptors: [2] // Kekerasan
      },
      {
        title: "Dawnlands",
        publisher: "Seasun Games",
        description: JSON.stringify(["Game survival RPG dengan sistem crafting dan eksplorasi dunia terbuka yang indah."]),
        rating_id: 4, // 15+
        cover_image: "http://localhost:5000/uploads/games/dawnlands.png",
        gallery_images: JSON.stringify(["http://localhost:5000/uploads/games/dawnlands.png"]),
        platforms: [1, 2], // Windows, Android
        genres: [4, 3], // Survival, RPG
        descriptors: [1] // Interaksi Daring
      }
    ];

    for (let game of gamesData) {
      const [gResult] = await connection.query(
        `INSERT INTO games (title, publisher, description, rating_id, cover_image, gallery_images, developer_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'approved')`,
        [game.title, game.publisher, game.description, game.rating_id, game.cover_image, game.gallery_images, devId]
      );
      const gameId = gResult.insertId;

      // Insert Relations
      for (let pId of game.platforms) await connection.query('INSERT INTO game_platforms (game_id, platform_id) VALUES (?, ?)', [gameId, pId]);
      for (let gId of game.genres) await connection.query('INSERT INTO game_genres (game_id, genre_id) VALUES (?, ?)', [gameId, gId]);
      for (let dId of game.descriptors) await connection.query('INSERT INTO game_descriptors (game_id, descriptor_id) VALUES (?, ?)', [gameId, dId]);
    }

    // 9. Insert Blogs (Data Dummy)
    const blogsData = [
      {
        title: "Dewasa Sebelum Menginjak Dewasa?",
        desc: "Perkembangan industri gim menghadirkan beragam pilihan hiburan yang dapat dinikmati oleh semua kalangan. Namun, di balik manfaat tersebut, terdapat tantangan yang perlu...",
        img: "http://localhost:5000/uploads/assets/blog-1.png"
      },
      {
        title: "Klasifikasi Usia Gim Mobile Legends Resmi Berubah",
        desc: "Mobile Legends merupakan salah satu gim yang paling populer di Indonesia dan dimainkan oleh berbagai kelompok usia. Seiring dengan perkembangan konten, fitur, serta...",
        img: "http://localhost:5000/uploads/assets/blog-2.png"
      },
      {
        title: "Block Blast: Gim Sederhana Pengasah Kemampuan Berpikir",
        desc: "Di tengah banyaknya gim bergenre aksi dan kompetitif, Block Blast hadir sebagai permainan puzzle yang menawarkan pengalaman bermain sederhana namun tetap...",
        img: "http://localhost:5000/uploads/assets/blog-3.png"
      }
    ];

    for (const blog of blogsData) {
      await connection.query('INSERT INTO blogs (title, description, image_url) VALUES (?, ?, ?)', [
        blog.title,
        blog.desc,
        blog.img
      ]);
    }

    console.log('Seeding selesai! Data berhasil dimasukkan ke database.');
    process.exit(0);
  } catch (error) {
    console.error('Error saat seeding:', error);
    process.exit(1);
  }
};

seedDatabase();
