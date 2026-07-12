import Logger from '../logs/Logger.js';

const logger = new Logger('MusicManager');

class MusicManager {
  constructor(client) {
    this.client = client;
    this.players = new Map();
  }

  getPlayer(guildId) {
    return this.players.get(guildId);
  }

  setPlayer(guildId, player) {
    this.players.set(guildId, player);
  }

  deletePlayer(guildId) {
    this.players.delete(guildId);
  }

  hasPlayer(guildId) {
    return this.players.has(guildId);
  }
}

export default MusicManager;
