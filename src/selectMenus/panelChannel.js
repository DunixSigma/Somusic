import { logger } from '../logs/logger.js';

const selectMenu = {
  customId: 'select_panel_channel',
  async execute(interaction) {
    try {
      const channel = interaction.values[0];
      await interaction.reply({ content: `Painel configurado no canal <#${channel}>`, ephemeral: true });
      logger.music(`Select Menu: Panel channel ${channel}`);
    } catch (error) {
      logger.error('Erro em select_panel_channel:', error);
    }
  }
};

export default selectMenu;