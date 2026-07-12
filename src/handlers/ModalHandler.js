import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Logger from '../logs/Logger.js';

const logger = new Logger('ModalHandler');
const __dirname = dirname(fileURLToPath(import.meta.url));

class ModalHandler {
  constructor(client) {
    this.client = client;
    this.modals = new Map();
  }

  async loadModals() {
    const modalsPath = join(__dirname, '../modals');
    const modalFiles = readdirSync(modalsPath).filter(file => file.endsWith('.js'));

    for (const file of modalFiles) {
      try {
        const modal = await import(`../modals/${file}?t=${Date.now()}`);
        const modalModule = modal.default;

        if (modalModule.id && modalModule.execute) {
          this.modals.set(modalModule.id, modalModule);
          logger.success(`Loaded modal: ${modalModule.id}`);
        }
      } catch (error) {
        logger.error(`Failed to load modal ${file}: ${error.message}`);
      }
    }

    logger.info(`Total modals loaded: ${this.modals.size}`);
  }

  getModal(id) {
    return this.modals.get(id);
  }
}

export default ModalHandler;
