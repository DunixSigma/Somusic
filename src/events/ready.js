import Logger from '../logs/Logger.js';

const logger = new Logger('Ready');

export default {
  name: 'ready',
  once: true,
  async execute(client) {
    logger.success(`Bot logged in as ${client.user.tag}`);
    logger.info(`Serving ${client.guilds.cache.size} guilds`);
    
    client.user.setActivity('🎵 Music', { type: 'LISTENING' });
  }
};
