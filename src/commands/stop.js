import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Para a musica'),
  
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Parado' });
      logger.music('Parado');
    } catch (error) {
      logger.error('Erro em stop:', error);
    }
  }
};

export default command;