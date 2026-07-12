import moment from 'moment';

export const formatTime = (ms) => {
  if (!ms || ms < 0) return '00:00';
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  }
  return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
};

export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const truncateString = (str, length = 50) => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substring(0, length - 3) + '...';
};

export const getProgressBar = (current, total, size = 20) => {
  if (total === 0) return '█'.repeat(size);
  const percentage = current / total;
  const filled = Math.round(percentage * size);
  const empty = size - filled;
  
  return '█'.repeat(filled) + '░'.repeat(empty);
};

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const escapeMarkdown = (text) => {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\*/g, '\\*')
    .replace(/_/g, '\\_')
    .replace(/~/g, '\\~')
    .replace(/`/g, '\\`')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]');
};

export const getRandomColor = () => {
  const colors = [
    0xFF0000, // Vermelho
    0x00FF00, // Verde
    0x0000FF, // Azul
    0xFFFF00, // Amarelo
    0xFF00FF, // Magenta
    0x00FFFF, // Ciano
    0xFF6600, // Laranja
    0xFF0099, // Rosa
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
