import Logger from '../logs/Logger.js';

const logger = new Logger('VoiceStateUpdate');

export default {
  name: 'voiceStateUpdate',
  async execute(client, oldState, newState) {
    try {
      // Bot deixou um canal de voz
      if (oldState.member?.id === client.user.id && !newState.channel) {
        logger.info(`Bot left voice channel in guild ${oldState.guild.id}`);
        
        if (client.musicManager && client.musicManager.hasPlayer(oldState.guild.id)) {
          client.musicManager.deletePlayer(oldState.guild.id);
        }
      }
      
      // Usuário deixou o canal onde o bot está
      if (oldState.channel && !newState.channel && oldState.member?.id !== client.user.id) {
        const voiceChannel = oldState.channel;
        const botMember = voiceChannel.members.find(m => m.id === client.user.id);
        
        // Se o bot está sozinho no canal
        if (botMember && voiceChannel.members.size === 1) {
          logger.info(`Bot is alone in voice channel ${voiceChannel.id}, preparing to leave`);
          
          // Aguardar um pouco antes de sair
          setTimeout(async () => {
            if (voiceChannel.members.size === 1) {
              try {
                await botMember.voice.disconnect();
                logger.info(`Bot left empty voice channel`);
              } catch (error) {
                logger.error(`Failed to disconnect bot: ${error.message}`);
              }
            }
          }, 60000); // 1 minuto
        }
      }
    } catch (error) {
      logger.error(`Error in voiceStateUpdate: ${error.message}`);
    }
  }
};
