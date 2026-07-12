import Logger from '../logs/Logger.js';

const logger = new Logger('ClientError');

export default {
  name: 'error',
  async execute(error) {
    logger.error(`Client error: ${error.message}`);
    logger.error(`Stack: ${error.stack}`);
  }
};
