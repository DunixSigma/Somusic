import Logger from '../logs/Logger.js';

const logger = new Logger('VolumeDownButton');

export default {
  id: 'btn_volume_down',
  async execute(interaction, client) {
    try {
      await interaction.deferReply({ ephemeral: true });

      logger.info(`Volume down button pressed by ${interaction.user.username}`);

      await interaction.editReply({
        embeds: [{
          color: 0x00ff00,
          title: '🔉 Volume -',
          description: 'Volume decreased'
        }]
      });
    } catch (error) {
      logger.error(`Error in volume down button: ${error.message}`);
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
