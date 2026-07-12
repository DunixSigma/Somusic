import { REST, Routes } from 'discord.js';
import config from '../../config.js';
import { logger } from '../logs/logger.js';

export const deployCommands = async (client, commands) => {
  const rest = new REST({ version: '10' }).setToken(config.discord.token);
  const commandsArray = Array.from(commands.values()).map(cmd => cmd.data.toJSON());

  try {
    logger.info('Registrando comandos slash...');
    
    // Se GUILD_ID estiver definido, registra apenas naquele servidor (desenvolvimento)
    if (config.discord.guildId) {
      await rest.put(
        Routes.applicationGuildCommands(config.discord.clientId, config.discord.guildId),
        { body: commandsArray }
      );
      logger.success(`${commandsArray.length} comando(s) registrado(s) no servidor`);
    } else {
      // Caso contrário, registra globalmente (produção)
      await rest.put(
        Routes.applicationCommands(config.discord.clientId),
        { body: commandsArray }
      );
      logger.success(`${commandsArray.length} comando(s) registrado(s) globalmente`);
    }
  } catch (error) {
    logger.error('Erro ao registrar comandos:', error);
  }
};
