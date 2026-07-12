import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Altera o volume')
    .addIntegerOption(option => option.setName('nivel').setDescription('Volume 0-100').setRequired(true)),
  
  async execute(interaction) {
    try {
      const volume = interaction.options.getInteger('nivel');
      await interaction.reply({ content: `Volume: ${volume}%` });
      logger.music(`Volume: ${volume}%`);
    } catch (error) {
      logger.error('Erro em volume:', error);
    }
  }
};

export default command;