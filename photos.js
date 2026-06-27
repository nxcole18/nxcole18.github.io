// ── Scattered Photos Lightbox ──────────────────────────────────
//
// TODO:
// 1. Create "photos" folder
// 2. Add images (e.g. photos/photo1.jpg)
// 3. Update the data-src and data-name attributes on each
//    .scatter-photo button in index.html to match your filenames
//
// Script will automatically swap the placeholder divs for
// real <img> tags once your files are in place.
// ──────────────────────────────────────────────────────────────

const lightbox      = document.getElementById("lightbox");
const lightboxImg   = document.getElementById("lightbox-img");
const lightboxLabel = document.getElementById("lightbox-label");
const closeBtn      = document.getElementById("lightbox-close");

// Swap placeholders for real images where files exist
document.querySelectorAll(".scatter-photo").forEach((btn) => {
  const src  = btn.getAttribute("data-src");
  const name = btn.getAttribute("data-name");
  const placeholder = btn.querySelector(".photo-placeholder");

  // Try loading the real image
  const testImg = new Image();
  testImg.onload = () => {
    // File exists — replace placeholder with real img
    const img = document.createElement("img");
    img.src = src;
    img.alt = name;
    placeholder.replaceWith(img);
  };
  testImg.src = src;

  // Open lightbox on click
  btn.addEventListener("click", () => {
    lightboxImg.src   = src;
    lightboxImg.alt   = name;
    lightboxLabel.textContent = name;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  });
});

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
  lightboxImg.src = "";
}

closeBtn.addEventListener("click", closeLightbox);

// Click backdrop to close
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Escape key to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});
