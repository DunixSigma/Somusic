import { logger } from '../logs/logger.js';

const button = {
  customId: 'music_stop',
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Stop pressionado', ephemeral: true });
      logger.music('Button: Stop');
    } catch (error) {
      logger.error('Erro em button stop:', error);
    }
  }
};

export default button;