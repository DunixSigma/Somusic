import { database } from './database.js';
import { logger } from '../logs/logger.js';

export const favorites = {
  async addFavorite(userId, guildId, track) {
    try {
      await database.run(
        `INSERT INTO favorites (user_id, guild_id, title, url, duration, thumbnail, author)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [userId, guildId, track.title, track.url, track.duration, track.thumbnail, track.author]
      );
      
      logger.database(`Favorito adicionado para ${userId}`);
      return true;
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        logger.warn('Música já está nos favoritos');
        return false;
      }
      logger.error('Erro ao adicionar favorito', error);
      return false;
    }
  },

  async removeFavorite(userId, url) {
    try {
      await database.run(
        'DELETE FROM favorites WHERE user_id = ? AND url = ?',
        [userId, url]
      );
      
      logger.database(`Favorito removido para ${userId}`);
      return true;
    } catch (error) {
      logger.error('Erro ao remover favorito', error);
      return false;
    }
  },

  async getFavorites(userId, guildId) {
    try {
      const results = await database.all(
        'SELECT * FROM favorites WHERE user_id = ? AND guild_id = ? ORDER BY created_at DESC',
        [userId, guildId]
      );
      
      return results || [];
    } catch (error) {
      logger.error('Erro ao obter favoritos', error);
      return [];
    }
  },

  async isFavorite(userId, url) {
    try {
      const result = await database.get(
        'SELECT id FROM favorites WHERE user_id = ? AND url = ?',
        [userId, url]
      );
      
      return !!result;
    } catch (error) {
      logger.error('Erro ao verificar favorito', error);
      return false;
    }
  }
};
