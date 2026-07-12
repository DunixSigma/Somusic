import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Toca uma musica')
    .addStringOption(option => option.setName('musica').setDescription('Nome da musica').setRequired(true)),
  
  async execute(interaction) {
    try {
      await interaction.deferReply();
      const query = interaction.options.getString('musica');
      await interaction.editReply({ content: `Tocando: ${query}` });
      logger.music(`Play: ${query}`);
    } catch (error) {
      logger.error('Erro em play:', error);
      await interaction.editReply({ content: 'Erro' });
    }
  }
};

export default command;