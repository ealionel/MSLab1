/**
 *
 * @param {videojs.VideoJsPlayer} player
 */
const createVideoPlayerControl = (player) => {
  const exampleVideos = [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  ];

  const playlist = new Playlist(exampleVideos);

  return {
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
      player.src(src);
      player.load();
      player.play();
    },
    onFinish: (callback) => {
      player.on("end", callback);
    },
    playlist,
  };
};
