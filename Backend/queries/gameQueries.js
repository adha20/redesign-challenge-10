const db = require('../database/database');

const getAllGames = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        g.id, g.title, g.publisher, g.description, g.cover_image, g.gallery_images, g.status, g.created_at,
        JSON_OBJECT('id', r.id, 'name', r.name, 'icon_url', r.icon_url) as rating,
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT('id', p.id, 'name', p.name, 'icon_url', p.icon_url))
          FROM game_platforms gp
          JOIN platforms p ON gp.platform_id = p.id
          WHERE gp.game_id = g.id
        ) as platforms,
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT('id', gen.id, 'name', gen.name))
          FROM game_genres gg
          JOIN genres gen ON gg.genre_id = gen.id
          WHERE gg.game_id = g.id
        ) as genres,
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT('id', cd.id, 'name', cd.name, 'icon_url', cd.icon_url))
          FROM game_descriptors gd
          JOIN content_descriptors cd ON gd.descriptor_id = cd.id
          WHERE gd.game_id = g.id
        ) as classifications
      FROM games g
      LEFT JOIN ratings r ON g.rating_id = r.id
    `;
    db.query(query, (err, results) => {
      if (err) return reject(err);
      
      // Parse string JSON agar menjadi object/array asli di response Express
      const parsedResults = results.map(game => ({
        ...game,
        description: typeof game.description === 'string' ? JSON.parse(game.description || '[]') : (game.description || []),
        gallery_images: typeof game.gallery_images === 'string' ? JSON.parse(game.gallery_images || '[]') : (game.gallery_images || []),
        rating: typeof game.rating === 'string' ? JSON.parse(game.rating) : game.rating,
        platforms: typeof game.platforms === 'string' ? JSON.parse(game.platforms || '[]') : (game.platforms || []),
        genres: typeof game.genres === 'string' ? JSON.parse(game.genres || '[]') : (game.genres || []),
        classifications: typeof game.classifications === 'string' ? JSON.parse(game.classifications || '[]') : (game.classifications || [])
      }));
      
      resolve(parsedResults);
    });
  });
};

const createGame = (gameData) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO games (title, rating, platform, file_path) VALUES (?, ?, ?, ?)';
    db.query(query, [gameData.title, gameData.rating, gameData.platform, gameData.file_path], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  getAllGames,
  createGame
};
