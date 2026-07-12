class PlayerState {
  constructor() {
    this.loop = 'off'; // off, track, queue
    this.autoplay = false;
    this.shuffle = false;
    this.volume = 50;
    this.seeking = false;
  }

  setLoop(mode) {
    if (['off', 'track', 'queue'].includes(mode)) {
      this.loop = mode;
    }
  }

  toggleAutoplay() {
    this.autoplay = !this.autoplay;
  }

  toggleShuffle() {
    this.shuffle = !this.shuffle;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(100, volume));
  }
}

export default PlayerState;
