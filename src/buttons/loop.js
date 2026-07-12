import { logger } from '../logs/logger.js';

const button = {
  customId: 'music_loop',
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Loop ativado', ephemeral: true });
      logger.music('Button: Loop');
    } catch (error) {
      logger.error('Erro em button loop:', error);
    }
  }
};

export default button;