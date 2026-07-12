import { logger } from '../logs/logger.js';

const button = {
  customId: 'music_queue',
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Fila vazia', ephemeral: true });
      logger.music('Button: Queue');
    } catch (error) {
      logger.error('Erro em button queue:', error);
    }
  }
};

export default button;