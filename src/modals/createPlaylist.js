import { logger } from '../logs/logger.js';

const modal = {
  customId: 'create_playlist_modal',
  async execute(interaction) {
    try {
      const playlistName = interaction.fields.getTextInputValue('playlist_name');
      const description = interaction.fields.getTextInputValue('playlist_desc');
      await interaction.reply({ content: `Playlist criada: ${playlistName}`, ephemeral: true });
      logger.music(`Modal: Create Playlist ${playlistName}`);
    } catch (error) {
      logger.error('Erro em modal create_playlist:', error);
    }
  }
};

export default modal;