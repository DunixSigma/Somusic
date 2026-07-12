import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Logger from '../logs/Logger.js';

const logger = new Logger('CommandHandler');
const __dirname = dirname(fileURLToPath(import.meta.url));

class CommandHandler {
  constructor(client) {
    this.client = client;
    this.commands = new Map();
  }

  async loadCommands() {
    const commandsPath = join(__dirname, '../commands');
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      try {
        const command = await import(`../commands/${file}?t=${Date.now()}`);
        const commandModule = command.default;

        if (commandModule.data && commandModule.execute) {
          this.commands.set(commandModule.data.name, commandModule);
          logger.success(`Loaded command: ${commandModule.data.name}`);
        }
      } catch (error) {
        logger.error(`Failed to load command ${file}: ${error.message}`);
      }
    }

    logger.info(`Total commands loaded: ${this.commands.size}`);
  }

  getCommand(name) {
    return this.commands.get(name);
  }

  getAllCommands() {
    return Array.from(this.commands.values());
  }
}

export default CommandHandler;
