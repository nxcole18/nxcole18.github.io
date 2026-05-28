// ── Typewriter Effect ──────────────────────────────────────────
const fullText = "hi! i'm nicole!";
const nicoleWord = "nicole";
const container = document.getElementById("typewriter-text");
const cursor = document.querySelector(".cursor");

let index = 0;
const typingSpeed = 90; // ms per character

// Find start/end positions of "nicole" in the full string
const nicoleStart = fullText.indexOf(nicoleWord);
const nicoleEnd = nicoleStart + nicoleWord.length;

function buildHTML(charIndex) {
  const typed = fullText.slice(0, charIndex);

  // Before "nicole" is fully typed, render plain text
  if (charIndex <= nicoleStart) {
    return typed;
  }

  // "nicole" is being typed or fully typed
  const before = fullText.slice(0, nicoleStart);
  const nicolePart = fullText.slice(nicoleStart, Math.min(charIndex, nicoleEnd));
  const after = charIndex > nicoleEnd ? fullText.slice(nicoleEnd, charIndex) : "";

  return (
    before +
    `<span class="nicole-highlight">${nicolePart}</span>` +
    after
  );
}

function type() {
  if (index <= fullText.length) {
    container.innerHTML = buildHTML(index);
    index++;
    setTimeout(type, typingSpeed);
  } else {
    // Typing done — hide cursor after brief pause
    setTimeout(() => {
      cursor.classList.add("done");
      triggerFadeIns();
    }, 400);
  }
}

// Start typewriter after a short delay
setTimeout(type, 300);


// ── Fade-in on Scroll ──────────────────────────────────────────
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
    { threshold: 0.15 }
  );

  elements.forEach((el, i) => {
    // Stagger each element slightly
    el.style.transitionDelay = `${i * 60}ms`;
    observer.observe(el);
  });
}
