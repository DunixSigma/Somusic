import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('move')
    .setDescription('Move uma musica na fila')
    .addIntegerOption(option => option.setName('de').setDescription('De').setRequired(true))
    .addIntegerOption(option => option.setName('para').setDescription('Para').setRequired(true)),
  
  async execute(interaction) {
    try {
      const de = interaction.options.getInteger('de');
      const para = interaction.options.getInteger('para');
      await interaction.reply({ content: `Musica movida de ${de} para ${para}` });
      logger.music(`Move: ${de} -> ${para}`);
    } catch (error) {
      logger.error('Erro em move:', error);
    }
  }
};

export default command;