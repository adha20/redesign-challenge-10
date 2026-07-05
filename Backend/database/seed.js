const mysql = require('mysql2/promise');
require('dotenv').config();

const seedDatabase = async () => {
  const dbName = process.env.DB_NAME || 'redesign2_igrs';
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: dbName,
      ssl: process.env.DB_HOST && process.env.DB_HOST.includes('tidbcloud') ? { minVersion: 'TLSv1.2', rejectUnauthorized: true } : undefined
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
    await connection.query('TRUNCATE TABLE blogs');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    // 2. Insert Users (Hanya Admin)
    const bcrypt = require('bcrypt');
    const salt = await bcrypt.genSalt(10);
    const hashedAdminPassword = await bcrypt.hash('admin123', salt);

    // Admin User - ID 1
    const [userResult] = await connection.query(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`, 
      ['Admin IGRS', 'admin@igrs.id', hashedAdminPassword, 'admin']
    );
    const devId = userResult.insertId;

    // 3. Insert Ratings
    await connection.query(`INSERT INTO ratings (id, name, icon_url) VALUES 
      (1, '3+', '/uploads/assets/rating-3.png'),
      (2, '7+', '/uploads/assets/rating-7.png'),
      (3, '13+', '/uploads/assets/rating-13.png'),
      (4, '15+', '/uploads/assets/rating-15.png'),
      (5, '18+', '/uploads/assets/rating-18.png')
    `);

    // 4. Insert Platforms
    await connection.query(`INSERT INTO platforms (id, name, icon_url) VALUES 
      (1, 'Windows', '/uploads/assets/platform-windows.svg'),
      (2, 'Android', '/uploads/assets/platform-android.svg'),
      (3, 'Playstation', '/uploads/assets/platform-ps.svg'),
      (4, 'iOS', '/uploads/assets/platform-ios.svg')
    `);

    // 5. Insert Genres
    await connection.query(`INSERT INTO genres (id, name) VALUES 
      (1, 'Petualangan'), (2, 'Open World'), (3, 'RPG'), 
      (4, 'Survival'), (5, 'Simulasi'), (6, 'Shooter'), (7, 'Puzzle')
    `);

    // 6. Insert Content Descriptors
    const baseUrl = '/uploads';
    const descriptors = [
      { id: 2, name: 'Kekerasan', desc: 'Mengandung adegan perkelahian, penyerangan, penggunaan senjata, atau tindakan yang menyebabkan cedera terhadap karakter lain.', icon: `${baseUrl}/assets/class-kekerasan.png` },
      { id: 6, name: 'Horror', desc: 'Konten yang menampilkan unsur menakutkan, seperti makhluk menyeramkan, suasana mencekam, atau efek visual dan suara yang dapat memicu rasa takut pada pemain.', icon: `${baseUrl}/assets/class-horror.png` },
      { id: 1, name: 'Interaksi Daring', desc: 'Gim memungkinkan pemain berkomunikasi atau berinteraksi dengan pengguna lain melalui internet, seperti fitur obrolan, permainan multipemain, atau pertukaran konten.', icon: `${baseUrl}/assets/class-interaksi.png` },
      { id: 7, name: 'Penampilan Tokoh', desc: 'Menunjukkan adanya karakter dengan penampilan, pakaian, atau visual tertentu yang dapat memengaruhi penilaian kesesuaian konten berdasarkan kelompok usia.', icon: `${baseUrl}/assets/class-penampilan.png` },
      { id: 8, name: 'Pornografi', desc: 'Menampilkan unsur seksual, ketelanjangan, atau materi yang mengandung muatan pornografi sehingga hanya sesuai untuk kelompok usia tertentu.', icon: `${baseUrl}/assets/class-pornografi.png` },
      { id: 9, name: 'Rokok, Narkotika, dan Alkohol', desc: 'Mengandung penggambaran penggunaan, konsumsi, atau referensi terhadap rokok, narkotika, maupun minuman beralkohol di dalam permainan.', icon: `${baseUrl}/assets/class-rokok.png` },
      { id: 5, name: 'Darah', desc: 'Menampilkan visual darah, luka serius, pemotongan anggota tubuh, atau tindakan ekstrem lainnya yang berpotensi mengganggu sebagian pemain.', icon: `${baseUrl}/assets/class-darah.png` },
      { id: 4, name: 'Bahasa Kasar', desc: 'Mengandung kata-kata yang bersifat kasar, menghina, vulgar, atau tidak pantas yang digunakan dalam dialog maupun interaksi antarkarakter.', icon: `${baseUrl}/assets/class-bahasa.png` },
      { id: 3, name: 'Simulasi Judi', desc: 'Memiliki mekanisme permainan yang menyerupai aktivitas perjudian, seperti taruhan, permainan berbasis peluang, atau sistem yang mensimulasikan praktik judi tanpa melibatkan uang asli.', icon: `${baseUrl}/assets/class-judi.png` }
    ];
    for (const desc of descriptors) {
      await connection.query('INSERT INTO content_descriptors (id, name, description, icon_url) VALUES (?, ?, ?, ?)', [desc.id, desc.name, desc.desc, desc.icon]);
    }

    // 7. Insert Games (10 Gim Lengkap)
    const gamesData = [
      {
        title: "Genshin Impact",
        publisher: "Cognosphere Pte. Ltd.",
        description: JSON.stringify([
          "Genshin Impact merupakan gim open world action RPG yang memungkinkan pemain menjelajahi dunia Teyvat, menyelesaikan berbagai misi, serta melawan musuh menggunakan karakter dengan kemampuan unik. Pemain dapat membentuk tim, meningkatkan level karakter, memperkuat senjata dan artefak, serta menghadapi berbagai tantangan untuk memperoleh hadiah dan meningkatkan Adventure Rank guna membuka konten baru.",
          "Genshin Impact menawarkan eksplorasi dunia terbuka dengan berbagai aktivitas, seperti bertarung, menyelesaikan misi, memasak, mengumpulkan sumber daya, dan meningkatkan kemampuan karakter. Gim ini juga menghadirkan sistem pertarungan fantasi menggunakan senjata dan elemen sihir yang mengandung unsur kekerasan fantasi tanpa menampilkan visual yang realistis. Oleh karena itu, gim ini lebih sesuai dimainkan oleh pengguna pada kategori usia 13+ dengan deskriptor konten berupa Kekerasan dan Interaksi Daring, karena mendukung permainan secara daring dengan pemain lain."
        ]),
        rating_id: 3, // 13+
        cover_image: "/uploads/games/genshin-cover.png",
        gallery_images: JSON.stringify([
          "/uploads/games/genshin-gallery-1.png",
          "/uploads/games/genshin-gallery-2.png",
          "/uploads/games/genshin-gallery-3.png",
          "/uploads/games/genshin-gallery-4.png"
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
        cover_image: "/uploads/games/wuthering-waves.png",
        gallery_images: JSON.stringify(["/uploads/games/wuthering-waves.png"]),
        platforms: [1, 2, 4], // Windows, Android, iOS
        genres: [3, 2, 1], // RPG, Open World, Petualangan
        descriptors: [2] // Kekerasan
      },
      {
        title: "Tower of Fantasy",
        publisher: "Hotta Studio",
        description: JSON.stringify(["Game Sci-Fi Open World RPG dengan kebebasan kustomisasi dan sistem pertarungan yang intens."]),
        rating_id: 4, // 15+
        cover_image: "/uploads/games/tower-of-fantasy.png",
        gallery_images: JSON.stringify(["/uploads/games/tower-of-fantasy.png"]),
        platforms: [1, 2], // Windows, Android
        genres: [3, 2], // RPG, Open World
        descriptors: [1] // Interaksi Daring
      },
      {
        title: "Black Desert Mobile",
        publisher: "Pearl Abyss",
        description: JSON.stringify(["Game MMORPG aksi kelas dunia dengan sistem pertarungan non-targeting dan grafis luar biasa."]),
        rating_id: 5, // 18+
        cover_image: "/uploads/games/black-desert.png",
        gallery_images: JSON.stringify(["/uploads/games/black-desert.png"]),
        platforms: [2, 4], // Android, iOS
        genres: [3, 1], // RPG, Petualangan
        descriptors: [2] // Kekerasan
      },
      {
        title: "Albion Online",
        publisher: "Sandbox Interactive",
        description: JSON.stringify(["Game Sandbox MMORPG di mana ekonomi digerakkan sepenuhnya oleh pemain."]),
        rating_id: 4, // 15+
        cover_image: "/uploads/games/albion.png",
        gallery_images: JSON.stringify(["/uploads/games/albion.png"]),
        platforms: [1, 2], // Windows, Android
        genres: [3, 2], // RPG, Open World
        descriptors: [1] // Interaksi Daring
      },
      {
        title: "Dragon Raja",
        publisher: "Archosaur Games",
        description: JSON.stringify(["MMORPG dengan grafis memukau yang dibangun menggunakan Unreal Engine 4."]),
        rating_id: 4, // 15+
        cover_image: "/uploads/games/dragon-raja.png",
        gallery_images: JSON.stringify(["/uploads/games/dragon-raja.png"]),
        platforms: [2, 4], // Android, iOS
        genres: [3], // RPG
        descriptors: [1] // Interaksi Daring
      },
      {
        title: "Sky: Children of the Light",
        publisher: "thatgamecompany",
        description: JSON.stringify(["Eksplorasi dunia magis yang menenangkan, berinteraksi dan membentuk ikatan dengan pemain lain di seluruh dunia."]),
        rating_id: 1, // 3+
        cover_image: "/uploads/games/sky.png",
        gallery_images: JSON.stringify(["/uploads/games/sky.png"]),
        platforms: [2, 4], // Android, iOS
        genres: [1, 7], // Petualangan, Puzzle
        descriptors: [1] // Interaksi Daring
      },
      {
        title: "Minecraft",
        publisher: "Mojang Studios",
        description: JSON.stringify(["Game sandbox legendaris yang memberikan kebebasan tanpa batas untuk membangun dan bertahan hidup."]),
        rating_id: 2, // 7+
        cover_image: "/uploads/games/minecraft.png",
        gallery_images: JSON.stringify(["/uploads/games/minecraft.png"]),
        platforms: [1, 3], // Windows, Playstation
        genres: [4, 5, 2], // Survival, Simulasi, Open World
        descriptors: [1] // Interaksi Daring
      },
      {
        title: "Undawn",
        publisher: "Lightspeed Studios (Tencent)",
        description: JSON.stringify(["Game open world survival menantang di dunia pasca-apokaliptik yang dipenuhi zombie."]),
        rating_id: 5, // 18+
        cover_image: "/uploads/games/undawn.png",
        gallery_images: JSON.stringify(["/uploads/games/undawn.png"]),
        platforms: [1, 2], // Windows, Android
        genres: [4, 6, 2], // Survival, Shooter, Open World
        descriptors: [2] // Kekerasan
      },
      {
        title: "Dawnlands",
        publisher: "Seasun Games",
        description: JSON.stringify(["Game survival RPG dengan sistem crafting dan eksplorasi dunia terbuka yang indah."]),
        rating_id: 4, // 15+
        cover_image: "/uploads/games/dawnlands.png",
        gallery_images: JSON.stringify(["/uploads/games/dawnlands.png"]),
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
        img: "/uploads/assets/blog-1.png"
      },
      {
        title: "Klasifikasi Usia Gim Mobile Legends Resmi Berubah",
        desc: "Mobile Legends merupakan salah satu gim yang paling populer di Indonesia dan dimainkan oleh berbagai kelompok usia. Seiring dengan perkembangan konten, fitur, serta...",
        img: "/uploads/assets/blog-2.png"
      },
      {
        title: "Block Blast: Gim Sederhana Pengasah Kemampuan Berpikir",
        desc: "Di tengah banyaknya gim bergenre aksi dan kompetitif, Block Blast hadir sebagai permainan puzzle yang menawarkan pengalaman bermain sederhana namun tetap...",
        img: "/uploads/assets/blog-3.png"
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
