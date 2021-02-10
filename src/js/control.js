const controlButtons = {
  play: document.querySelector("#play-button"),
  pause: document.querySelector("#pause-button"),
  stop: document.querySelector("#stop-button"),
  jumpForward: document.querySelector("#jump-forward-button"),
  jumpBackward: document.querySelector("#jump-backward-button"),
};

/**
 *
 * @param {videojs.VideoJsPlayer} player
 */
const createVideoPlayerControl = (player) => ({
  play: () => {
    player.play();
  },
  pause: () => {
    player.pause();
  },
  stop: () => {
    player.stop();
  },
  jumpForward: () => {
    player.currentTime(player.currentTime() + 5);
  },
  jumpBackward: () => {
    player.currentTime(player.currentTime() - 5);
  },
  load: (src) => {
    player.src = src;
    player.load();
    console.log(player.currentType());
  },
});

const mapButtonsToHandler = () => {
  controlButtons.play.addEventListener("click", controls.play);
  controlButtons.pause.addEventListener("click", controls.pause);
  controlButtons.jumpForward.addEventListener("click", controls.jumpForward);
  controlButtons.jumpBackward.addEventListener("click", controls.jumpBackward);
};
