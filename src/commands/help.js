import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../logs/logger.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Mostra ajuda dos comandos'),
  
  async execute(interaction) {
    try {
      const help = `
**Comandos de Musica:**
/play - Toca uma musica
/pause - Pausa a musica
/resume - Retoma a musica
/skip - Pula para proxima
/stop - Para a reproducao
/queue - Mostra a fila
/volume - Altera volume
/loop - Ativa loop
/shuffle - Embaralha fila
/seek - Avanca/retrocede
/nowplaying - Musica atual
/lyrics - Letras da musica
/favorite - Favoritos
/history - Historico
/playlist - Gerencia playlists
/remove - Remove da fila
/move - Move na fila
/clearqueue - Limpa fila
/filter - Aplica filtros
/setup - Configura painel
      `;
      await interaction.reply({ content: help, ephemeral: true });
      logger.music('Help');
    } catch (error) {
      logger.error('Erro em help:', error);
    }
  }
};

export default command;