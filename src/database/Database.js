import sqlite3 from 'sqlite3';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Logger from '../logs/Logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logger = new Logger('Database');

class Database {
  constructor(dbPath) {
    this.dbPath = dbPath;
    this.db = null;
    this.ready = false;
  }

  async initialize() {
    return new Promise((resolve, reject) => {
      const dir = path.dirname(this.dbPath);
      fs.mkdir(dir, { recursive: true }).then(() => {
        this.db = new sqlite3.Database(this.dbPath, (err) => {
          if (err) {
            logger.error(`Failed to initialize database: ${err.message}`);
            reject(err);
          } else {
            logger.info(`Database connected at ${this.dbPath}`);
            this.ready = true;
            this.createTables().then(resolve).catch(reject);
          }
        });
      });
    });
  }

  async createTables() {
    const tables = [
      `CREATE TABLE IF NOT EXISTS guild_settings (
        guild_id TEXT PRIMARY KEY,
        panel_channel_id TEXT,
        panel_message_id TEXT,
        volume INTEGER DEFAULT 50,
        loop TEXT DEFAULT 'off',
        autoplay BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS user_favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        guild_id TEXT NOT NULL,
        track_title TEXT NOT NULL,
        track_url TEXT NOT NULL,
        artist TEXT,
        duration INTEGER,
        source TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, guild_id, track_url)
      )`,
      `CREATE TABLE IF NOT EXISTS user_playlists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        guild_id TEXT NOT NULL,
        playlist_name TEXT NOT NULL,
        is_private BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, guild_id, playlist_name)
      )`,
      `CREATE TABLE IF NOT EXISTS playlist_tracks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        playlist_id INTEGER NOT NULL,
        track_title TEXT NOT NULL,
        track_url TEXT NOT NULL,
        artist TEXT,
        duration INTEGER,
        source TEXT,
        position INTEGER NOT NULL,
        added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(playlist_id) REFERENCES user_playlists(id) ON DELETE CASCADE
      )`,
      `CREATE TABLE IF NOT EXISTS user_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        guild_id TEXT NOT NULL,
        track_title TEXT NOT NULL,
        track_url TEXT NOT NULL,
        artist TEXT,
        duration INTEGER,
        source TEXT,
        played_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS guild_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guild_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        track_title TEXT NOT NULL,
        track_url TEXT NOT NULL,
        artist TEXT,
        duration INTEGER,
        source TEXT,
        played_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS user_dj_roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guild_id TEXT NOT NULL,
        role_id TEXT NOT NULL,
        UNIQUE(guild_id, role_id)
      )`,
      `CREATE TABLE IF NOT EXISTS user_filters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        guild_id TEXT NOT NULL,
        filter_type TEXT NOT NULL,
        filter_value TEXT NOT NULL,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, guild_id, filter_type)
      )`
    ];

    for (const table of tables) {
      await this.run(table);
    }

    logger.info('All database tables created successfully');
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          logger.error(`Database error: ${err.message}`);
          reject(err);
        } else {
          resolve({ id: this.lastID, changes: this.changes });
        }
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          logger.error(`Database error: ${err.message}`);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          logger.error(`Database error: ${err.message}`);
          reject(err);
        } else {
          resolve(rows || []);
        }
      });
    });
  }

  async close() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        this.db.close((err) => {
          if (err) {
            logger.error(`Failed to close database: ${err.message}`);
            reject(err);
          } else {
            logger.info('Database connection closed');
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }
}

export default Database;
