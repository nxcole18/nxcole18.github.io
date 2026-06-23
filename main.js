/* ══════════════════════════════════════════════════════
   Nicole Lu — Homepage
   ══════════════════════════════════════════════════════ */


/* ── 1. Active nav link ─────────────────────────────────
   Adds an underline to whichever nav link matches
   the current page URL. Works across all pages.
   ───────────────────────────────────────────────────── */
(function markActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(link => {
    const linkFile = link.getAttribute('href');
    if (linkFile === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();


/* ── 2. Earbuds / Spotify popup ─────────────────────────
   Click the earbuds image to open the Spotify embed
   ───────────────────────────────────────────────────── */
(function initMusicPlayer() {
  const earbudsBtn   = document.getElementById('earbuds-btn');
  const spotifyPop   = document.getElementById('spotify-popup');
  const spotifyClose = document.getElementById('spotify-close');

  if (!earbudsBtn || !spotifyPop) return;

  function openPopup() {
    spotifyPop.classList.add('open');
    earbudsBtn.setAttribute('aria-expanded', 'true');
    spotifyPop.setAttribute('aria-hidden', 'false');
  }

  function closePopup() {
    spotifyPop.classList.remove('open');
    earbudsBtn.setAttribute('aria-expanded', 'false');
    spotifyPop.setAttribute('aria-hidden', 'true');
  }

  earbudsBtn.addEventListener('click', () => {
    spotifyPop.classList.contains('open') ? closePopup() : openPopup();
  });

  spotifyClose.addEventListener('click', closePopup);

  document.addEventListener('click', (e) => {
    if (
      spotifyPop.classList.contains('open') &&
      !spotifyPop.contains(e.target) &&
      !earbudsBtn.contains(e.target)
    ) {
      closePopup();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && spotifyPop.classList.contains('open')) {
      closePopup();
      earbudsBtn.focus();
    }
  });
})();


/* ── 3. Caption fade-in ─────────────────────────────────
   Renders the full caption immediately, then fades it
   in via a CSS class after a short delay.
   ───────────────────────────────────────────────────── */
(function initCaption() {
  const captionEl = document.getElementById('caption-text');
  if (!captionEl) return;

  const PLAIN        = 'hey there! welcome to my '; // regular-weight part
  const BOLD         = 'website';                    // bold part at the end
  const START_DELAY  = 900;                          // ms before fade begins

  captionEl.innerHTML =
    PLAIN + `<span class="caption-bold">${BOLD}</span>`;

  setTimeout(() => {
    captionEl.classList.add('visible');
  }, START_DELAY);
})();
