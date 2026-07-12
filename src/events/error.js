import { Events } from 'discord.js';
import { logger } from '../logs/logger.js';

const event = {
  name: Events.Error,
  async execute(error) {
    logger.error('Erro do Discord Client:', error);
  },
};

export default event;
