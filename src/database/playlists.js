import { database } from './database.js';
import { logger } from '../logs/logger.js';

export const playlists = {
  async createPlaylist(userId, guildId, name) {
    try {
      const result = await database.run(
        'INSERT INTO playlists (user_id, guild_id, name) VALUES (?, ?, ?)',
        [userId, guildId, name]
      );
      
      logger.database(`Playlist "${name}" criada por ${userId}`);
      return result.id;
    } catch (error) {
      logger.error('Erro ao criar playlist', error);
      return null;
    }
  },

  async deletePlaylist(playlistId) {
    try {
      await database.run(
        'DELETE FROM playlists WHERE id = ?',
        [playlistId]
      );
      
      logger.database(`Playlist ${playlistId} deletada`);
      return true;
    } catch (error) {
      logger.error('Erro ao deletar playlist', error);
      return false;
    }
  },

  async getUserPlaylists(userId, guildId) {
    try {
      const results = await database.all(
        'SELECT * FROM playlists WHERE user_id = ? AND guild_id = ? ORDER BY created_at DESC',
        [userId, guildId]
      );
      
      return results || [];
    } catch (error) {
      logger.error('Erro ao obter playlists do usuário', error);
      return [];
    }
  },

  async getPlaylist(playlistId) {
    try {
      return await database.get(
        'SELECT * FROM playlists WHERE id = ?',
        [playlistId]
      );
    } catch (error) {
      logger.error('Erro ao obter playlist', error);
      return null;
    }
  },

  async addTrackToPlaylist(playlistId, track, position = null) {
    try {
      const pos = position || (await this.getPlaylistSize(playlistId)) + 1;
      
      await database.run(
        `INSERT INTO playlist_tracks (playlist_id, title, url, duration, thumbnail, author, position)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [playlistId, track.title, track.url, track.duration, track.thumbnail, track.author, pos]
      );
      
      logger.database(`Música adicionada à playlist ${playlistId}`);
      return true;
    } catch (error) {
      logger.error('Erro ao adicionar música à playlist', error);
      return false;
    }
  },

  async removeTrackFromPlaylist(playlistId, trackId) {
    try {
      await database.run(
        'DELETE FROM playlist_tracks WHERE id = ? AND playlist_id = ?',
        [trackId, playlistId]
      );
      
      logger.database(`Música removida da playlist ${playlistId}`);
      return true;
    } catch (error) {
      logger.error('Erro ao remover música da playlist', error);
      return false;
    }
  },

  async getPlaylistTracks(playlistId) {
    try {
      const results = await database.all(
        'SELECT * FROM playlist_tracks WHERE playlist_id = ? ORDER BY position ASC',
        [playlistId]
      );
      
      return results || [];
    } catch (error) {
      logger.error('Erro ao obter músicas da playlist', error);
      return [];
    }
  },

  async getPlaylistSize(playlistId) {
    try {
      const result = await database.get(
        'SELECT COUNT(*) as count FROM playlist_tracks WHERE playlist_id = ?',
        [playlistId]
      );
      
      return result?.count || 0;
    } catch (error) {
      logger.error('Erro ao obter tamanho da playlist', error);
      return 0;
    }
  }
};
