class Playlist {
  queue = [];
  current = 0;

  constructor(initialQueue) {
    this.queue = initialQueue;
  }

  addVideo(src) {
    this.queue = [...this.queue, src];
  }

  removeVideo(index) {
    this.queue = this.queue.filter((_, i) => i !== index);
  }

  shuffle() {
    this.queue = shuffle(this.queue);
  }
}
