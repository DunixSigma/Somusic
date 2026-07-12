import { logger } from '../logs/logger.js';

const button = {
  customId: 'volume_increase',
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Volume aumentado', ephemeral: true });
      logger.music('Button: Volume +');
    } catch (error) {
      logger.error('Erro em button volume_increase:', error);
    }
  }
};

export default button;