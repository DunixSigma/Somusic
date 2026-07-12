import { database } from './database.js';
import { logger } from '../logs/logger.js';

export const djPermissions = {
  async getPermissions(guildId, userId) {
    try {
      let perms = await database.get(
        'SELECT * FROM dj_permissions WHERE guild_id = ? AND user_id = ?',
        [guildId, userId]
      );
      
      if (!perms) {
        await database.run(
          'INSERT INTO dj_permissions (guild_id, user_id) VALUES (?, ?)',
          [guildId, userId]
        );
        
        perms = await database.get(
          'SELECT * FROM dj_permissions WHERE guild_id = ? AND user_id = ?',
          [guildId, userId]
        );
      }
      
      return perms;
    } catch (error) {
      logger.error('Erro ao obter permissões DJ', error);
      return null;
    }
  },

  async setPermission(guildId, userId, permissionName, value) {
    try {
      const validPerms = ['can_skip', 'can_pause', 'can_queue', 'can_remove', 'can_loop', 'can_shuffle', 'can_volume'];
      
      if (!validPerms.includes(permissionName)) {
        logger.warn(`Permissão inválida: ${permissionName}`);
        return false;
      }
      
      const perms = await this.getPermissions(guildId, userId);
      
      if (perms) {
        await database.run(
          `UPDATE dj_permissions SET ${permissionName} = ? WHERE guild_id = ? AND user_id = ?`,
          [value ? 1 : 0, guildId, userId]
        );
      }
      
      logger.database(`Permissão ${permissionName} definida para ${userId} em ${guildId}`);
      return true;
    } catch (error) {
      logger.error('Erro ao definir permissão DJ', error);
      return false;
    }
  },

  async canSkip(guildId, userId) {
    const perms = await this.getPermissions(guildId, userId);
    return perms?.can_skip || false;
  },

  async canPause(guildId, userId) {
    const perms = await this.getPermissions(guildId, userId);
    return perms?.can_pause || false;
  },

  async canQueue(guildId, userId) {
    const perms = await this.getPermissions(guildId, userId);
    return perms?.can_queue || false;
  },

  async canRemove(guildId, userId) {
    const perms = await this.getPermissions(guildId, userId);
    return perms?.can_remove || false;
  },

  async canLoop(guildId, userId) {
    const perms = await this.getPermissions(guildId, userId);
    return perms?.can_loop || false;
  },

  async canShuffle(guildId, userId) {
    const perms = await this.getPermissions(guildId, userId);
    return perms?.can_shuffle || false;
  },

  async canVolume(guildId, userId) {
    const perms = await this.getPermissions(guildId, userId);
    return perms?.can_volume || false;
  }
};
