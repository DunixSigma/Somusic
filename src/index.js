import { Client, GatewayIntentBits, Collection } from 'discord.js';
import config from '../config.js';
import { logger } from './logs/logger.js';
import { database } from './database/database.js';
import { loadEvents, loadCommands, loadButtons, loadModals, loadSelectMenus } from './handlers/loader.js';
import { deployCommands } from './handlers/commandRegistry.js';
import { initializeKazagumo } from './music/player.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();

const start = async () => {
  try {
    logger.info('Iniciando bot Somusic...');
    
    // Inicializar banco de dados
    await database.initialize();
    logger.success('Banco de dados inicializado');
    
    // Inicializar Kazagumo
    await initializeKazagumo(client);
    logger.success('Sistema de música inicializado');
    
    // Carregar comandos
    const commands = await loadCommands();
    client.commands = commands;
    logger.success(`${commands.size} comando(s) carregado(s)`);
    
    // Carregar botoes
    const buttons = await loadButtons();
    client.buttons = buttons;
    logger.success(`${buttons.size} botão(ões) carregado(s)`);
    
    // Carregar modals
    const modals = await loadModals();
    client.modals = modals;
    logger.success(`${modals.size} modal(is) carregado(s)`);
    
    // Carregar menus
    const selectMenus = await loadSelectMenus();
    client.selectMenus = selectMenus;
    logger.success(`${selectMenus.size} menu(s) carregado(s)`);
    
    // Carregar eventos
    await loadEvents(client);
    logger.success('Eventos carregados');
    
    // Registrar comandos slash
    await deployCommands(client, commands);
    logger.success('Comandos registrados');
    
    // Conectar ao Discord
    await client.login(config.discord.token);
    logger.success('🎵 Bot Somusic conectado com sucesso!');
    
  } catch (error) {
    logger.error('Erro ao iniciar bot:', error);
    process.exit(1);
  }
};

// Tratamento de erros não capturados
process.on('unhandledRejection', (error) => {
  logger.error('Promise rejeitada não tratada:', error);
});

process.on('uncaughtException', (error) => {
  logger.error('Exceção não capturada:', error);
  process.exit(1);
});

start();

export default client;
