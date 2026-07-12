import { logger } from '../logs/logger.js';

const button = {
  customId: 'music_skip',
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Skip pressionado', ephemeral: true });
      logger.music('Button: Skip');
    } catch (error) {
      logger.error('Erro em button skip:', error);
    }
  }
};

export default button;