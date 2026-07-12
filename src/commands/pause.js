import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pausa a musica'),
  
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Pausado' });
      logger.music('Pausado');
    } catch (error) {
      logger.error('Erro em pause:', error);
    }
  }
};

export default command;