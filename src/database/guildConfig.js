import { database } from './database.js';
import { logger } from '../logs/logger.js';

export const guildConfig = {
  async getConfig(guildId) {
    try {
      return await database.get(
        'SELECT * FROM guild_config WHERE guild_id = ?',
        [guildId]
      );
    } catch (error) {
      logger.error('Erro ao obter configurações da guilda', error);
      return null;
    }
  },

  async setConfig(guildId, config) {
    try {
      const existing = await this.getConfig(guildId);
      
      if (existing) {
        const updates = Object.keys(config)
          .map(key => `${key} = ?`)
          .join(', ');
        
        const values = [...Object.values(config), guildId];
        
        await database.run(
          `UPDATE guild_config SET ${updates}, updated_at = CURRENT_TIMESTAMP WHERE guild_id = ?`,
          values
        );
      } else {
        const keys = Object.keys(config).join(', ');
        const placeholders = Object.keys(config).map(() => '?').join(', ');
        
        await database.run(
          `INSERT INTO guild_config (guild_id, ${keys}) VALUES (?, ${placeholders})`,
          [guildId, ...Object.values(config)]
        );
      }
      
      logger.database(`Configurações da guilda ${guildId} atualizadas`);
      return true;
    } catch (error) {
      logger.error('Erro ao atualizar configurações da guilda', error);
      return false;
    }
  },

  async setPanelChannel(guildId, channelId, messageId) {
    try {
      await this.setConfig(guildId, {
        panel_channel_id: channelId,
        panel_message_id: messageId
      });
      return true;
    } catch (error) {
      logger.error('Erro ao definir canal do painel', error);
      return false;
    }
  },

  async getPanelInfo(guildId) {
    try {
      const config = await this.getConfig(guildId);
      if (!config) return null;
      
      return {
        channelId: config.panel_channel_id,
        messageId: config.panel_message_id
      };
    } catch (error) {
      logger.error('Erro ao obter informações do painel', error);
      return null;
    }
  },

  async setVolume(guildId, volume) {
    try {
      await this.setConfig(guildId, { volume });
      return true;
    } catch (error) {
      logger.error('Erro ao definir volume', error);
      return false;
    }
  },

  async setLoop(guildId, loopMode) {
    try {
      await this.setConfig(guildId, { loop_mode: loopMode });
      return true;
    } catch (error) {
      logger.error('Erro ao definir loop', error);
      return false;
    }
  },

  async setAutoplay(guildId, autoplay) {
    try {
      await this.setConfig(guildId, { autoplay: autoplay ? 1 : 0 });
      return true;
    } catch (error) {
      logger.error('Erro ao definir autoplay', error);
      return false;
    }
  },

  async setDJRole(guildId, roleId) {
    try {
      await this.setConfig(guildId, { dj_role_id: roleId });
      return true;
    } catch (error) {
      logger.error('Erro ao definir cargo DJ', error);
      return false;
    }
  }
};
