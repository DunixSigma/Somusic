import { logger } from '../logs/logger.js';
import { getPlayer, addTrackToQueue, playTrack } from './player.js';
import { history } from '../database/history.js';

export class MusicQueue {
  constructor(guildId) {
    this.guildId = guildId;
    this.queue = [];
    this.current = null;
    this.loopMode = 'off';
    this.autoplay = false;
  }

  add(track) {
    this.queue.push(track);
    logger.music(`Adicionado à fila: ${track.title}`);
  }

  remove(index) {
    if (index >= 0 && index < this.queue.length) {
      const track = this.queue.splice(index, 1)[0];
      logger.music(`Removido da fila: ${track.title}`);
      return track;
    }
    return null;
  }

  clear() {
    this.queue = [];
    logger.music(`Fila limpa`);
  }

  shuffle() {
    for (let i = this.queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
    }
    logger.music(`Fila embaralhada`);
  }

  move(fromIndex, toIndex) {
    if (fromIndex >= 0 && fromIndex < this.queue.length &&
        toIndex >= 0 && toIndex < this.queue.length) {
      const [track] = this.queue.splice(fromIndex, 1);
      this.queue.splice(toIndex, 0, track);
      logger.music(`Música movida: ${track.title}`);
      return true;
    }
    return false;
  }

  getNext() {
    if (this.queue.length > 0) {
      return this.queue.shift();
    }
    return null;
  }

  size() {
    return this.queue.length;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  getAll() {
    return this.queue;
  }
}

const queues = new Map();

export const getQueue = (guildId) => {
  if (!queues.has(guildId)) {
    queues.set(guildId, new MusicQueue(guildId));
  }
  return queues.get(guildId);
};

export const deleteQueue = (guildId) => {
  queues.delete(guildId);
  logger.music(`Fila deletada para guilda ${guildId}`);
};
