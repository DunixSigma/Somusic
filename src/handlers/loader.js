import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../logs/logger.js';
import config from '../../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Carregar comandos do diretório
 */
export const loadCommands = async () => {
  const { Collection } = await import('discord.js');
  const commands = new Collection();
  const commandsPath = config.paths.commands;

  try {
    // Ler todas as subpastas
    const folders = fs.readdirSync(commandsPath).filter(file => 
      fs.statSync(path.join(commandsPath, file)).isDirectory()
    );

    for (const folder of folders) {
      const files = fs.readdirSync(path.join(commandsPath, folder)).filter(file => file.endsWith('.js'));
      
      for (const file of files) {
        const filePath = path.join(commandsPath, folder, file);
        try {
          const { default: command } = await import(`file://${filePath}`);
          if (command.data && command.execute) {
            commands.set(command.data.name, command);
            logger.command(`Comando carregado: ${command.data.name}`);
          }
        } catch (error) {
          logger.error(`Erro ao carregar comando ${file}:`, error);
        }
      }
    }
  } catch (error) {
    logger.error('Erro ao carregar comandos:', error);
  }

  return commands;
};

/**
 * Carregar botões do diretório
 */
export const loadButtons = async () => {
  const { Collection } = await import('discord.js');
  const buttons = new Collection();
  const buttonsPath = config.paths.buttons;

  try {
    const files = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

    for (const file of files) {
      const filePath = path.join(buttonsPath, file);
      try {
        const { default: button } = await import(`file://${filePath}`);
        if (button.customId && button.execute) {
          buttons.set(button.customId, button);
          logger.command(`Botão carregado: ${button.customId}`);
        }
      } catch (error) {
        logger.error(`Erro ao carregar botão ${file}:`, error);
      }
    }
  } catch (error) {
    logger.error('Erro ao carregar botões:', error);
  }

  return buttons;
};

/**
 * Carregar modals do diretório
 */
export const loadModals = async () => {
  const { Collection } = await import('discord.js');
  const modals = new Collection();
  const modalsPath = config.paths.modals;

  try {
    const files = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'));

    for (const file of files) {
      const filePath = path.join(modalsPath, file);
      try {
        const { default: modal } = await import(`file://${filePath}`);
        if (modal.customId && modal.execute) {
          modals.set(modal.customId, modal);
          logger.command(`Modal carregado: ${modal.customId}`);
        }
      } catch (error) {
        logger.error(`Erro ao carregar modal ${file}:`, error);
      }
    }
  } catch (error) {
    logger.error('Erro ao carregar modals:', error);
  }

  return modals;
};

/**
 * Carregar select menus do diretório
 */
export const loadSelectMenus = async () => {
  const { Collection } = await import('discord.js');
  const selectMenus = new Collection();
  const selectMenusPath = config.paths.selectMenus;

  try {
    const files = fs.readdirSync(selectMenusPath).filter(file => file.endsWith('.js'));

    for (const file of files) {
      const filePath = path.join(selectMenusPath, file);
      try {
        const { default: selectMenu } = await import(`file://${filePath}`);
        if (selectMenu.customId && selectMenu.execute) {
          selectMenus.set(selectMenu.customId, selectMenu);
          logger.command(`Select Menu carregado: ${selectMenu.customId}`);
        }
      } catch (error) {
        logger.error(`Erro ao carregar select menu ${file}:`, error);
      }
    }
  } catch (error) {
    logger.error('Erro ao carregar select menus:', error);
  }

  return selectMenus;
};

/**
 * Carregar eventos do diretório
 */
export const loadEvents = async (client) => {
  const eventsPath = path.join(config.paths.events);

  try {
    const folders = fs.readdirSync(eventsPath).filter(file => 
      fs.statSync(path.join(eventsPath, file)).isDirectory()
    );

    for (const folder of folders) {
      const files = fs.readdirSync(path.join(eventsPath, folder)).filter(file => file.endsWith('.js'));
      
      for (const file of files) {
        const filePath = path.join(eventsPath, folder, file);
        try {
          const { default: event } = await import(`file://${filePath}`);
          if (event.name && event.execute) {
            if (event.once) {
              client.once(event.name, (...args) => event.execute(...args, client));
            } else {
              client.on(event.name, (...args) => event.execute(...args, client));
            }
            logger.event(`Evento carregado: ${event.name}`);
          }
        } catch (error) {
          logger.error(`Erro ao carregar evento ${file}:`, error);
        }
      }
    }
  } catch (error) {
    logger.error('Erro ao carregar eventos:', error);
  }
};
