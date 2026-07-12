import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Ativa loop')
    .addStringOption(option =>
      option.setName('tipo')
        .setDescription('Tipo de loop')
        .setRequired(true)
        .addChoices(
          { name: 'Off', value: 'off' },
          { name: 'Track', value: 'track' },
          { name: 'Queue', value: 'queue' }
        )
    ),
  
  async execute(interaction) {
    try {
      const tipo = interaction.options.getString('tipo');
      await interaction.reply({ content: `Loop: ${tipo}` });
      logger.music(`Loop: ${tipo}`);
    } catch (error) {
      logger.error('Erro em loop:', error);
    }
  }
};

export default command;