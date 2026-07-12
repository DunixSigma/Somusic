import Logger from '../logs/Logger.js';

const logger = new Logger('PreviousButton');

export default {
  id: 'btn_previous',
  async execute(interaction, client) {
    try {
      await interaction.deferReply({ ephemeral: true });

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

      logger.info(`Previous button pressed by ${interaction.user.username}`);

      await interaction.editReply({
        embeds: [{
          color: 0x00ff00,
          title: '⏮️ Previous',
          description: 'Playing previous song'
        }]
      });
    } catch (error) {
      logger.error(`Error in previous button: ${error.message}`);
      await interaction.editReply({
        embeds: [{
          color: 0xff0000,
          title: '❌ Error',
          description: 'An error occurred'
        }]
      }).catch(() => {});
    }
  }
};
