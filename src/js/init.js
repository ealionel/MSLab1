const mainPlayer = videojs("main-video");

const controls = createVideoPlayerControl(mainPlayer);

mapButtonsToHandler();

const playlistDOM = document.querySelector(".playlist-div");
const playlist = new Playlist();

initializeDOMPlaylist(playlistDOM, playlist, controls);
