import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('favorite')
    .setDescription('Adiciona musica aos favoritos'),
  
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Favorito adicionado!' });
      logger.music('Favorite');
    } catch (error) {
      logger.error('Erro em favorite:', error);
    }
  }
};

export default command;