import { SlashCommandBuilder } from 'discord.js';
import Logger from '../logs/Logger.js';

const logger = new Logger('NowPlayingCommand');

export default {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Show the current playing song'),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      logger.info(`Now playing request from ${interaction.user.username}`);

      await interaction.editReply({
        embeds: [{
          color: 0x0099ff,
          title: '🎵 Now Playing',
          description: 'No song is currently playing'
        }]
      });
    } catch (error) {
      logger.error(`Error in nowplaying command: ${error.message}`);
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
