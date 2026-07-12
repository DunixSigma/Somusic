import { Kazagumo, Connector } from 'kazagumo';
import { Shoukaku } from 'shoukaku';
import Logger from '../logs/Logger.js';
import { config } from '../../config.js';

const logger = new Logger('MusicManager');

class MusicManager {
  constructor(client) {
    this.client = client;
    this.kazagumo = null;
    this.players = new Map();
    this.queues = new Map();
    this.playerStates = new Map();
    this.initialized = false;
  }

  async initialize() {
    try {
      logger.info('Inicializando Music Manager com Kazagumo...');

      // Configurar Shoukaku (Lavalink connector)
      const shoukaku = new Shoukaku(
        {
          id: config.bot.clientId,
          username: 'Somusic',
          secure: config.lavalink.secure,
          resumable: true,
          resumableTimeout: 30,
          reconnectTries: 5,
          reconnectInterval: 5000,
          userAgent: 'Somusic/1.0.0 (Discord Music Bot)'
        },
        this.client
      );

      // Configurar Kazagumo
      this.kazagumo = new Kazagumo(
        {
          defaultSearchEngine: 'youtube',
          spotify: {
            clientID: process.env.SPOTIFY_CLIENT_ID || '',
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || ''
          }
        },
        shoukaku,
        new Map()
      );

      // Event listeners do Shoukaku
      this.setupShoukakuEvents(shoukaku);
      
      // Event listeners do Kazagumo
      this.setupKazagumoEvents();

      // Conectar ao Lavalink
      await shoukaku.start();

      logger.success('Music Manager inicializado com sucesso');
      this.initialized = true;
    } catch (error) {
      logger.error(`Erro ao inicializar Music Manager: ${error.message}`);
      throw error;
    }
  }

  setupShoukakuEvents(shoukaku) {
    shoukaku.on('ready', (name) => {
      logger.success(`Shoukaku conectado ao node: ${name}`);
    });

    shoukaku.on('error', (name, error) => {
      logger.error(`Erro no node ${name}: ${error.message}`);
    });

    shoukaku.on('disconnect', (name, players) => {
      logger.warn(`Shoukaku desconectado do node: ${name}, ${players} players afetados`);
    });

    shoukaku.on('reconnecting', (name) => {
      logger.info(`Shoukaku reconectando ao node: ${name}`);
    });
  }

  setupKazagumoEvents() {
    this.kazagumo.on('playerCreate', (player) => {
      logger.info(`[Player] Criado para guild ${player.guildId}`);
      this.players.set(player.guildId, player);
      this.playerStates.set(player.guildId, {
        loop: 'off',
        autoplay: false,
        shuffle: false,
        volume: 50
      });
    });

    this.kazagumo.on('playerDestroy', (player) => {
      logger.info(`[Player] Destruído para guild ${player.guildId}`);
      this.players.delete(player.guildId);
      this.queues.delete(player.guildId);
      this.playerStates.delete(player.guildId);
    });

    this.kazagumo.on('playerMove', (player, state, destination) => {
      if (!destination) {
        logger.info(`[Player] Removido do canal de voz: ${player.guildId}`);
        if (this.players.has(player.guildId)) {
          player.destroy();
        }
      }
    });

    this.kazagumo.on('playerError', (player, error) => {
      logger.error(`[Player] Erro na guild ${player.guildId}: ${error.message}`);
    });

    this.kazagumo.on('trackStart', (player, track) => {
      logger.info(`[Music] Tocando: ${track.title} por ${track.author} (${this.formatDuration(track.duration)})`);
      
      // Emitir evento customizado para atualizar painel
      this.client.emit('musicTrackStart', {
        player,
        track,
        guildId: player.guildId
      });
    });

    this.kazagumo.on('trackEnd', (player, track) => {
      logger.info(`[Music] Finalizou: ${track.title}`);
      
      const state = this.playerStates.get(player.guildId);
      
      if (state?.loop === 'track') {
        player.play(track);
        logger.info(`[Loop] Repetindo track: ${track.title}`);
      } else {
        this.playNext(player.guildId);
      }

      this.client.emit('musicTrackEnd', {
        player,
        track,
        guildId: player.guildId
      });
    });

    this.kazagumo.on('trackError', (player, track, error) => {
      logger.error(`[Music] Erro na track ${track.title}: ${error.message}`);
      this.playNext(player.guildId);
      
      this.client.emit('musicTrackError', {
        player,
        track,
        error,
        guildId: player.guildId
      });
    });

    this.kazagumo.on('trackStuck', (player, track, threshold) => {
      logger.warn(`[Music] Track travada ${track.title} (${threshold}ms) na guild ${player.guildId}`);
      this.playNext(player.guildId);
    });

    this.kazagumo.on('playerDisconnect', (player) => {
      logger.info(`[Player] Desconectado da guild ${player.guildId}`);
      if (this.players.has(player.guildId)) {
        player.destroy();
      }
    });

    this.kazagumo.on('playerUpdate', (player) => {
      // Atualizar painel em tempo real
      this.client.emit('musicPlayerUpdate', {
        player,
        guildId: player.guildId,
        position: player.position,
        state: player.paused ? 'paused' : 'playing'
      });
    });
  }

