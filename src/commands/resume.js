import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Retoma a musica'),
  
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Retomado' });
      logger.music('Retomado');
    } catch (error) {
      logger.error('Erro em resume:', error);
    }
  }
};

export default command;