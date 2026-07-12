import { MESSAGES } from './constants.js';

export const validateSameVoiceChannel = (member, guild) => {
  const botMember = guild.members.cache.get(guild.client.user.id);
  
  if (!member.voice.channel) {
    return { valid: false, message: MESSAGES.NOT_IN_VOICE };
  }

  if (!botMember.voice.channel) {
    return { valid: false, message: MESSAGES.BOT_NOT_IN_VOICE };
  }

  if (member.voice.channel.id !== botMember.voice.channel.id) {
    return { valid: false, message: MESSAGES.NOT_SAME_VOICE };
  }

  return { valid: true };
};

export const hasPermission = (member, permission) => {
  return member.permissions.has(permission);
};

export const handleError = async (interaction, error) => {
  console.error(error);
  const content = `Erro: ${error.message || MESSAGES.ERROR_OCCURRED}`;
  
  if (interaction.replied) {
    await interaction.editReply({ content });
  } else if (interaction.deferred) {
    await interaction.editReply({ content });
  } else {
    await interaction.reply({ content, ephemeral: true });
  }
};
