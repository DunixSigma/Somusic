import { SlashCommandBuilder } from 'discord.js';
import Logger from '../logs/Logger.js';

const logger = new Logger('VolumeCommand');

export default {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Set the music volume')
    .addIntegerOption(option =>
      option
        .setName('level')
        .setDescription('Volume level (0-100)')
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(100)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const volume = interaction.options.getInteger('level');

      logger.info(`Volume set to ${volume}% by ${interaction.user.username}`);

      await interaction.editReply({
        embeds: [{
          color: 0x00ff00,
          title: '🔊 Volume',
          description: `Volume set to ${volume}%`
        }]
      });
    } catch (error) {
      logger.error(`Error in volume command: ${error.message}`);
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
