import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('seek')
    .setDescription('Avanca ou retrocede na musica')
    .addIntegerOption(option => option.setName('segundos').setDescription('Segundos').setRequired(true)),
  
  async execute(interaction) {
    try {
      const segundos = interaction.options.getInteger('segundos');
      await interaction.reply({ content: `Posicao: ${segundos}s` });
      logger.music(`Seek: ${segundos}s`);
    } catch (error) {
      logger.error('Erro em seek:', error);
    }
  }
};

export default command;