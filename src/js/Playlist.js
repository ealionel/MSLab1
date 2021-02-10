class Playlist {
  queue = [];
  current = 0;
  player = null;
  observers = [];

  constructor(initialQueue) {
    this.queue = initialQueue || [];
  }

  addVideo(src) {
    this.queue = [...this.queue, src];
    this.notifyAll();
  }

  removeVideo(index) {
    this.queue = this.queue.filter((_, i) => i !== index);
    this.notifyAll();
  }

  shuffle() {
    this.queue = shuffle(this.queue);
    this.notifyAll();
  }

  subscribe(observer) {
    this.observers.push(observer);
    return this.unsubscribe(observer);
  }

  unsubscribe(observer) {
    this.observers.filter((obs) => obs !== observer);
  }

  notifyAll() {
    this.observers.forEach((observer) => observer(this));
  }
}

/**
 *
 * @param {Playlist} playlist
 * @param {string} src
 * @param {number} index
 */
const createPlaylistQueueElement = (controls, src, index) => {
  const div = document.createElement("div");
  div.className = "playlist-queue-element-div";

  const itemTitle = document.createElement("p");
  itemTitle.innerHTML = src;
  itemTitle.className = "title";

  const loadButton = document.createElement("button");
  loadButton.type = "button";
  loadButton.innerHTML = "Load";
  loadButton.className = "load-button";

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.innerHTML = "Remove";
  removeButton.className = "remove-button";

  loadButton.addEventListener("click", () => {
    console.log(`Setting ${src} as source`);
    controls.load(src);
  });

  removeButton.addEventListener("click", () =>
    controls.playlist.removeVideo(index)
  );

  div.appendChild(itemTitle);
  div.appendChild(loadButton);
  div.appendChild(removeButton);

  return div;
};

/**
 *
 * @param {Element} playlistDOM
 */
const initializeDOMPlaylist = (playlistDOM, controls) => {
  const playlistAddButton = playlistDOM.querySelector(".playlist-add-button");
  const playlistAddInput = playlistDOM.querySelector(".playlist-add-input");
  const playlistShuffleButton = playlistDOM.querySelector(
    ".playlist-shuffle-button"
  );

  const playlistObserver = (playlist) => {
    // Rerenders the whole playlist DOM child whenever there is a change
    const queueDOM = playlistDOM.querySelector(".playlist-queue-div");

    queueDOM.innerHTML = "";

    playlist.queue.forEach((src, index) => {
      const queueElement = createPlaylistQueueElement(controls, src, index);
      queueDOM.appendChild(queueElement);
    });
  };

  controls.playlist.subscribe(playlistObserver);
  controls.playlist.notifyAll();

  playlistAddButton.addEventListener("click", () =>
    controls.playlist.addVideo(playlistAddInput.value)
  );

  playlistShuffleButton.addEventListener("click", () => playlist.shuffle());

  controls.onFinish((playlist) => {});
};
