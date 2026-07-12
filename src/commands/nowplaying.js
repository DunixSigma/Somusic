import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Mostra a musica atual'),
  
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Nenhuma musica tocando' });
      logger.music('Now Playing');
    } catch (error) {
      logger.error('Erro em nowplaying:', error);
    }
  }
};

export default command;