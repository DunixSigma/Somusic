import { Events } from 'discord.js';
import { logger } from '../logs/logger.js';

const event = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    if (!interaction.guild) return;

    // Pegar collections do client
    const { commands, buttons, modals, selectMenus } = client;

    if (interaction.isChatInputCommand()) {
      const command = commands.get(interaction.commandName);
      if (!command) return logger.warn(`Comando nao encontrado: ${interaction.commandName}`);

      try {
        await command.execute(interaction, client);
      } catch (error) {
        logger.error(`Erro ao executar ${interaction.commandName}:`, error);
        await interaction.reply({ content: 'Erro ao executar comando!', ephemeral: true }).catch(() => {});
      }
    }

    if (interaction.isButton()) {
      const button = buttons.get(interaction.customId);
      if (!button) return;

      try {
        await button.execute(interaction, client);
      } catch (error) {
        logger.error(`Erro no botao ${interaction.customId}:`, error);
      }
    }

    if (interaction.isModalSubmit()) {
      const modal = modals.get(interaction.customId);
      if (!modal) return;

      try {
        await modal.execute(interaction, client);
      } catch (error) {
        logger.error(`Erro no modal ${interaction.customId}:`, error);
      }
    }

    if (interaction.isStringSelectMenu() || interaction.isChannelSelectMenu()) {
      const menu = selectMenus.get(interaction.customId);
      if (!menu) return;

      try {
        await menu.execute(interaction, client);
      } catch (error) {
        logger.error(`Erro no menu ${interaction.customId}:`, error);
      }
    }
  },
};

export default event;