import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Logger from '../logs/Logger.js';

const logger = new Logger('SelectMenuHandler');
const __dirname = dirname(fileURLToPath(import.meta.url));

class SelectMenuHandler {
  constructor(client) {
    this.client = client;
    this.menus = new Map();
  }

  async loadMenus() {
    const menusPath = join(__dirname, '../selectMenus');
    const menuFiles = readdirSync(menusPath).filter(file => file.endsWith('.js'));

    for (const file of menuFiles) {
      try {
        const menu = await import(`../selectMenus/${file}?t=${Date.now()}`);
        const menuModule = menu.default;

        if (menuModule.id && menuModule.execute) {
          this.menus.set(menuModule.id, menuModule);
          logger.success(`Loaded select menu: ${menuModule.id}`);
        }
      } catch (error) {
        logger.error(`Failed to load select menu ${file}: ${error.message}`);
      }
    }

    logger.info(`Total select menus loaded: ${this.menus.size}`);
  }

  getMenu(id) {
    return this.menus.get(id);
  }
}

export default SelectMenuHandler;
