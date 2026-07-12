import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('lyrics')
    .setDescription('Mostra as letras da musica'),
  
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Nenhuma musica tocando' });
      logger.music('Lyrics');
    } catch (error) {
      logger.error('Erro em lyrics:', error);
    }
  }
};

export default command;