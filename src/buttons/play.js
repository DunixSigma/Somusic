import { logger } from '../logs/logger.js';

const button = {
  customId: 'music_play',
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Play pressionado', ephemeral: true });
      logger.music('Button: Play');
    } catch (error) {
      logger.error('Erro em button play:', error);
    }
  }
};

export default button;