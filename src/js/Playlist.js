const PlaylistEvent = {
  PLAYLIST_CHANGE: "playlistChange",
  CURRENT_VIDEO_CHANGE: "currentVideoChange",
};

class Playlist {
  queue = [];
  current = 0;
  player = null;
  subscribers = [];

  constructor(initialQueue) {
    this.queue = initialQueue || [];
  }

  addVideo(src) {
    this.queue = [...this.queue, src];
    this.notifyAll(PlaylistEvent.PLAYLIST_CHANGE);
  }

  removeVideo(index) {
    this.queue = this.queue.filter((_, i) => i !== index);
    this.notifyAll(PlaylistEvent.PLAYLIST_CHANGE);
  }

  shuffle() {
    this.queue = shuffle(this.queue);
    this.notifyAll(PlaylistEvent.PLAYLIST_CHANGE);
  }

  getCurrent() {
    return this.queue[this.current];
  }

  setCurrent(current) {
    this.current = current;
    this.notifyAll(PlaylistEvent.CURRENT_VIDEO_CHANGE);
  }

  getCurrentIndex() {
    return this.current;
  }

  getPlaylistLength() {
    return this.queue.length;
  }

  nextVideo() {
    if (this.hasNext()) this.setCurrent(this.current + 1);
  }

  previousVideo() {
    if (this.hasPrevious()) this.setCurrent(this.current - 1);
  }

  hasNext() {
    return this.isEmpty() || this.current < this.getPlaylistLength() - 1;
  }

  hasPrevious() {
    return this.isEmpty() || this.current > 0;
  }

  isEmpty() {
    return this.getPlaylistLength() === 0;
  }

  subscribe(event, observer) {
    const subscribed = {
      event,
      observer,
    };

    this.subscribers.push(subscribed);

    return this.unsubscribe(subscribed);
  }

  unsubscribe(subscriber) {
    this.subscribers.filter((obs) => obs !== subscriber);
  }

  notifyAll(event) {
    this.subscribers.forEach((sub) => {
      if (sub.event === event) sub.observer(this);
    });
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
  div.classList.add("playlist-queue-element-div");

  if (controls.playlist.getCurrentIndex() === index) {
    div.classList.add("playing");
  }

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
    console.log(`Setting ${index} ${src} as source`);
    controls.playlist.setCurrent(index);
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

  controls.playlist.subscribe(PlaylistEvent.PLAYLIST_CHANGE, playlistObserver);
  controls.playlist.notifyAll(PlaylistEvent.PLAYLIST_CHANGE);

  playlistAddButton.addEventListener("click", () =>
    controls.playlist.addVideo(playlistAddInput.value)
  );

  playlistShuffleButton.addEventListener("click", () => playlist.shuffle());

  const handleVideoChange = (playlist) => {
    controls.load(playlist.getCurrent());
    playlistObserver(playlist);
  };

  controls.playlist.subscribe(
    PlaylistEvent.CURRENT_VIDEO_CHANGE,
    handleVideoChange
  );

  // Handles when video finishes to go to next one
  controls.onFinish((playlist) => {
    if (playlist.hasNext()) {
      console.log("Loading next video");
      playlist.nextVideo();
    } else {
      console.log("End of playlist");
      controls.pause();
    }
  });

  console.log("Playlist initialization finished");
};
