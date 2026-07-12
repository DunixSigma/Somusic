import { Events } from 'discord.js';
import { logger } from '../logs/logger.js';
import { handleError } from '../utils/validators.js';

const event = {
  name: Events.InteractionCreate,
  async execute(interaction, client, commands, buttons, modals, selectMenus) {
    try {
      if (interaction.isChatInputCommand()) {
        const command = commands.get(interaction.commandName);
        if (!command) return;

        try {
          await command.execute(interaction, client);
        } catch (error) {
          logger.error(`Erro ao executar comando ${interaction.commandName}:`, error);
          await handleError(interaction, error);
        }
      }

      if (interaction.isButton()) {
        const button = buttons.get(interaction.customId);
        if (!button) return;

        try {
          await button.execute(interaction, client);
        } catch (error) {
          logger.error(`Erro ao executar botão ${interaction.customId}:`, error);
          await handleError(interaction, error);
        }
      }

      if (interaction.isModalSubmit()) {
        const modal = modals.get(interaction.customId);
        if (!modal) return;

        try {
          await modal.execute(interaction, client);
        } catch (error) {
          logger.error(`Erro ao executar modal ${interaction.customId}:`, error);
          await handleError(interaction, error);
        }
      }

      if (interaction.isStringSelectMenu() || interaction.isChannelSelectMenu()) {
        const menu = selectMenus.get(interaction.customId);
        if (!menu) return;

        try {
          await menu.execute(interaction, client);
        } catch (error) {
          logger.error(`Erro ao executar menu ${interaction.customId}:`, error);
          await handleError(interaction, error);
        }
      }
    } catch (error) {
      logger.error('Erro ao processar interação:', error);
    }
  },
};

export default event;
