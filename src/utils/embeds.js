import { EmbedBuilder } from 'discord.js';
import { getRandomColor } from './formatters.js';

export const createEmbed = (options = {}) => {
  const embed = new EmbedBuilder()
    .setColor(options.color || getRandomColor())
    .setTimestamp();
  
  if (options.title) embed.setTitle(options.title);
  if (options.description) embed.setDescription(options.description);
  if (options.image) embed.setImage(options.image);
  if (options.thumbnail) embed.setThumbnail(options.thumbnail);
  if (options.author) embed.setAuthor(options.author);
  if (options.footer) embed.setFooter(options.footer);
  if (options.url) embed.setURL(options.url);
  
  if (options.fields && Array.isArray(options.fields)) {
    embed.addFields(options.fields);
  }
  
  return embed;
};

export const createSuccessEmbed = (title, description) => {
  return createEmbed({
    color: 0x00FF00,
    title,
    description
  });
};

export const createErrorEmbed = (title, description) => {
  return createEmbed({
    color: 0xFF0000,
    title,
    description
  });
};

export const createWarningEmbed = (title, description) => {
  return createEmbed({
    color: 0xFFFF00,
    title,
    description
  });
};

export const createInfoEmbed = (title, description) => {
  return createEmbed({
    color: 0x0099FF,
    title,
    description
  });
};
