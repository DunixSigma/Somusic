import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Logger from '../logs/Logger.js';

const logger = new Logger('ButtonHandler');
const __dirname = dirname(fileURLToPath(import.meta.url));

class ButtonHandler {
  constructor(client) {
    this.client = client;
    this.buttons = new Map();
  }

  async loadButtons() {
    const buttonsPath = join(__dirname, '../buttons');
    const buttonFiles = readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

    for (const file of buttonFiles) {
      try {
        const button = await import(`../buttons/${file}?t=${Date.now()}`);
        const buttonModule = button.default;

        if (buttonModule.id && buttonModule.execute) {
          this.buttons.set(buttonModule.id, buttonModule);
          logger.success(`Loaded button: ${buttonModule.id}`);
        }
      } catch (error) {
        logger.error(`Failed to load button ${file}: ${error.message}`);
      }
    }

    logger.info(`Total buttons loaded: ${this.buttons.size}`);
  }

  getButton(id) {
    return this.buttons.get(id);
  }
}

export default ButtonHandler;
