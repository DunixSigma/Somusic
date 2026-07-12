import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Pula musica'),
  
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'Pulado' });
      logger.music('Pulado');
    } catch (error) {
      logger.error('Erro em skip:', error);
    }
  }
};

export default command;