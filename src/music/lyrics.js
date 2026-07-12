import axios from 'axios';
import { logger } from '../logs/logger.js';

const GENIUS_API = 'https://api.genius.com';

export const searchLyrics = async (title, artist) => {
  try {
    const query = `${title} ${artist}`.replace(/\s+/g, ' ');
    
    const response = await axios.get(`${GENIUS_API}/search`, {
      params: { q: query },
      headers: {
        'Authorization': `Bearer ${process.env.GENIUS_TOKEN || 'temp'}`,
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (response.data.response.hits.length === 0) {
      return null;
    }

    const song = response.data.response.hits[0].result;
    return {
      title: song.title,
      artist: song.primary_artist.name,
      url: song.url,
      thumbnail: song.song_art_image_thumbnail_url
    };
  } catch (error) {
    logger.warn('Erro ao pesquisar letras:', error);
    return null;
  }
};

export const getLyricsFromGenius = async (songUrl) => {
  try {
    const response = await axios.get(songUrl);
    const html = response.data;
    
    // Extrair letras do HTML (simplificado)
    const lyricsMatch = html.match(/<!---->([\s\S]*?)<!---->/g);
    if (!lyricsMatch) return null;

    let lyrics = lyricsMatch
      .map(m => m.replace(/<!---->/g, '').trim())
      .filter(l => l.length > 0)
      .join('\n');

    if (lyrics.length > 4000) {
      lyrics = lyrics.substring(0, 3997) + '...';
    }

    return lyrics;
  } catch (error) {
    logger.warn('Erro ao obter letras do Genius:', error);
    return null;
  }
};
