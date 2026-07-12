import { logger } from '../logs/logger.js';

const modal = {
  customId: 'search_music_modal',
  async execute(interaction) {
    try {
      const query = interaction.fields.getTextInputValue('music_query');
      await interaction.reply({ content: `Procurando: ${query}`, ephemeral: true });
      logger.music(`Modal: Search ${query}`);
    } catch (error) {
      logger.error('Erro em modal search:', error);
    }
  }
};

export default modal;