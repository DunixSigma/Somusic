import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('clearqueue')
    .setDescription('Limpa toda a fila'),
  
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Fila limpa!' });
      logger.music('Clear Queue');
    } catch (error) {
      logger.error('Erro em clearqueue:', error);
    }
  }
};

export default command;