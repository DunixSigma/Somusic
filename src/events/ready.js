import { Events } from 'discord.js';
import { logger } from '../logs/logger.js';
import { initializeKazagumo } from '../music/player.js';

const event = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    logger.success(`Bot conectado como ${client.user.tag}`);
    logger.success(`Bot está em ${client.guilds.cache.size} servidor(es)`);
    
    await initializeKazagumo(client);
    
    client.user.setPresence({
      activities: [{ name: '🎵 Música | /help', type: 'PLAYING' }],
      status: 'online',
    });
  },
};

export default event;
