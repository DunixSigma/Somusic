import Logger from '../logs/Logger.js';

const logger = new Logger('PauseButton');

export default {
  id: 'btn_pause',
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

      logger.info(`Pause button pressed by ${interaction.user.username}`);

      await interaction.editReply({
        embeds: [{
          color: 0x00ff00,
          title: '⏸️ Paused',
          description: 'Music paused'
        }]
      });
    } catch (error) {
      logger.error(`Error in pause button: ${error.message}`);
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
