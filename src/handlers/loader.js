import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../logs/logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const loadEvents = async (client) => {
  const eventsPath = path.join(__dirname, '../events');
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    try {
      const filePath = path.join(eventsPath, file);
      const { default: event } = await import(`file://${filePath}`);

      if (event.name && typeof event.execute === 'function') {
        client.on(event.name, (...args) => event.execute(...args, client));
        logger.success(`Evento carregado: ${event.name}`);
      }
    } catch (error) {
      logger.error(`Erro ao carregar evento ${file}:`, error);
    }
  }
};

export const loadCommands = async () => {
  const commands = new Map();
  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    try {
      const filePath = path.join(commandsPath, file);
      const { default: command } = await import(`file://${filePath}`);

      if (command.data && typeof command.execute === 'function') {
        commands.set(command.data.name, command);
        logger.success(`Comando carregado: ${command.data.name}`);
      }
    } catch (error) {
      logger.error(`Erro ao carregar comando ${file}:`, error);
    }
  }

  return commands;
};

export const loadButtons = async () => {
  const buttons = new Map();
  const buttonsPath = path.join(__dirname, '../buttons');
  
  if (!fs.existsSync(buttonsPath)) {
    fs.mkdirSync(buttonsPath, { recursive: true });
    return buttons;
  }

  const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

  for (const file of buttonFiles) {
    try {
      const filePath = path.join(buttonsPath, file);
      const { default: button } = await import(`file://${filePath}`);

      if (button.customId && typeof button.execute === 'function') {
        buttons.set(button.customId, button);
        logger.success(`Botão carregado: ${button.customId}`);
      }
    } catch (error) {
      logger.error(`Erro ao carregar botão ${file}:`, error);
    }
  }

  return buttons;
};

export const loadModals = async () => {
  const modals = new Map();
  const modalsPath = path.join(__dirname, '../modals');
  
  if (!fs.existsSync(modalsPath)) {
    fs.mkdirSync(modalsPath, { recursive: true });
    return modals;
  }

  const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'));

  for (const file of modalFiles) {
    try {
      const filePath = path.join(modalsPath, file);
      const { default: modal } = await import(`file://${filePath}`);

      if (modal.customId && typeof modal.execute === 'function') {
        modals.set(modal.customId, modal);
        logger.success(`Modal carregado: ${modal.customId}`);
      }
    } catch (error) {
      logger.error(`Erro ao carregar modal ${file}:`, error);
    }
  }

  return modals;
};

export const loadSelectMenus = async () => {
  const menus = new Map();
  const menusPath = path.join(__dirname, '../selectMenus');
  
  if (!fs.existsSync(menusPath)) {
    fs.mkdirSync(menusPath, { recursive: true });
    return menus;
  }

  const menuFiles = fs.readdirSync(menusPath).filter(file => file.endsWith('.js'));

  for (const file of menuFiles) {
    try {
      const filePath = path.join(menusPath, file);
      const { default: menu } = await import(`file://${filePath}`);

      if (menu.customId && typeof menu.execute === 'function') {
        menus.set(menu.customId, menu);
        logger.success(`Menu carregado: ${menu.customId}`);
      }
    } catch (error) {
      logger.error(`Erro ao carregar menu ${file}:`, error);
    }
  }

  return menus;
};
