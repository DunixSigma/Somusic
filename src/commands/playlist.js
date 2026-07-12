import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('playlist')
    .setDescription('Gerencia suas playlists')
    .addSubcommand(sub =>
      sub.setName('criar')
        .setDescription('Cria uma nova playlist')
        .addStringOption(opt => opt.setName('nome').setDescription('Nome').setRequired(true))
    )
    .addSubcommand(sub =>
      sub.setName('listar')
        .setDescription('Lista suas playlists')
    )
    .addSubcommand(sub =>
      sub.setName('deletar')
        .setDescription('Deleta uma playlist')
        .addStringOption(opt => opt.setName('id').setDescription('ID').setRequired(true))
    ),
  
  async execute(interaction) {
    try {
      const subcmd = interaction.options.getSubcommand();
      await interaction.reply({ content: `Playlist: ${subcmd}` });
      logger.music(`Playlist: ${subcmd}`);
    } catch (error) {
      logger.error('Erro em playlist:', error);
    }
  }
};

export default command;