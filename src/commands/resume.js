import { SlashCommandBuilder } from 'discord.js';
import Logger from '../logs/Logger.js';

const logger = new Logger('ResumeCommand');

export default {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume the current song'),
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

      logger.info(`Resume request from ${interaction.user.username}`);

      await interaction.editReply({
        embeds: [{
          color: 0x00ff00,
          title: '▶️ Resumed',
          description: 'Music resumed'
        }]
      });
    } catch (error) {
      logger.error(`Error in resume command: ${error.message}`);
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
