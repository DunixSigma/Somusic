import { REST, Routes } from 'discord.js';
import { config } from '../../config.js';
import { logger } from '../logs/logger.js';

export const deployCommands = async (commands) => {
  try {
    const rest = new REST({ version: '10' }).setToken(config.bot.token);
    
    const commandsData = Array.from(commands.values()).map(cmd => cmd.data.toJSON());
    
    logger.info(`Registrando ${commandsData.length} comando(s) slash...`);
    
    await rest.put(
      Routes.applicationCommands(config.bot.clientId),
      { body: commandsData }
    );
    
    logger.success(`${commandsData.length} comando(s) registrado(s) com sucesso`);
    return true;
  } catch (error) {
    logger.error('Erro ao registrar comandos:', error);
    return false;
  }
};