  async play(guildId, query, voiceChannelId, textChannelId, requester) {
    try {
      if (!this.initialized) {
        throw new Error('Music Manager não inicializado');
      }

      logger.info(`[Play] Pesquisando: "${query}" solicitado por ${requester?.username}`);

      const results = await this.kazagumo.search(query, { requester });

      if (!results || !results.tracks.length) {
        throw new Error(`Nenhuma música encontrada para: ${query}`);
      }

      const track = results.tracks[0];
      logger.info(`[Play] Encontrado: ${track.title} por ${track.author}`);

      let player = this.players.get(guildId);

      if (!player) {
        player = this.kazagumo.createPlayer({
          guildId: guildId,
          textChannelId: textChannelId,
          voiceChannelId: voiceChannelId,
          selfDeaf: true,
          selfMute: false
        });
      }

      if (!this.queues.has(guildId)) {
        this.queues.set(guildId, []);
      }

      const queue = this.queues.get(guildId);
      
      if (player.queue.current) {
        // Adicionar à fila
        queue.push(track);
        logger.info(`[Queue] Track adicionada à fila: ${track.title} (posição: ${queue.length})`);
        return { track, queued: true, position: queue.length };
      } else {
        // Tocar agora
        await player.play(track);
        logger.info(`[Play] Tocando agora: ${track.title}`);
        return { track, queued: false, position: 0 };
      }
    } catch (error) {
      logger.error(`Erro em play: ${error.message}`);
      throw error;
    }
  }

  async playNext(guildId) {
    try {
      const player = this.players.get(guildId);
      const queue = this.queues.get(guildId);
      const state = this.playerStates.get(guildId);

      if (!player) return;

      if (!queue || queue.length === 0) {
        logger.info(`[Queue] Fila vazia para guild ${guildId}`);
        
        if (state?.autoplay) {
          logger.info(`[Autoplay] Ativado para guild ${guildId}`);
          // TODO: Implementar autoplay
        } else {
          player.destroy();
        }
        return;
      }

      if (state?.shuffle) {
        const randomIndex = Math.floor(Math.random() * queue.length);
        const [shuffledTrack] = queue.splice(randomIndex, 1);
        await player.play(shuffledTrack);
        logger.info(`[Shuffle] Próxima track (shuffle): ${shuffledTrack.title}`);
      } else {
        const nextTrack = queue.shift();
        await player.play(nextTrack);
        logger.info(`[Queue] Próxima track: ${nextTrack.title} (${queue.length} restantes)`);
      }
    } catch (error) {
      logger.error(`Erro em playNext: ${error.message}`);
    }
  }

  pause(guildId) {
    const player = this.players.get(guildId);
    if (!player) throw new Error('Nenhum player ativo');
    if (!player.queue.current) throw new Error('Nenhuma música tocando');
    
    player.pause(true);
    logger.info(`[Control] Pausa acionada na guild ${guildId}`);
    return true;
  }

