import Logger from '../logs/Logger.js';

const logger = new Logger('Warn');

export default {
  name: 'warn',
  async execute(warning) {
    logger.warn(`Client warning: ${warning}`);
  }
};
