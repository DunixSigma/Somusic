import Logger from '../logs/Logger.js';

const logger = new Logger('UserDB');

class UserDB {
  constructor(database) {
    this.db = database;
  }

  async addFavorite(userId, guildId, track) {
    try {
      const sql = `INSERT INTO user_favorites (user_id, guild_id, track_title, track_url, artist, duration, source)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
      await this.db.run(sql, [
        userId,
        guildId,
        track.title,
        track.uri,
        track.author,
        track.length,
        track.source
      ]);
      logger.info(`Added favorite for user ${userId}: ${track.title}`);
    } catch (error) {
      logger.error(`Failed to add favorite: ${error.message}`);
      throw error;
    }
  }

  async removeFavorite(userId, guildId, trackUrl) {
    try {
      const sql = `DELETE FROM user_favorites WHERE user_id = ? AND guild_id = ? AND track_url = ?`;
      await this.db.run(sql, [userId, guildId, trackUrl]);
      logger.info(`Removed favorite for user ${userId}`);
    } catch (error) {
      logger.error(`Failed to remove favorite: ${error.message}`);
      throw error;
    }
  }

  async getFavorites(userId, guildId) {
    try {
      const sql = `SELECT * FROM user_favorites WHERE user_id = ? AND guild_id = ? ORDER BY created_at DESC`;
      return await this.db.all(sql, [userId, guildId]);
    } catch (error) {
      logger.error(`Failed to get favorites: ${error.message}`);
      throw error;
    }
  }

  async isFavorite(userId, guildId, trackUrl) {
    try {
      const sql = `SELECT COUNT(*) as count FROM user_favorites WHERE user_id = ? AND guild_id = ? AND track_url = ?`;
      const result = await this.db.get(sql, [userId, guildId, trackUrl]);
      return result.count > 0;
    } catch (error) {
      logger.error(`Failed to check favorite: ${error.message}`);
      throw error;
    }
  }

  async addToHistory(userId, guildId, track) {
    try {
      const sql = `INSERT INTO user_history (user_id, guild_id, track_title, track_url, artist, duration, source)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
      await this.db.run(sql, [
        userId,
        guildId,
        track.title,
        track.uri,
        track.author,
        track.length,
        track.source
      ]);
    } catch (error) {
      logger.error(`Failed to add to history: ${error.message}`);
      throw error;
    }
  }

  async getHistory(userId, guildId, limit = 50) {
    try {
      const sql = `SELECT * FROM user_history WHERE user_id = ? AND guild_id = ? ORDER BY played_at DESC LIMIT ?`;
      return await this.db.all(sql, [userId, guildId, limit]);
    } catch (error) {
      logger.error(`Failed to get history: ${error.message}`);
      throw error;
    }
  }

  async clearHistory(userId, guildId) {
    try {
      const sql = `DELETE FROM user_history WHERE user_id = ? AND guild_id = ?`;
      await this.db.run(sql, [userId, guildId]);
      logger.info(`Cleared history for user ${userId}`);
    } catch (error) {
      logger.error(`Failed to clear history: ${error.message}`);
      throw error;
    }
  }
}

export default UserDB;
