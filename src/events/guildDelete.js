import { Events } from 'discord.js';
import { logger } from '../logs/logger.js';
import { destroyPlayer } from '../music/player.js';
import { deleteQueue } from '../music/queue.js';

const event = {
  name: Events.GuildDelete,
  async execute(guild) {
    try {
      logger.warn(`Bot removido do servidor: ${guild.name}`);
      
      destroyPlayer(guild.id);
      deleteQueue(guild.id);
    } catch (error) {
      logger.error('Erro ao processar remoção de guilda:', error);
    }
  },
};

export default event;
