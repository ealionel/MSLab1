const controlButtons = {
  play: document.querySelector("#play-button"),
  pause: document.querySelector("#pause-button"),
  stop: document.querySelector("#stop-button"),
  jumpForward: document.querySelector("#jump-forward-button"),
  jumpBackward: document.querySelector("#jump-backward-button"),
};

const mainPlayer = videojs("main-video");

const playlistDOM = document.querySelector(".playlist-div");

const controls = createVideoPlayerControl(mainPlayer);

controlButtons.play.addEventListener("click", controls.play);
controlButtons.pause.addEventListener("click", controls.pause);
controlButtons.jumpForward.addEventListener("click", controls.jumpForward);
controlButtons.jumpBackward.addEventListener("click", controls.jumpBackward);

initializeDOMPlaylist(playlistDOM, controls);
