import { logger } from '../logs/logger.js';

const selectMenu = {
  customId: 'select_music_filter',
  async execute(interaction) {
    try {
      const filter = interaction.values[0];
      await interaction.reply({ content: `Filtro ${filter} aplicado`, ephemeral: true });
      logger.music(`Select Menu: Filter ${filter}`);
    } catch (error) {
      logger.error('Erro em select_music_filter:', error);
    }
  }
};

export default selectMenu;