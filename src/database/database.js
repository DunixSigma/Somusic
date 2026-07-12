import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { config } from '../../config.js';
import { logger } from '../logs/logger.js';

const dataDir = path.dirname(config.database.path);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(config.database.path, (err) => {
  if (err) {
    logger.error('Erro ao conectar ao banco de dados', err);
  } else {
    logger.success('Banco de dados conectado');
  }
});

db.run('PRAGMA foreign_keys = ON');

const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS guild_config (
          guild_id TEXT PRIMARY KEY,
          panel_channel_id TEXT,
          panel_message_id TEXT,
          volume INTEGER DEFAULT 100,
          loop_mode TEXT DEFAULT 'off',
          autoplay BOOLEAN DEFAULT 0,
          dj_role_id TEXT,
          prefix TEXT DEFAULT '!',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS favorites (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id TEXT NOT NULL,
          guild_id TEXT NOT NULL,
          title TEXT NOT NULL,
          url TEXT NOT NULL,
          duration INTEGER,
          thumbnail TEXT,
          author TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, url)
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS playlists (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id TEXT NOT NULL,
          guild_id TEXT NOT NULL,
          name TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS playlist_tracks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          playlist_id INTEGER NOT NULL,
          title TEXT NOT NULL,
          url TEXT NOT NULL,
          duration INTEGER,
          thumbnail TEXT,
          author TEXT,
          position INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id TEXT NOT NULL,
          guild_id TEXT NOT NULL,
          title TEXT NOT NULL,
          url TEXT NOT NULL,
          duration INTEGER,
          thumbnail TEXT,
          author TEXT,
          played_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS filters (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          guild_id TEXT NOT NULL UNIQUE,
          bassboost INTEGER DEFAULT 0,
          nightcore BOOLEAN DEFAULT 0,
          vaporwave BOOLEAN DEFAULT 0,
          pop BOOLEAN DEFAULT 0,
          phonk BOOLEAN DEFAULT 0,
          treble INTEGER DEFAULT 0,
          vibrato BOOLEAN DEFAULT 0,
          tremolo BOOLEAN DEFAULT 0,
          pitch REAL DEFAULT 1.0,
          speed REAL DEFAULT 1.0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS dj_permissions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          guild_id TEXT NOT NULL,
          user_id TEXT NOT NULL,
          can_skip BOOLEAN DEFAULT 1,
          can_pause BOOLEAN DEFAULT 1,
          can_queue BOOLEAN DEFAULT 1,
          can_remove BOOLEAN DEFAULT 1,
          can_loop BOOLEAN DEFAULT 0,
          can_shuffle BOOLEAN DEFAULT 0,
          can_volume BOOLEAN DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(guild_id, user_id)
        )
      `, (err) => {
        if (err) logger.error('Erro ao criar tabelas', err);
        else logger.success('Tabelas do banco de dados inicializadas');
        resolve();
      });
    });
  });
};

export const database = {
  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) {
          logger.error(`Erro ao executar query: ${sql}`, err);
          reject(err);
        } else {
          resolve({ id: this.lastID, changes: this.changes });
        }
      });
    });
  },

  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) {
          logger.error(`Erro ao obter dados: ${sql}`, err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          logger.error(`Erro ao obter múltiplas linhas: ${sql}`, err);
          reject(err);
        } else {
          resolve(rows || []);
        }
      });
    });
  },

  close: () => {
    return new Promise((resolve, reject) => {
      db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },

  initialize: initializeDatabase,
};
