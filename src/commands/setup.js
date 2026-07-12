import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Configura o painel de musica'),
  
  async execute(interaction) {
    try {
      if (!interaction.member.permissions.has('ManageGuild')) {
        return interaction.reply({
          content: 'Sem permissao',
          ephemeral: true
        });
      }
      await interaction.reply({ content: 'Setup iniciado', ephemeral: true });
      logger.success('Setup executado');
    } catch (error) {
      logger.error('Erro em setup:', error);
      await interaction.reply({ content: 'Erro', ephemeral: true });
    }
  }
};

export default command;