import { logger } from '../logs/logger.js';

const button = {
  customId: 'music_shuffle',
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Shuffle ativado', ephemeral: true });
      logger.music('Button: Shuffle');
    } catch (error) {
      logger.error('Erro em button shuffle:', error);
    }
  }
};

export default button;