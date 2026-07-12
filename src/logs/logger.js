import chalk from 'chalk';
import moment from 'moment';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = path.join(__dirname, '../../logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const getTimestamp = () => moment().format('YYYY-MM-DD HH:mm:ss');

const getLogFile = () => {
  const date = moment().format('YYYY-MM-DD');
  return path.join(logsDir, `${date}.log`);
};

const writeToFile = (message) => {
  const file = getLogFile();
  fs.appendFileSync(file, message + '\n');
};

export const logger = {
  log: (message) => {
    const timestamp = getTimestamp();
    const output = `[${timestamp}] ${message}`;
    console.log(output);
    writeToFile(output);
  },

  info: (message) => {
    const timestamp = getTimestamp();
    const output = `[${timestamp}] ${chalk.blue('[INFO]')} ${message}`;
    console.log(output);
    writeToFile(`[${timestamp}] [INFO] ${message}`);
  },

  success: (message) => {
    const timestamp = getTimestamp();
    const output = `[${timestamp}] ${chalk.green('[SUCCESS]')} ${message}`;
    console.log(output);
    writeToFile(`[${timestamp}] [SUCCESS] ${message}`);
  },

  warn: (message) => {
    const timestamp = getTimestamp();
    const output = `[${timestamp}] ${chalk.yellow('[WARN]')} ${message}`;
    console.warn(output);
    writeToFile(`[${timestamp}] [WARN] ${message}`);
  },

  error: (message, error = null) => {
    const timestamp = getTimestamp();
    const errorMsg = error ? `${message} - ${error.message}` : message;
    const output = `[${timestamp}] ${chalk.red('[ERROR]')} ${errorMsg}`;
    console.error(output);
    writeToFile(`[${timestamp}] [ERROR] ${errorMsg}`);
  },

  music: (message) => {
    const timestamp = getTimestamp();
    const output = `[${timestamp}] ${chalk.magenta('[MUSIC]')} ${message}`;
    console.log(output);
    writeToFile(`[${timestamp}] [MUSIC] ${message}`);
  },

  debug: (message) => {
    const timestamp = getTimestamp();
    const output = `[${timestamp}] ${chalk.cyan('[DEBUG]')} ${message}`;
    console.log(output);
    writeToFile(`[${timestamp}] [DEBUG] ${message}`);
  },
};
