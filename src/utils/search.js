import axios from 'axios';
import { logger } from '../logs/logger.js';

export const searchYouTube = async (query) => {
  try {
    const response = await axios.get('https://www.youtube.com/results', {
      params: { search_query: query },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const videoIds = response.data.match(/"videoId":"([a-zA-Z0-9_-]{11})"/g);
    if (!videoIds || videoIds.length === 0) return null;
    
    const videoId = videoIds[0].split('"')[3];
    return `https://www.youtube.com/watch?v=${videoId}`;
  } catch (error) {
    logger.error('Erro ao pesquisar YouTube', error);
    return null;
  }
};

export const isValidYouTubeUrl = (url) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\//;
  return youtubeRegex.test(url);
};

export const isValidSpotifyUrl = (url) => {
  const spotifyRegex = /^(https?:\/\/)?(www\.)?spotify\.com\/(track|playlist|album)/;
  return spotifyRegex.test(url);
};

export const isValidSoundCloudUrl = (url) => {
  const soundcloudRegex = /^(https?:\/\/)?(www\.)?soundcloud\.com\//;
  return soundcloudRegex.test(url);
};

export const extractVideoId = (url) => {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
