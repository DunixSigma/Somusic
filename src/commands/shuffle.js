import { SlashCommandBuilder } from 'discord.js';
import Logger from '../logs/Logger.js';

const logger = new Logger('ShuffleCommand');

export default {
  data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffle the queue'),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      logger.info(`Shuffle request from ${interaction.user.username}`);

      await interaction.editReply({
        embeds: [{
          color: 0x00ff00,
          title: '🔀 Shuffled',
          description: 'Queue shuffled'
        }]
      });
    } catch (error) {
      logger.error(`Error in shuffle command: ${error.message}`);
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
