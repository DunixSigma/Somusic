import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Embaralha a fila'),
  
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Fila embaralhada' });
      logger.music('Shuffle');
    } catch (error) {
      logger.error('Erro em shuffle:', error);
    }
  }
};

export default command;