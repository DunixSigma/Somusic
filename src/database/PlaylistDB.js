import Logger from '../logs/Logger.js';

const logger = new Logger('PlaylistDB');

class PlaylistDB {
  constructor(database) {
    this.db = database;
  }

  async createPlaylist(userId, guildId, name, isPrivate = true) {
    try {
      const sql = `INSERT INTO user_playlists (user_id, guild_id, playlist_name, is_private)
                   VALUES (?, ?, ?, ?)`;
      const result = await this.db.run(sql, [userId, guildId, name, isPrivate ? 1 : 0]);
      logger.info(`Created playlist "${name}" for user ${userId}`);
      return result.id;
    } catch (error) {
      logger.error(`Failed to create playlist: ${error.message}`);
      throw error;
    }
  }

  async getPlaylist(playlistId) {
    try {
      const sql = `SELECT * FROM user_playlists WHERE id = ?`;
      return await this.db.get(sql, [playlistId]);
    } catch (error) {
      logger.error(`Failed to get playlist: ${error.message}`);
      throw error;
    }
  }

  async getUserPlaylists(userId, guildId) {
    try {
      const sql = `SELECT * FROM user_playlists WHERE user_id = ? AND guild_id = ? ORDER BY created_at DESC`;
      return await this.db.all(sql, [userId, guildId]);
    } catch (error) {
      logger.error(`Failed to get user playlists: ${error.message}`);
      throw error;
    }
  }

  async deletePlaylist(playlistId) {
    try {
      const sql = `DELETE FROM user_playlists WHERE id = ?`;
      await this.db.run(sql, [playlistId]);
      logger.info(`Deleted playlist ${playlistId}`);
    } catch (error) {
      logger.error(`Failed to delete playlist: ${error.message}`);
      throw error;
    }
  }

  async addTrackToPlaylist(playlistId, track, position) {
    try {
      const sql = `INSERT INTO playlist_tracks (playlist_id, track_title, track_url, artist, duration, source, position)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
      await this.db.run(sql, [
        playlistId,
        track.title,
        track.uri,
        track.author,
        track.length,
        track.source,
        position
      ]);
    } catch (error) {
      logger.error(`Failed to add track to playlist: ${error.message}`);
      throw error;
    }
  }

  async getPlaylistTracks(playlistId) {
    try {
      const sql = `SELECT * FROM playlist_tracks WHERE playlist_id = ? ORDER BY position ASC`;
      return await this.db.all(sql, [playlistId]);
    } catch (error) {
      logger.error(`Failed to get playlist tracks: ${error.message}`);
      throw error;
    }
  }

  async removeTrackFromPlaylist(trackId) {
    try {
      const sql = `DELETE FROM playlist_tracks WHERE id = ?`;
      await this.db.run(sql, [trackId]);
    } catch (error) {
      logger.error(`Failed to remove track from playlist: ${error.message}`);
      throw error;
    }
  }
}

export default PlaylistDB;
