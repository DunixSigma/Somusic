import { logger } from '../logs/logger.js';

const filters = new Map();

export const applyFilter = async (player, filterName, value = true) => {
  try {
    if (!player) return false;

    const guildFilters = filters.get(player.guildId) || {};
    
    switch (filterName) {
      case 'bassboost':
        guildFilters.bassboost = value;
        break;
      case 'nightcore':
        guildFilters.nightcore = value;
        break;
      case 'vaporwave':
        guildFilters.vaporwave = value;
        break;
      case 'pop':
        guildFilters.pop = value;
        break;
      case 'phonk':
        guildFilters.phonk = value;
        break;
      default:
        return false;
    }

    filters.set(player.guildId, guildFilters);
    logger.music(`Filtro ${filterName} aplicado`);
    return true;
  } catch (error) {
    logger.error('Erro ao aplicar filtro:', error);
    return false;
  }
};

export const removeFilter = async (player, filterName) => {
  try {
    if (!player) return false;

    const guildFilters = filters.get(player.guildId) || {};
    delete guildFilters[filterName];

    filters.set(player.guildId, guildFilters);
    logger.music(`Filtro ${filterName} removido`);
    return true;
  } catch (error) {
    logger.error('Erro ao remover filtro:', error);
    return false;
  }
};

export const getFiltersForGuild = (guildId) => {
  return filters.get(guildId) || {};
};

export const clearFilters = (guildId) => {
  filters.delete(guildId);
  logger.music(`Filtros limpos para guilda ${guildId}`);
};
