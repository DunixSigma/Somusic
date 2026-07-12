import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { config } from '../config.js';
import Logger from './logs/Logger.js';
import Database from './database/Database.js';
import MusicManager from './music/MusicManager.js';
import {
  CommandHandler,
  EventHandler,
  ButtonHandler,
  ModalHandler,
  SelectMenuHandler
} from './handlers/index.js';

const logger = new Logger('Bot');

class SomusicBot {
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildEmojisAndStickers,
      ],
    });

    this.database = new Database(config.database.path);
    this.musicManager = new MusicManager(this.client);

    this.commandHandler = null;
    this.eventHandler = null;
    this.buttonHandler = null;
    this.modalHandler = null;
    this.selectMenuHandler = null;

    this.setupHandlers();
    this.attachHandlersToClient();
  }

  setupHandlers() {
    this.commandHandler = new CommandHandler(this.client);
    this.eventHandler = new EventHandler(this.client);
    this.buttonHandler = new ButtonHandler(this.client);
    this.modalHandler = new ModalHandler(this.client);
    this.selectMenuHandler = new SelectMenuHandler(this.client);
  }

  attachHandlersToClient() {
    this.client.handlers = {
      commandHandler: this.commandHandler,
      eventHandler: this.eventHandler,
      buttonHandler: this.buttonHandler,
      modalHandler: this.modalHandler,
      selectMenuHandler: this.selectMenuHandler,
    };

    this.client.musicManager = this.musicManager;
    this.client.database = this.database;

    this.client.commands = new Collection();
    this.client.buttons = new Collection();
    this.client.modals = new Collection();
    this.client.selectMenus = new Collection();
  }

  async initialize() {
    try {
      logger.info('Inicializando Somusic Bot...');

      // 1. Inicializar banco de dados
      logger.info('Conectando ao banco de dados...');
      await this.database.initialize();
      logger.success('Banco de dados inicializado com sucesso');

      // 2. Inicializar Music Manager (Kazagumo + Shoukaku)
      logger.info('Inicializando sistema de música...');
      await this.musicManager.initialize();
      logger.success('Sistema de música inicializado com sucesso');

      // 3. Carregar handlers
      logger.info('Carregando handlers...');
      await this.commandHandler.loadCommands();
      await this.buttonHandler.loadButtons();
      await this.modalHandler.loadModals();
      await this.selectMenuHandler.loadSelectMenus();
      await this.eventHandler.loadEvents();
      logger.success('Todos os handlers carregados com sucesso');

      // 4. Registrar comandos slash
      logger.info('Registrando comandos slash...');
      await this.registerSlashCommands();
      logger.success('Comandos slash registrados com sucesso');

      // 5. Conectar ao Discord
      logger.info('Conectando ao Discord...');
      await this.client.login(config.bot.token);
      logger.success('Bot conectado ao Discord com sucesso!');

    } catch (error) {
      logger.error(`Erro crítico ao inicializar bot: ${error.message}`);
      logger.error(`Stack: ${error.stack}`);
      process.exit(1);
    }
  }

  async registerSlashCommands() {
    try {
      const commands = Array.from(this.commandHandler.getAllCommands()).map(cmd => cmd.data.toJSON());
      
      if (commands.length === 0) {
        logger.warn('Nenhum comando slash encontrado para registrar');
        return;
      }

      const rest = new (await import('@discordjs/rest')).REST({ version: '10' })
        .setToken(config.bot.token);

      await rest.put(
        `https://discordapp.com/api/v10/applications/${config.bot.clientId}/commands`,
        { body: commands }
      );

      logger.success(`${commands.length} comando(s) slash registrado(s)`);
    } catch (error) {
      logger.error(`Erro ao registrar comandos slash: ${error.message}`);
      throw error;
    }
  }

  setupErrorHandlers() {
    this.client.on('error', (error) => {
      logger.error(`Erro no cliente Discord: ${error.message}`);
    });

    process.on('unhandledRejection', (reason, promise) => {
      logger.error(`Promise rejeitada não tratada: ${reason}`);
    });

    process.on('uncaughtException', (error) => {
      logger.error(`Exceção não capturada: ${error.message}`);
      logger.error(`Stack: ${error.stack}`);
      process.exit(1);
    });

    this.client.on('warn', (info) => {
      logger.warn(`Aviso do Discord: ${info}`);
    });
  }

  async start() {
    this.setupErrorHandlers();
    await this.initialize();
  }

  async stop() {
    try {
      logger.info('Desligando Somusic Bot...');
      
      this.musicManager.destroy();
      await this.database.close();
      await this.client.destroy();
      
      logger.success('Bot desligado com sucesso');
    } catch (error) {
      logger.error(`Erro ao desligar bot: ${error.message}`);
      process.exit(1);
    }
  }
}

// Criar e iniciar instância do bot
const bot = new SomusicBot();
bot.start().catch((error) => {
  logger.error(`Erro fatal: ${error.message}`);
  process.exit(1);
});

// Tratar sinais de término
process.on('SIGINT', async () => {
  logger.info('SIGINT recebido, desligando...');
  await bot.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('SIGTERM recebido, desligando...');
  await bot.stop();
  process.exit(0);
});

export default bot;
