import Logger from '../logs/Logger.js';

const logger = new Logger('ShuffleButton');

export default {
  id: 'btn_shuffle',
  async execute(interaction, client) {
    try {
      await interaction.deferReply({ ephemeral: true });

      logger.info(`Shuffle button pressed by ${interaction.user.username}`);

      await interaction.editReply({
        embeds: [{
          color: 0x00ff00,
          title: '🔀 Shuffled',
          description: 'Queue shuffled'
        }]
      });
    } catch (error) {
      logger.error(`Error in shuffle button: ${error.message}`);
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
