import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = path.join(__dirname, '../logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const getTimestamp = () => new Date().toISOString();

const writeLog = (type, message, filePath) => {
  const timestamp = getTimestamp();
  const logMessage = `[${timestamp}] [${type}] ${message}\n`;
  
  try {
    fs.appendFileSync(filePath, logMessage, 'utf8');
  } catch (error) {
    console.error('Erro ao escrever log:', error);
  }
};

export const logger = {
  info: (message) => {
    const msg = `${chalk.blue('INFO')} ${message}`;
    console.log(msg);
    writeLog('INFO', message, path.join(logsDir, 'info.log'));
  },

  success: (message) => {
    const msg = `${chalk.green('✓')} ${message}`;
    console.log(msg);
    writeLog('SUCCESS', message, path.join(logsDir, 'info.log'));
  },

  warn: (message) => {
    const msg = `${chalk.yellow('⚠')} ${message}`;
    console.warn(msg);
    writeLog('WARN', message, path.join(logsDir, 'warn.log'));
  },

  error: (message, error = null) => {
    const msg = `${chalk.red('✗')} ${message}`;
    console.error(msg);
    if (error) {
      console.error(chalk.red(error.stack || error));
    }
    const fullMessage = error ? `${message} - ${error.stack || error}` : message;
    writeLog('ERROR', fullMessage, path.join(logsDir, 'error.log'));
  },

  debug: (message) => {
    const msg = `${chalk.gray('[DEBUG]')} ${message}`;
    console.log(msg);
    writeLog('DEBUG', message, path.join(logsDir, 'debug.log'));
  },

  music: (message) => {
    const msg = `${chalk.magenta('♫')} ${message}`;
    console.log(msg);
    writeLog('MUSIC', message, path.join(logsDir, 'music.log'));
  },

  database: (message) => {
    const msg = `${chalk.cyan('DB')} ${message}`;
    console.log(msg);
    writeLog('DATABASE', message, path.join(logsDir, 'database.log'));
  },
};
