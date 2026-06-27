// ── Typewriter Effect ──────────────────────────────────────────
// The title types out as "nicolelu" where:
//   "nicole" = bold (via .nicole-bold)
//   "lu" = pink (via .lu-pink)
const part1 = "nicole"; // bold
const part2 = "lu"; // pink
const fullText = part1 + part2;
const container = document.getElementById("typewriter-text");
const cursor = document.querySelector(".cursor");
 
let index = 0;
const typingSpeed = 80;
 
function buildHTML(charIndex) {
  if (charIndex <= part1.length) {
    // Still typing "nicole"
    return `<span class="nicole-bold">${fullText.slice(0, charIndex)}</span>`;
  }
  // Typing into "lu"
  const pinkPart = fullText.slice(part1.length, charIndex);
  return `<span class="nicole-bold">${part1}</span><span class="nicole-pink">${pinkPart}</span>`;
}
 
function type() {
  if (index <= fullText.length) {
    container.innerHTML = buildHTML(index);
    index++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(() => {
      cursor.classList.add("done");
      triggerFadeIns();
    }, 400);
  }
}
 
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
