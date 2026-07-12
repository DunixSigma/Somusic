import { SlashCommandBuilder } from 'discord.js';
import Logger from '../logs/Logger.js';

const logger = new Logger('SkipCommand');

export default {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip to the next song'),
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

      logger.info(`Skip request from ${interaction.user.username}`);

      await interaction.editReply({
        embeds: [{
          color: 0x00ff00,
          title: '⏭️ Skipped',
          description: 'Skipped to the next song'
        }]
      });
    } catch (error) {
      logger.error(`Error in skip command: ${error.message}`);
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
