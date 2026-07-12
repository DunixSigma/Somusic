import Logger from '../logs/Logger.js';

const logger = new Logger('Embeds');

class EmbedBuilder {
  static createNowPlayingEmbed(track, player, requestedBy, duration, position) {
    const progressPercentage = (position / duration) * 100;
    const progressBar = this.createProgressBar(progressPercentage);

    return {
      color: 0x0099ff,
      title: '🎵 Now Playing',
      description: `[${track.title}](${track.uri})`,
      fields: [
        {
          name: 'Artist',
          value: track.author || 'Unknown',
          inline: true
        },
        {
          name: 'Requested By',
          value: requestedBy ? `<@${requestedBy}>` : 'System',
          inline: true
        },
        {
          name: 'Duration',
          value: `${this.formatTime(position)} / ${this.formatTime(duration)}`,
          inline: true
        },
        {
          name: 'Volume',
          value: `${player?.state?.volume || 50}%`,
          inline: true
        },
        {
          name: 'Loop',
          value: (player?.state?.loop || 'off').charAt(0).toUpperCase() + (player?.state?.loop || 'off').slice(1),
          inline: true
        },
        {
          name: 'Autoplay',
          value: player?.state?.autoplay ? '✅' : '❌',
          inline: true
        },
        {
          name: 'Progress',
          value: progressBar,
          inline: false
        }
      ],
      thumbnail: {
        url: track.thumbnail || 'https://via.placeholder.com/300'
      },
      footer: {
        text: `Queue: ${player?.queue?.size() || 0} tracks | Ping: ${this.ping}ms`
      }
    };
  }

  static createQueueEmbed(tracks, page = 1, itemsPerPage = 10) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = tracks.slice(start, end);

    const fields = pageItems.map((track, index) => ({
      name: `${start + index + 1}. ${track.title}`,
      value: `${track.author} • ${this.formatTime(track.length || 0)}`,
      inline: false
    }));

    return {
      color: 0x0099ff,
      title: '📜 Queue',
      description: `Showing tracks ${start + 1}-${Math.min(end, tracks.length)} of ${tracks.length}`,
      fields: fields.length > 0 ? fields : [{ name: 'Queue is empty', value: 'No tracks in queue' }],
      footer: {
        text: `Page ${page} of ${Math.ceil(tracks.length / itemsPerPage)}`
      }
    };
  }

  static createPlaylistEmbed(playlist, tracks) {
    return {
      color: 0x0099ff,
      title: `📋 ${playlist.playlist_name}`,
      description: `${tracks.length} tracks • Private: ${playlist.is_private ? '🔒' : '🔓'}`,
      fields: [
        {
          name: 'Total Duration',
          value: this.formatTime(tracks.reduce((acc, t) => acc + (t.duration || 0), 0)),
          inline: true
        },
        {
          name: 'Created',
          value: new Date(playlist.created_at).toLocaleDateString(),
          inline: true
        }
      ]
    };
  }

  static createErrorEmbed(title, description) {
    return {
      color: 0xff0000,
      title: `❌ ${title}`,
      description: description,
      timestamp: new Date()
    };
  }

  static createSuccessEmbed(title, description) {
    return {
      color: 0x00ff00,
      title: `✅ ${title}`,
      description: description,
      timestamp: new Date()
    };
  }

  static formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    }
    return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
  }

  static createProgressBar(percentage, length = 20) {
    const filled = Math.round((percentage / 100) * length);
    const empty = length - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    return `${bar} ${Math.round(percentage)}%`;
  }
}

export default EmbedBuilder;
