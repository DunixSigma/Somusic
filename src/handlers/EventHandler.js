import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Logger from '../logs/Logger.js';

const logger = new Logger('EventHandler');
const __dirname = dirname(fileURLToPath(import.meta.url));

class EventHandler {
  constructor(client) {
    this.client = client;
    this.events = new Map();
  }

  async loadEvents() {
    const eventsPath = join(__dirname, '../events');
    const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
      try {
        const event = await import(`../events/${file}?t=${Date.now()}`);
        const eventModule = event.default;

        if (eventModule.name && eventModule.execute) {
          this.events.set(eventModule.name, eventModule);
          
          if (eventModule.once) {
            this.client.once(eventModule.name, (...args) => eventModule.execute(this.client, ...args));
          } else {
            this.client.on(eventModule.name, (...args) => eventModule.execute(this.client, ...args));
          }

          logger.success(`Loaded event: ${eventModule.name}`);
        }
      } catch (error) {
        logger.error(`Failed to load event ${file}: ${error.message}`);
      }
    }

    logger.info(`Total events loaded: ${this.events.size}`);
  }

  getEvent(name) {
    return this.events.get(name);
  }
}

export default EventHandler;
