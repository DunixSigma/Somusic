import { SlashCommandBuilder } from 'discord.js';
import Logger from '../logs/Logger.js';

const logger = new Logger('StopCommand');

export default {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop the music and leave the voice channel'),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const member = interaction.guild.members.cache.get(interaction.user.id);

      if (!member.voice.channel) {
        return await interaction.editReply({
          embeds: [{
            color: 0xff0000,
            title: '❌ Error',
            description: 'You must be in a voice channel'
          }]
        });
      }

      logger.info(`Stop request from ${interaction.user.username}`);

      await interaction.editReply({
        embeds: [{
          color: 0x00ff00,
          title: '⏹️ Stopped',
          description: 'Music stopped and bot left the channel'
        }]
      });
    } catch (error) {
      logger.error(`Error in stop command: ${error.message}`);
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
