import { SlashCommandBuilder } from 'discord.js';
import Logger from '../logs/Logger.js';

const logger = new Logger('HelpCommand');

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show available commands'),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      logger.info(`Help request from ${interaction.user.username}`);

      const commands = [
        '**Music Commands:**',
        '/play - Play a song',
        '/skip - Skip to next song',
        '/pause - Pause the music',
        '/resume - Resume the music',
        '/stop - Stop the music',
        '/queue - Show queue',
        '/nowplaying - Show current song',
        '/volume - Set volume',
        '/loop - Set loop mode',
        '/shuffle - Shuffle queue',
        '/help - Show this message'
      ].join('\n');

      await interaction.editReply({
        embeds: [{
          color: 0x0099ff,
          title: '📚 Help',
          description: commands
        }]
      });
    } catch (error) {
      logger.error(`Error in help command: ${error.message}`);
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
