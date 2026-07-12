import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove uma musica da fila')
    .addIntegerOption(option => option.setName('posicao').setDescription('Posicao na fila').setRequired(true)),
  
  async execute(interaction) {
    try {
      const posicao = interaction.options.getInteger('posicao');
      await interaction.reply({ content: `Removido da fila: posicao ${posicao}` });
      logger.music(`Remove: ${posicao}`);
    } catch (error) {
      logger.error('Erro em remove:', error);
    }
  }
};

export default command;