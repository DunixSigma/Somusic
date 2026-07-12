class Queue {
  constructor() {
    this.tracks = [];
    this.currentIndex = 0;
  }

  add(track) {
    this.tracks.push(track);
  }

  addBulk(tracks) {
    this.tracks.push(...tracks);
  }

  remove(index) {
    if (index >= 0 && index < this.tracks.length) {
      this.tracks.splice(index, 1);
    }
  }

  move(fromIndex, toIndex) {
    if (fromIndex >= 0 && fromIndex < this.tracks.length &&
        toIndex >= 0 && toIndex < this.tracks.length) {
      const [track] = this.tracks.splice(fromIndex, 1);
      this.tracks.splice(toIndex, 0, track);
    }
  }

  clear() {
    this.tracks = [];
    this.currentIndex = 0;
  }

  shuffle() {
    for (let i = this.tracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tracks[i], this.tracks[j]] = [this.tracks[j], this.tracks[i]];
    }
  }

  getCurrent() {
    return this.tracks[this.currentIndex];
  }

  getNext() {
    const next = this.currentIndex + 1;
    return this.tracks[next] || null;
  }

  getPrevious() {
    const prev = this.currentIndex - 1;
    return this.tracks[prev] || null;
  }

  size() {
    return this.tracks.length;
  }

  isEmpty() {
    return this.tracks.length === 0;
  }

  getTracks(start = 0, limit = 10) {
    return this.tracks.slice(start, start + limit);
  }
}

export default Queue;
