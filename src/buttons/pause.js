import { logger } from '../logs/logger.js';

const button = {
  customId: 'music_pause',
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Pause pressionado', ephemeral: true });
      logger.music('Button: Pause');
    } catch (error) {
      logger.error('Erro em button pause:', error);
    }
  }
};

export default button;