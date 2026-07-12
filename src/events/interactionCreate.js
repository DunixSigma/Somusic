import Logger from '../logs/Logger.js';
import { PermissionFlagsBits } from 'discord.js';

const logger = new Logger('InteractionCreate');

export default {
  name: 'interactionCreate',
  async execute(client, interaction) {
    try {
      if (interaction.isChatInputCommand()) {
        const command = client.handlers.commandHandler.getCommand(interaction.commandName);
        
        if (!command) {
          return logger.warn(`Command ${interaction.commandName} not found`);
        }

        await command.execute(interaction, client);
      } 
      else if (interaction.isButton()) {
        const button = client.handlers.buttonHandler.getButton(interaction.customId);
        
        if (!button) {
          return logger.warn(`Button ${interaction.customId} not found`);
        }

        await button.execute(interaction, client);
      } 
      else if (interaction.isModalSubmit()) {
        const modal = client.handlers.modalHandler.getModal(interaction.customId);
        
        if (!modal) {
          return logger.warn(`Modal ${interaction.customId} not found`);
        }

        await modal.execute(interaction, client);
      } 
      else if (interaction.isStringSelectMenu()) {
        const menu = client.handlers.selectMenuHandler.getMenu(interaction.customId);
        
        if (!menu) {
          return logger.warn(`Select menu ${interaction.customId} not found`);
        }

        await menu.execute(interaction, client);
      }
    } catch (error) {
      logger.error(`Error in interaction: ${error.message}`);
      
      try {
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            embeds: [{
              color: 0xff0000,
              title: '❌ Error',
              description: 'An error occurred while processing your request'
            }],
            ephemeral: true
          });
        } else {
          await interaction.reply({
            embeds: [{
              color: 0xff0000,
              title: '❌ Error',
              description: 'An error occurred while processing your request'
            }],
            ephemeral: true
          });
        }
      } catch (replyError) {
        logger.error(`Failed to send error message: ${replyError.message}`);
      }
    }
  }
};
