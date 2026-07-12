import { SlashCommandBuilder } from 'discord.js';
import Logger from '../logs/Logger.js';

const logger = new Logger('QueueCommand');

export default {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Show the music queue')
    .addIntegerOption(option =>
      option
        .setName('page')
        .setDescription('Page number')
        .setRequired(false)
        .setMinValue(1)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const page = interaction.options.getInteger('page') || 1;

      logger.info(`Queue request from ${interaction.user.username} - Page ${page}`);

      await interaction.editReply({
        embeds: [{
          color: 0x0099ff,
          title: '📜 Queue',
          description: 'Queue is empty',
          footer: { text: `Page ${page}` }
        }]
      });
    } catch (error) {
      logger.error(`Error in queue command: ${error.message}`);
      await interaction.editReply({
        embeds: [{
          color: 0xff0000,
          title: '❌ Error',
          description: 'An error occurred while executing the command'
        }]
      }).catch(() => {});
    }
  }
};
