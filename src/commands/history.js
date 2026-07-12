import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('history')
    .setDescription('Mostra seu historico de musicas'),
  
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Historico vazio' });
      logger.music('History');
    } catch (error) {
      logger.error('Erro em history:', error);
    }
  }
};

export default command;