import { logger } from '../logs/logger.js';

const button = {
  customId: 'volume_decrease',
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Volume diminuido', ephemeral: true });
      logger.music('Button: Volume -');
    } catch (error) {
      logger.error('Erro em button volume_decrease:', error);
    }
  }
};

export default button;