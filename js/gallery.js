import { galleryCategories } from "../data/gallery.js";

const grid = document.getElementById("gallery-grid");
const tabs = [...document.querySelectorAll(".gallery-tab")];
let activeCategory = "blouses";

function ensureLightbox(){
  let box = document.querySelector(".lightbox");
  if (box) return box;
  box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = `<button class="lightbox-close" aria-label="Close image">×</button><img alt="Expanded gallery image">`;
  document.body.appendChild(box);
  box.addEventListener("click", e => { if (e.target === box) box.classList.remove("open"); });
  box.querySelector(".lightbox-close").addEventListener("click", () => box.classList.remove("open"));
  document.addEventListener("keydown", e => { if (e.key === "Escape") box.classList.remove("open"); });
  return box;
}
const lightbox = ensureLightbox();

function render(category){
  activeCategory = category;
  const images = (galleryCategories[category] || []).slice(0, 12);
  grid.innerHTML = "";
  if (!images.length) {
    grid.innerHTML = `<div class="gallery-empty"><strong>Collection coming soon.</strong><span>We are curating up to 12 selected examples for this category.</span></div>`;
    return;
  }
  images.forEach((src, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "google-gallery-item";
    button.setAttribute("aria-label", `View ${category} work ${i+1} larger`);
    const img = document.createElement("img");
    img.src = src; img.alt = `AA Embroidery Work — ${category} ${i+1}`; img.loading = "lazy";
    button.appendChild(img);
    button.addEventListener("click", () => {
      const big = lightbox.querySelector("img");
      big.src = src; big.alt = img.alt; lightbox.classList.add("open");
    });
    grid.appendChild(button);
  });
}

tabs.forEach(tab => tab.addEventListener("click", () => {
  tabs.forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
  tab.classList.add("active"); tab.setAttribute("aria-selected", "true");
  render(tab.dataset.galleryCategory);
}));

render(activeCategory);
