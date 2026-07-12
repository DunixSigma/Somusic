import { logger } from '../logs/logger.js';

export const validatePermissions = (member, permissions = []) => {
  if (!member) return false;
  if (member.permissions.has('Administrator')) return true;
  
  for (const permission of permissions) {
    if (!member.permissions.has(permission)) {
      return false;
    }
  }
  
  return true;
};

export const validateBotPermissions = (member, permissions = []) => {
  if (!member) return false;
  
  const requiredPerms = ['Connect', 'Speak', ...permissions];
  for (const permission of requiredPerms) {
    if (!member.permissions.has(permission)) {
      return false;
    }
  }
  
  return true;
};

export const hasRole = (member, roleId) => {
  if (!member) return false;
  return member.roles.cache.has(roleId);
};

export const hasAnyRole = (member, roleIds = []) => {
  if (!member) return false;
  return roleIds.some(roleId => member.roles.cache.has(roleId));
};

export const isOwner = (userId, ownerId) => {
  return userId === ownerId;
};

export const isInVoiceChannel = (member) => {
  if (!member) return false;
  return !!member.voice.channel;
};

export const isBotInVoiceChannel = (guild) => {
  if (!guild) return false;
  return !!guild.members.me?.voice.channel;
};

export const getVoiceChannel = (member) => {
  if (!member) return null;
  return member.voice.channel;
};

export const getBotVoiceChannel = (guild) => {
  if (!guild) return null;
  return guild.members.me?.voice.channel;
};
