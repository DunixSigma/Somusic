import { COLORS, EMOJIS } from './constants.js';

export const createEmbed = (options = {}) => {
  const {
    title = '',
    description = '',
    color = COLORS.PRIMARY,
    fields = [],
    thumbnail = null,
    image = null,
    footer = null,
    author = null,
  } = options;

  const embed = {
    title,
    description,
    color,
    timestamp: new Date(),
  };

  if (fields.length > 0) embed.fields = fields;
  if (thumbnail) embed.thumbnail = { url: thumbnail };
  if (image) embed.image = { url: image };
  if (footer) embed.footer = footer;
  if (author) embed.author = author;

  return embed;
};

export const createSuccessEmbed = (title = '', description = '') => {
  return createEmbed({
    title: `${EMOJIS.SUCCESS} ${title}`,
    description,
    color: COLORS.SUCCESS,
  });
};

export const createErrorEmbed = (title = '', description = '') => {
  return createEmbed({
    title: `${EMOJIS.ERROR} ${title}`,
    description,
    color: COLORS.ERROR,
  });
};

export const createMusicEmbed = (title = '', description = '') => {
  return createEmbed({
    title: `${EMOJIS.MUSIC} ${title}`,
    description,
    color: COLORS.MUSIC,
  });
};
