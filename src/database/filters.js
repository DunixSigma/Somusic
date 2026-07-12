import { database } from './database.js';
import { logger } from '../logs/logger.js';

export const filters = {
  async getFilters(guildId) {
    try {
      let filters = await database.get(
        'SELECT * FROM filters WHERE guild_id = ?',
        [guildId]
      );
      
      if (!filters) {
        await database.run(
          'INSERT INTO filters (guild_id) VALUES (?)',
          [guildId]
        );
        
        filters = await database.get(
          'SELECT * FROM filters WHERE guild_id = ?',
          [guildId]
        );
      }
      
      return filters;
    } catch (error) {
      logger.error('Erro ao obter filtros', error);
      return null;
    }
  },

  async updateFilter(guildId, filterName, value) {
    try {
      const validFilters = ['bassboost', 'nightcore', 'vaporwave', 'pop', 'phonk', 'treble', 'vibrato', 'tremolo', 'pitch', 'speed'];
      
      if (!validFilters.includes(filterName)) {
        logger.warn(`Filtro inválido: ${filterName}`);
        return false;
      }
      
      await database.run(
        `UPDATE filters SET ${filterName} = ?, updated_at = CURRENT_TIMESTAMP WHERE guild_id = ?`,
        [value, guildId]
      );
      
      logger.database(`Filtro ${filterName} atualizado para ${value} na guilda ${guildId}`);
      return true;
    } catch (error) {
      logger.error('Erro ao atualizar filtro', error);
      return false;
    }
  },

  async resetFilters(guildId) {
    try {
      await database.run(
        `UPDATE filters SET bassboost = 0, nightcore = 0, vaporwave = 0, pop = 0, phonk = 0, 
         treble = 0, vibrato = 0, tremolo = 0, pitch = 1.0, speed = 1.0, updated_at = CURRENT_TIMESTAMP 
         WHERE guild_id = ?`,
        [guildId]
      );
      
      logger.database(`Filtros resetados para a guilda ${guildId}`);
      return true;
    } catch (error) {
      logger.error('Erro ao resetar filtros', error);
      return false;
    }
  }
};
