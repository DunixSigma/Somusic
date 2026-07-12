import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const createMusicControlButtons = () => {
  return new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('music_previous')
        .setLabel('⏮️ Anterior')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('music_play')
        .setLabel('▶️ Play')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('music_pause')
        .setLabel('⏸️ Pausa')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('music_skip')
        .setLabel('⏭️ Pular')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('music_stop')
        .setLabel('⏹️ Parar')
        .setStyle(ButtonStyle.Danger)
    );
};

export const createSecondaryMusicButtons = () => {
  return new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('music_shuffle')
        .setLabel('🔀 Shuffle')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('music_loop')
        .setLabel('🔁 Loop')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('music_queue')
        .setLabel('📜 Fila')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('music_favorite')
        .setLabel('❤️ Favoritos')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('music_filters')
        .setLabel('🎛️ Filtros')
        .setStyle(ButtonStyle.Secondary)
    );
};

export const createVolumeButtons = () => {
  return new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('volume_decrease')
        .setLabel('🔉 -10')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('volume_display')
        .setLabel('🔊 Volume')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId('volume_increase')
        .setLabel('🔊 +10')
        .setStyle(ButtonStyle.Secondary)
    );
};

export const createPlaylistButtons = () => {
  return new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('playlist_create')
        .setLabel('➕ Criar')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('playlist_list')
        .setLabel('📋 Listar')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('playlist_delete')
        .setLabel('🗑️ Deletar')
        .setStyle(ButtonStyle.Danger)
    );
};
