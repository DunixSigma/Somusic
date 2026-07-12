import { Kazagumo, SearchResultType } from 'kazagumo';
import { Shoukaku } from 'shoukaku';
import { config } from '../../config.js';
import { logger } from '../logs/logger.js';
import { history } from '../database/history.js';
import { guildConfig } from '../database/guildConfig.js';

const nodes = [
  {
    name: 'Lavalink',
    url: `${config.lavalink.host}:${config.lavalink.port}`,
    auth: config.lavalink.password,
    secure: config.lavalink.secure,
  }
];

const shoukaku = new Shoukaku(
  {
    resume: {
      key: 'somusic_key',
      timeout: 30,
    },
    reconnectTries: 5,
    reconnectInterval: 10000,
    requestTimeout: 10000,
  },
  nodes
);

export const kazagumo = new Kazagumo(
  {
    defaultSearchEngine: 'youtube',
    searchOptions: {
      youtube: {
        delay: 0,
      },
    },
  },
  shoukaku
);

kazagumo.on('debug', (name, info) => {
  if (config.debug) {
    logger.debug(`[${name}] ${info}`);
  }
});

kazagumo.on('error', (name, error) => {
  logger.error(`Erro no Kazagumo [${name}]:`, error);
});

kazagumo.on('warn', (name, message) => {
  logger.warn(`[${name}] ${message}`);
});

export const initializeKazagumo = async (client) => {
  try {
    kazagumo.init(client);
    logger.success('Kazagumo inicializado');
  } catch (error) {
    logger.error('Erro ao inicializar Kazagumo:', error);
  }
};

export const searchTrack = async (query) => {
  try {
    const results = await kazagumo.search(query, { type: SearchResultType.TRACK });
    return results;
  } catch (error) {
    logger.error('Erro ao pesquisar música:', error);
    return null;
  }
};

export const searchPlaylist = async (query) => {
  try {
    const results = await kazagumo.search(query, { type: SearchResultType.PLAYLIST });
    return results;
  } catch (error) {
    logger.error('Erro ao pesquisar playlist:', error);
    return null;
  }
};

export const getPlayer = (guildId) => {
  return kazagumo.players.get(guildId);
};

export const createPlayer = async (guild, voiceChannel) => {
  try {
    const player = kazagumo.createPlayer({
      guildId: guild.id,
      textChannelId: guild.systemChannel?.id,
      voiceChannelId: voiceChannel.id,
      shardId: guild.shardId || 0,
      volume: 100,
    });

    player.connect();
    logger.music(`Player criado para a guilda ${guild.id}`);
    return player;
  } catch (error) {
    logger.error('Erro ao criar player:', error);
    return null;
  }
};

export const destroyPlayer = (guildId) => {
  const player = getPlayer(guildId);
  if (player) {
    player.destroy();
    logger.music(`Player destruído para a guilda ${guildId}`);
  }
};

export const playTrack = async (player, track) => {
  try {
    if (!player) return false;

    await player.play(track);
    logger.music(`Música tocando: ${track.title}`);
    return true;
  } catch (error) {
    logger.error('Erro ao tocar música:', error);
    return false;
  }
};

export const pauseTrack = async (player) => {
  try {
    if (!player) return false;
    
    await player.pause(true);
    logger.music(`Música pausada`);
    return true;
  } catch (error) {
    logger.error('Erro ao pausar música:', error);
    return false;
  }
};

export const resumeTrack = async (player) => {
  try {
    if (!player) return false;
    
    await player.pause(false);
    logger.music(`Música retomada`);
    return true;
  } catch (error) {
    logger.error('Erro ao retomar música:', error);
    return false;
  }
};

export const skipTrack = async (player) => {
  try {
    if (!player) return false;
    
    await player.skip();
    logger.music(`Música pulada`);
    return true;
  } catch (error) {
    logger.error('Erro ao pular música:', error);
    return false;
  }
};

export const seekTrack = async (player, position) => {
  try {
    if (!player) return false;
    
    await player.seek(position);
    logger.music(`Música avançada para ${position}ms`);
    return true;
  } catch (error) {
    logger.error('Erro ao avançar música:', error);
    return false;
  }
};

export const setVolume = async (player, volume) => {
  try {
    if (!player) return false;
    
    const validVolume = Math.max(0, Math.min(100, volume));
    await player.setVolume(validVolume);
    await guildConfig.setVolume(player.guildId, validVolume);
    
    logger.music(`Volume definido para ${validVolume}%`);
    return true;
  } catch (error) {
    logger.error('Erro ao definir volume:', error);
    return false;
  }
};

export const addTrackToQueue = (player, track) => {
  try {
    if (!player) return false;
    
    player.queue.add(track);
    logger.music(`Música adicionada à fila: ${track.title}`);
    return true;
  } catch (error) {
    logger.error('Erro ao adicionar música à fila:', error);
    return false;
  }
};

export const removeFromQueue = (player, index) => {
  try {
    if (!player) return false;
    
    const track = player.queue.at(index);
    player.queue.remove(index);
    
    logger.music(`Música removida da fila: ${track?.title}`);
    return true;
  } catch (error) {
    logger.error('Erro ao remover música da fila:', error);
    return false;
  }
};

export const clearQueue = (player) => {
  try {
    if (!player) return false;
    
    player.queue.clear();
    logger.music(`Fila limpa`);
    return true;
  } catch (error) {
    logger.error('Erro ao limpar fila:', error);
    return false;
  }
};

export const shuffleQueue = (player) => {
  try {
    if (!player) return false;
    
    player.queue.shuffle();
    logger.music(`Fila embaralhada`);
    return true;
  } catch (error) {
    logger.error('Erro ao embaralhar fila:', error);
    return false;
  }
};

export const setLoopMode = async (player, mode) => {
  try {
    if (!player) return false;
    
    await player.setLoop(mode);
    await guildConfig.setLoop(player.guildId, mode);
    
    logger.music(`Loop definido para ${mode}`);
    return true;
  } catch (error) {
    logger.error('Erro ao definir loop:', error);
    return false;
  }
};
