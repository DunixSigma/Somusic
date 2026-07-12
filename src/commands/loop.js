import { SlashCommandBuilder } from 'discord.js';
import Logger from '../logs/Logger.js';

const logger = new Logger('LoopCommand');

export default {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Set the loop mode')
    .addStringOption(option =>
      option
        .setName('mode')
        .setDescription('Loop mode')
        .setRequired(true)
        .addChoices(
          { name: 'Off', value: 'off' },
          { name: 'Track', value: 'track' },
          { name: 'Queue', value: 'queue' }
        )
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const mode = interaction.options.getString('mode');

      logger.info(`Loop mode set to ${mode} by ${interaction.user.username}`);

      const modeEmojis = { off: '🔁', track: '🔂', queue: '🔁' };

      await interaction.editReply({
        embeds: [{
          color: 0x00ff00,
          title: `${modeEmojis[mode]} Loop Mode`,
          description: `Loop mode set to ${mode}`
        }]
      });
    } catch (error) {
      logger.error(`Error in loop command: ${error.message}`);
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
