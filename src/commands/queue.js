import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Mostra a fila'),
  
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Fila vazia' });
      logger.music('Queue');
    } catch (error) {
      logger.error('Erro em queue:', error);
    }
  }
};

export default command;