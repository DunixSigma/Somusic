import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';

export const createSearchModal = () => {
  return new ModalBuilder()
    .setCustomId('search_modal')
    .setTitle('🔍 Pesquisar Música')
    .addComponents(
      new ActionRowBuilder()
        .addComponents(
          new TextInputBuilder()
            .setCustomId('search_query')
            .setLabel('Nome ou URL da música')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setPlaceholder('Ex: Never Gonna Give You Up')
        )
    );
};

export const createPlaylistNameModal = () => {
  return new ModalBuilder()
    .setCustomId('playlist_name_modal')
    .setTitle('📋 Nome da Playlist')
    .addComponents(
      new ActionRowBuilder()
        .addComponents(
          new TextInputBuilder()
            .setCustomId('playlist_name')
            .setLabel('Nome da playlist')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMaxLength(100)
            .setPlaceholder('Ex: Minha Playlist')
        )
    );
};
