import 'dotenv/config.js';

export const config = {
  bot: {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.DISCORD_CLIENT_ID,
    prefix: process.env.BOT_PREFIX || '!',
    language: process.env.BOT_LANGUAGE || 'pt',
  },
  lavalink: {
    host: process.env.LAVALINK_HOST || 'localhost',
    port: parseInt(process.env.LAVALINK_PORT) || 2333,
    password: process.env.LAVALINK_PASSWORD || 'youshallnotpass',
    secure: false,
  },
  database: {
    path: process.env.DATABASE_PATH || './data/database.sqlite',
  },
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID || '',
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
  },
  env: process.env.NODE_ENV || 'development',
  debug: process.env.DEBUG === 'true',
};
