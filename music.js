// ── Music Player ───────────────────────────────────────────────
//
// TODO:
// 1. Create a folder called "music" next to your index.html
// 2. Add your .mp3 files there
// 3. Update the playlist array below with your real file paths,
//    track titles, and artist names
// ──────────────────────────────────────────────────────────────

const playlist = [
  { src: "music/track1.mp3", title: "u + me = <3",  artist: "olivia rodrigo" },
  { src: "music/track2.mp3", title: "track 2",  artist: "artist name" },
  { src: "music/track3.mp3", title: "track 3",  artist: "artist name" },
];

const audio       = document.getElementById("audio-player");
const playBtn     = document.getElementById("music-play");
const prevBtn     = document.getElementById("music-prev");
const nextBtn     = document.getElementById("music-next");
const titleEl     = document.getElementById("music-title");
const artistEl    = document.getElementById("music-artist");
const progressEl  = document.getElementById("music-progress");

let currentIndex = 0;
let isPlaying    = false;

function loadTrack(index) {
  const track = playlist[index];
  audio.src       = track.src;
  titleEl.textContent  = track.title;
  artistEl.textContent = track.artist;
  progressEl.style.width = "0%";
}

function play() {
  audio.play().catch(() => {});
  isPlaying = true;
  playBtn.textContent  = "⏸";
  playBtn.setAttribute("aria-label", "pause");
}

function pause() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent  = "▶";
  playBtn.setAttribute("aria-label", "play");
}

function goTo(index) {
  currentIndex = (index + playlist.length) % playlist.length;
  loadTrack(currentIndex);
  if (isPlaying) play();
}

// Controls
playBtn.addEventListener("click", () => {
  isPlaying ? pause() : play();
});

prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

// Auto-advance to next track when one finishes
audio.addEventListener("ended", () => goTo(currentIndex + 1));

// Progress bar
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressEl.style.width = pct + "%";
});

// Click progress bar to seek
document.querySelector(".music-progress-bar").addEventListener("click", (e) => {
  if (!audio.duration) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const pct  = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pct * audio.duration;
});

// Load the first track on page load
loadTrack(currentIndex);
