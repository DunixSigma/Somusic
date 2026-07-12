import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const config = {
  bot: {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.CLIENT_ID,
    prefix: process.env.PREFIX || '!',
  },
  lavalink: {
    host: process.env.LAVALINK_HOST || 'localhost',
    port: process.env.LAVALINK_PORT || 2333,
    password: process.env.LAVALINK_PASSWORD || 'youshallnotpass',
    secure: process.env.LAVALINK_SECURE === 'true',
  },
  database: {
    path: path.join(__dirname, '../data/somusic.db'),
  },
  debug: process.env.DEBUG === 'true',
};
