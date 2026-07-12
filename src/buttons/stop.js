import Logger from '../logs/Logger.js';

const logger = new Logger('StopButton');

export default {
  id: 'btn_stop',
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

      logger.info(`Stop button pressed by ${interaction.user.username}`);

      await interaction.editReply({
        embeds: [{
          color: 0x00ff00,
          title: '⏹️ Stopped',
          description: 'Music stopped'
        }]
      });
    } catch (error) {
      logger.error(`Error in stop button: ${error.message}`);
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