  resume(guildId) {
    const player = this.players.get(guildId);
    if (!player) throw new Error('Nenhum player ativo');
    if (!player.queue.current) throw new Error('Nenhuma música pausada');
    
    player.pause(false);
    logger.info(`[Control] Retomada acionada na guild ${guildId}`);
    return true;
  }

  stop(guildId) {
    const player = this.players.get(guildId);
    if (!player) throw new Error('Nenhum player ativo');
    
    const queue = this.queues.get(guildId);
    if (queue) queue.length = 0;
    
    player.queue.clear();
    player.stop();
    
    logger.info(`[Control] Parada acionada na guild ${guildId}`);
    return true;
  }

  skip(guildId) {
    const player = this.players.get(guildId);
    if (!player) throw new Error('Nenhum player ativo');
    if (!player.queue.current) throw new Error('Nenhuma música tocando');
    
    const currentTrack = player.queue.current;
    this.playNext(guildId);
    
    logger.info(`[Control] Skip acionado na guild ${guildId}`);
    return currentTrack;
  }

  previous(guildId) {
    const player = this.players.get(guildId);
    if (!player) throw new Error('Nenhum player ativo');
    
    // TODO: Implementar histórico de tracks
    logger.info(`[Control] Previous solicitado na guild ${guildId}`);
    throw new Error('Funcionalidade em desenvolvimento');
  }

  seek(guildId, position) {
    const player = this.players.get(guildId);
    if (!player) throw new Error('Nenhum player ativo');
    if (!player.queue.current) throw new Error('Nenhuma música tocando');
    
    const position_ms = position * 1000;
    player.seek(position_ms);
    
    logger.info(`[Control] Seek para ${position}s na guild ${guildId}`);
    return position_ms;
  }

  setVolume(guildId, volume) {
    const player = this.players.get(guildId);
    if (!player) throw new Error('Nenhum player ativo');
    
    const vol = Math.max(0, Math.min(100, volume));
    player.setVolume(vol);
    
    const state = this.playerStates.get(guildId);
    if (state) state.volume = vol;
    
    logger.info(`[Control] Volume ajustado para ${vol}% na guild ${guildId}`);
    return vol;
  }

  setLoop(guildId, mode) {
    const validModes = ['off', 'track', 'queue'];
    if (!validModes.includes(mode)) {
      throw new Error(`Modo de loop inválido. Use: ${validModes.join(', ')}`);
    }
    
    const state = this.playerStates.get(guildId);
    if (!state) throw new Error('Nenhum player ativo');
    
    state.loop = mode;
    
    logger.info(`[Control] Loop ajustado para ${mode} na guild ${guildId}`);
    return mode;
  }

  setShuffle(guildId, enabled) {
    const state = this.playerStates.get(guildId);
    if (!state) throw new Error('Nenhum player ativo');
    
    state.shuffle = enabled;
    
    logger.info(`[Control] Shuffle ${enabled ? 'ativado' : 'desativado'} na guild ${guildId}`);
    return enabled;
  }

  setAutoplay(guildId, enabled) {
    const state = this.playerStates.get(guildId);
    if (!state) throw new Error('Nenhum player ativo');
    
    state.autoplay = enabled;
    
    logger.info(`[Control] Autoplay ${enabled ? 'ativado' : 'desativado'} na guild ${guildId}`);
    return enabled;
  }

  getPlayer(guildId) {
    return this.players.get(guildId);
  }

  getQueue(guildId) {
    return this.queues.get(guildId) || [];
  }

  getCurrentTrack(guildId) {
    const player = this.players.get(guildId);
    return player?.queue.current || null;
  }

  getPlayerState(guildId) {
    return this.playerStates.get(guildId);
  }

  getQueueSize(guildId) {
    const queue = this.queues.get(guildId);
    return queue ? queue.length : 0;
  }

  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    }
    return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
  }

  formatPosition(player) {
    return this.formatDuration(player.position);
  }

  destroy() {
    logger.info('Destruindo Music Manager');
    this.players.forEach(player => {
      try {
        player.destroy();
      } catch (error) {
        logger.error(`Erro ao destruir player: ${error.message}`);
      }
    });
    this.players.clear();
    this.queues.clear();
    this.playerStates.clear();
  }
}

export default MusicManager;
