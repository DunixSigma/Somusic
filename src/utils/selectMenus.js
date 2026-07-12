import { ChannelSelectMenuBuilder, ActionRowBuilder } from 'discord.js';

export const createChannelSelectMenu = () => {
  return new ActionRowBuilder()
    .addComponents(
      new ChannelSelectMenuBuilder()
        .setCustomId('select_panel_channel')
        .setPlaceholder('Selecione um canal de texto')
    );
};
