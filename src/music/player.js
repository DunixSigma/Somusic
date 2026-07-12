import { Kazagumo, Plugins } from 'kazagumo';
import { Shoukaku } from 'shoukaku';
import config from '../../config.js';
import { logger } from '../logs/logger.js';
import { guildRepository } from '../database/repositories/guildRepository.js';
import { historyRepository } from '../database/repositories/historyRepository.js';

let kazagumo = null;

export const initializeKazagumo = async (client) => {
  try {
    const shoukaku = new Shoukaku(
      client,
      config.lavalink.nodes,
      {
        reconnectTries: 5,
        reconnectInterval: 5000,
        moveOnStuck: true,
        moveOnDisconnect: true,
      }
    );

    kazagumo = new Kazagumo(
      {
        defaultSearchEngine: 'youtube',
        send: (payload) => {
          const guild = client.guilds.cache.get(payload.d.guild_id);
          if (guild) guild.shard?.send(payload);
        },
      },
      shoukaku
    );

    kazagumo.on('error', (error) => {
      logger.error('Erro no Kazagumo:', error);
    });

    kazagumo.on('playerCreate', (player) => {
      logger.music(`Player criado - Guild: ${player.guildId}`);
    });

    kazagumo.on('playerDestroy', (player) => {
      logger.music(`Player destruído - Guild: ${player.guildId}`);
    });

    client.kazagumo = kazagumo;
    logger.success('Kazagumo inicializado');
  } catch (error) {
    logger.error('Erro ao inicializar Kazagumo:', error);
  }
};

export const getKazagumo = () => kazagumo;

export const getPlayer = (guildId) => {
  if (!kazagumo) return null;
  return kazagumo.players.get(guildId);
};

export const createPlayer = async (client, guildId, voiceChannelId, textChannelId) => {
  try {
    const player = await kazagumo.createPlayer({
      guildId,
      voiceChannelId,
      textChannelId,
      deaf: false,
      mute: false,
    });

    // Recuperar configurações da guild
    let settings = await guildRepository.getSettings(guildId);
    if (!settings) {
      settings = await guildRepository.createSettings(guildId);
    }

    // Aplicar configurações
    if (settings.volume) {
      player.setVolume(settings.volume);
    }

    logger.music(`Player criado - Guild: ${guildId}, Voice: ${voiceChannelId}`);
    return player;
  } catch (error) {
    logger.error(`Erro ao criar player para guild ${guildId}:`, error);
    return null;
  }
};

export const destroyPlayer = async (guildId) => {
  try {
    const player = getPlayer(guildId);
    if (player) {
      await player.destroy();
      logger.music(`Player destruído - Guild: ${guildId}`);
    }
  } catch (error) {
    logger.error(`Erro ao destruir player ${guildId}:`, error);
  }
};

export const play = async (player, track) => {
  try {
    if (!player) return false;
    
    if (!player.queue.current) {
      player.queue.add(track);
      await player.play();
      logger.music(`Tocando: ${track.title} - Guild: ${player.guildId}`);
    } else {
      player.queue.add(track);
      logger.music(`Adicionado à fila: ${track.title} - Guild: ${player.guildId}`);
    }

    // Adicionar ao histórico
    if (track.requester) {
      await historyRepository.add(track.requester, track);
    }

    return true;
  } catch (error) {
    logger.error(`Erro ao tocar: ${track.title}`, error);
    return false;
  }
};

export const searchTrack = async (query, source = 'youtube') => {
  try {
    if (!kazagumo) return [];

    const results = await kazagumo.search(query, {
      source,
    });

    return results.tracks || [];
  } catch (error) {
    logger.error(`Erro ao pesquisar: ${query}`, error);
    return [];
  }
};

export default {
  initializeKazagumo,
  getKazagumo,
  getPlayer,
  createPlayer,
  destroyPlayer,
  play,
  searchTrack,
};
