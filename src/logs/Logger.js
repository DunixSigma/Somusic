import chalk from 'chalk';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class Logger {
  constructor(context = 'Bot') {
    this.context = context;
    this.logPath = './logs';
  }

  async ensureLogDir() {
    try {
      await fs.mkdir(this.logPath, { recursive: true });
    } catch (error) {
      console.error('Failed to create log directory:', error);
    }
  }

  getTimestamp() {
    const now = new Date();
    return now.toISOString();
  }

  getLogFilePath(level) {
    const date = new Date().toISOString().split('T')[0];
    return path.join(this.logPath, `${date}-${level}.log`);
  }

  async writeToFile(level, message) {
    try {
      await this.ensureLogDir();
      const timestamp = this.getTimestamp();
      const logMessage = `[${timestamp}] [${level}] [${this.context}] ${message}\n`;
      const filePath = this.getLogFilePath(level);
      await fs.appendFile(filePath, logMessage);
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  info(message) {
    const log = `${chalk.blue('[')} ${chalk.cyan('INFO')} ${chalk.blue(']')} ${chalk.gray(`[${this.context}]`)} ${message}`;
    console.log(log);
    this.writeToFile('info', message).catch(() => {});
  }

  success(message) {
    const log = `${chalk.green('[')} ${chalk.green('✓')} ${chalk.green(']')} ${chalk.gray(`[${this.context}]`)} ${chalk.green(message)}`;
    console.log(log);
    this.writeToFile('success', message).catch(() => {});
  }

  warn(message) {
    const log = `${chalk.yellow('[')} ${chalk.yellow('WARN')} ${chalk.yellow(']')} ${chalk.gray(`[${this.context}]`)} ${chalk.yellow(message)}`;
    console.warn(log);
    this.writeToFile('warn', message).catch(() => {});
  }

  error(message) {
    const log = `${chalk.red('[')} ${chalk.red('ERROR')} ${chalk.red(']')} ${chalk.gray(`[${this.context}]`)} ${chalk.red(message)}`;
    console.error(log);
    this.writeToFile('error', message).catch(() => {});
  }

  debug(message) {
    const log = `${chalk.magenta('[')} ${chalk.magenta('DEBUG')} ${chalk.magenta(']')} ${chalk.gray(`[${this.context}]`)} ${chalk.magenta(message)}`;
    console.log(log);
    this.writeToFile('debug', message).catch(() => {});
  }
}

export default Logger;
