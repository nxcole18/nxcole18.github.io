// ── Typewriter for "text art!" ─────────────────────────────────
const fullText = "text art!";
const highlightWord = "art";
const container = document.getElementById("typewriter-text");
const cursor = document.querySelector(".cursor");

const highlightStart = fullText.indexOf(highlightWord);
const highlightEnd = highlightStart + highlightWord.length;

let index = 0;

function buildHTML(charIndex) {
  const typed = fullText.slice(0, charIndex);
  if (charIndex <= highlightStart) return typed;

  const before = fullText.slice(0, highlightStart);
  const highlighted = fullText.slice(highlightStart, Math.min(charIndex, highlightEnd));
  const after = charIndex > highlightEnd ? fullText.slice(highlightEnd, charIndex) : "";

  return before + `<span class="nicole-highlight">${highlighted}</span>` + after;
}

function type() {
  if (index <= fullText.length) {
    container.innerHTML = buildHTML(index);
    index++;
    setTimeout(type, 80);
  } else {
    setTimeout(() => {
      cursor.classList.add("done");
      triggerFadeIns();
    }, 400);
  }
}

setTimeout(type, 300);

// ── Fade-ins ───────────────────────────────────────────────────
function triggerFadeIns() {
  const elements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  elements.forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
    observer.observe(el);
  });
}

// ── Copy to Clipboard ──────────────────────────────────────────
const toast = document.getElementById("toast");
let toastTimeout;

document.querySelectorAll(".art-card").forEach((card) => {
  card.addEventListener("click", () => {
    const art = card.getAttribute("data-art").trim();

    navigator.clipboard.writeText(art).then(() => {
      // Flash card
      card.classList.add("copied");
      setTimeout(() => card.classList.remove("copied"), 1200);

      // Show toast
      clearTimeout(toastTimeout);
      toast.classList.add("show");
      toastTimeout = setTimeout(() => toast.classList.remove("show"), 2000);
    });
  });
});
