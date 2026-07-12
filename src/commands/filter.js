import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('filter')
    .setDescription('Aplica filtros')
    .addStringOption(option =>
      option.setName('tipo')
        .setDescription('Tipo de filtro')
        .setRequired(true)
        .addChoices(
          { name: 'Bass Boost', value: 'bassboost' },
          { name: 'Nightcore', value: 'nightcore' },
          { name: 'Vaporwave', value: 'vaporwave' },
          { name: 'Pop', value: 'pop' },
          { name: 'Phonk', value: 'phonk' }
        )
    ),
  
  async execute(interaction) {
    try {
      const tipo = interaction.options.getString('tipo');
      await interaction.reply({ content: `Filtro ${tipo} aplicado!` });
      logger.music(`Filter: ${tipo}`);
    } catch (error) {
      logger.error('Erro em filter:', error);
    }
  }
};

export default command;