import { logger } from '../logs/logger.js';
import { MESSAGES, EMOJIS } from './constants.js';
import { createErrorEmbed } from './embeds.js';

export const handleError = async (interaction, error, message = MESSAGES.ERROR_OCCURRED) => {
  try {
    logger.error(`Erro em ${interaction.commandName || interaction.customId}:`, error);
    
    const embed = createErrorEmbed(
      `${EMOJIS.ERROR} Erro`,
      message
    );
    
    if (interaction.replied || interaction.deferred) {
      await interaction.editReply({ embeds: [embed] });
    } else {
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  } catch (err) {
    logger.error('Erro ao tratar erro:', err);
  }
};

export const handleWarning = async (interaction, message) => {
  try {
    const embed = createErrorEmbed(
      `${EMOJIS.WARNING} Aviso`,
      message
    );
    
    if (interaction.replied || interaction.deferred) {
      await interaction.editReply({ embeds: [embed] });
    } else {
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  } catch (err) {
    logger.error('Erro ao exibir aviso:', err);
  }
};

export const validateVoiceChannel = (member) => {
  if (!member.voice.channel) {
    return { valid: false, message: MESSAGES.NOT_IN_VOICE };
  }
  return { valid: true };
};

export const validateBotVoiceChannel = (guild) => {
  if (!guild.members.me?.voice.channel) {
    return { valid: false, message: MESSAGES.BOT_NOT_IN_VOICE };
  }
  return { valid: true };
};

export const validateSameVoiceChannel = (member, guild) => {
  const memberChannel = member.voice.channel;
  const botChannel = guild.members.me?.voice.channel;
  
  if (!memberChannel) {
    return { valid: false, message: MESSAGES.NOT_IN_VOICE };
  }
  
  if (!botChannel) {
    return { valid: false, message: MESSAGES.BOT_NOT_IN_VOICE };
  }
  
  if (memberChannel.id !== botChannel.id) {
    return { valid: false, message: MESSAGES.SAME_VOICE };
  }
  
  return { valid: true };
};
