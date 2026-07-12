import { SlashCommandBuilder } from 'discord.js';
import Logger from '../logs/Logger.js';

const logger = new Logger('PlayCommand');

export default {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song')
    .addStringOption(option =>
      option
        .setName('query')
        .setDescription('Song name, URL or playlist')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const query = interaction.options.getString('query');
      const member = interaction.guild.members.cache.get(interaction.user.id);

      if (!member.voice.channel) {
        return await interaction.editReply({
          embeds: [{
            color: 0xff0000,
            title: '❌ Error',
            description: 'You must be in a voice channel to play music'
          }]
        });
      }

      logger.info(`Play request from ${interaction.user.username}: ${query}`);

      await interaction.editReply({
        embeds: [{
          color: 0x0099ff,
          title: '🎵 Playing',
          description: `Searching for: ${query}`
        }]
      });
    } catch (error) {
      logger.error(`Error in play command: ${error.message}`);
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
