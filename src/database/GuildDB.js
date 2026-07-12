import Logger from '../logs/Logger.js';

const logger = new Logger('GuildDB');

class GuildDB {
  constructor(database) {
    this.db = database;
  }

  async getSettings(guildId) {
    try {
      const sql = 'SELECT * FROM guild_settings WHERE guild_id = ?';
      const result = await this.db.get(sql, [guildId]);
      return result || null;
    } catch (error) {
      logger.error(`Failed to get guild settings: ${error.message}`);
      throw error;
    }
  }

  async createSettings(guildId) {
    try {
      const sql = `INSERT INTO guild_settings (guild_id) VALUES (?)`;
      await this.db.run(sql, [guildId]);
      logger.info(`Created settings for guild: ${guildId}`);
      return await this.getSettings(guildId);
    } catch (error) {
      logger.error(`Failed to create guild settings: ${error.message}`);
      throw error;
    }
  }

  async updatePanel(guildId, channelId, messageId) {
    try {
      const sql = `UPDATE guild_settings SET panel_channel_id = ?, panel_message_id = ?, updated_at = CURRENT_TIMESTAMP WHERE guild_id = ?`;
      await this.db.run(sql, [channelId, messageId, guildId]);
      logger.info(`Updated panel for guild ${guildId}: channel ${channelId}, message ${messageId}`);
    } catch (error) {
      logger.error(`Failed to update panel: ${error.message}`);
      throw error;
    }
  }

  async updateVolume(guildId, volume) {
    try {
      const sql = `UPDATE guild_settings SET volume = ?, updated_at = CURRENT_TIMESTAMP WHERE guild_id = ?`;
      await this.db.run(sql, [volume, guildId]);
    } catch (error) {
      logger.error(`Failed to update volume: ${error.message}`);
      throw error;
    }
  }

  async updateLoop(guildId, loopMode) {
    try {
      const sql = `UPDATE guild_settings SET loop = ?, updated_at = CURRENT_TIMESTAMP WHERE guild_id = ?`;
      await this.db.run(sql, [loopMode, guildId]);
    } catch (error) {
      logger.error(`Failed to update loop: ${error.message}`);
      throw error;
    }
  }

  async updateAutoplay(guildId, autoplay) {
    try {
      const sql = `UPDATE guild_settings SET autoplay = ?, updated_at = CURRENT_TIMESTAMP WHERE guild_id = ?`;
      await this.db.run(sql, [autoplay ? 1 : 0, guildId]);
    } catch (error) {
      logger.error(`Failed to update autoplay: ${error.message}`);
      throw error;
    }
  }
}

export default GuildDB;
