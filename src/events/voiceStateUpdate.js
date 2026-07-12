import { Events } from 'discord.js';
import { logger } from '../logs/logger.js';
import { destroyPlayer } from '../music/player.js';
import { deleteQueue } from '../music/queue.js';

const event = {
  name: Events.VoiceStateUpdate,
  async execute(oldState, newState) {
    try {
      // Se o bot foi desconectado
      if (oldState.member?.id === oldState.client.user.id && oldState.channelId && !newState.channelId) {
        destroyPlayer(oldState.guild.id);
        deleteQueue(oldState.guild.id);
        logger.music(`Bot desconectado do servidor ${oldState.guild.id}`);
      }
    } catch (error) {
      logger.error('Erro ao processar mudança de voz:', error);
    }
  },
};

export default event;
