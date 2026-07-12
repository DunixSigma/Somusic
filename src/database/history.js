import { database } from './database.js';
import { logger } from '../logs/logger.js';

export const history = {
  async addToHistory(userId, guildId, track) {
    try {
      await database.run(
        `INSERT INTO history (user_id, guild_id, title, url, duration, thumbnail, author)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [userId, guildId, track.title, track.url, track.duration, track.thumbnail, track.author]
      );
      
      await database.run(
        `DELETE FROM history WHERE user_id = ? AND guild_id = ? AND id NOT IN (
          SELECT id FROM history WHERE user_id = ? AND guild_id = ? ORDER BY played_at DESC LIMIT 100
        )`,
        [userId, guildId, userId, guildId]
      );
      
      logger.database(`Música adicionada ao histórico de ${userId}`);
      return true;
    } catch (error) {
      logger.error('Erro ao adicionar ao histórico', error);
      return false;
    }
  },

  async getHistory(userId, guildId, limit = 20) {
    try {
      const results = await database.all(
        `SELECT * FROM history WHERE user_id = ? AND guild_id = ? ORDER BY played_at DESC LIMIT ?`,
        [userId, guildId, limit]
      );
      
      return results || [];
    } catch (error) {
      logger.error('Erro ao obter histórico', error);
      return [];
    }
  },

  async clearHistory(userId, guildId) {
    try {
      await database.run(
        'DELETE FROM history WHERE user_id = ? AND guild_id = ?',
        [userId, guildId]
      );
      
      logger.database(`Histórico limpo para ${userId}`);
      return true;
    } catch (error) {
      logger.error('Erro ao limpar histórico', error);
      return false;
    }
  }
};
