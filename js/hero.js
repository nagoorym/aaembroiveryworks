document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector("#hero-track");
  const dots = document.querySelector(".hero-media .slider-dots");
  const hero = document.querySelector(".hero");
  if (!track || !dots) return;

  // Get slides from the actual DOM
  const slides = document.querySelectorAll(".hero-slide");
  const slideCount = slides.length;
  if (slideCount === 0) return;

  let current = 0;
  let timer = null;
  const AUTOPLAY_MS = 2000;

  // Preload all images.
  slides.forEach(slide => {
    const img = slide.querySelector("img");
    if (img) {
      const preload = new Image();
      preload.src = img.src;
    }
  });

  // Create dots for each slide
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show hero image ${i + 1}`);
    dot.className = i === 0 ? "active" : "";
    dot.addEventListener("click", () => {
      goTo(i);
      restart();
    });
    dots.appendChild(dot);
  });

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translate3d(-${current * 100}%, 0, 0)`;
    [...dots.children].forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });
  }

  function next() {
    goTo(current + 1);
  }

  function previous() {
    goTo(current - 1);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function start() {
    stop();
    timer = window.setInterval(next, AUTOPLAY_MS);
  }

  function restart() {
    start();
  }

  document.querySelector(".hero-arrow.prev")?.addEventListener("click", () => {
    previous();
    restart();
  });

  document.querySelector(".hero-arrow.next")?.addEventListener("click", () => {
    next();
    restart();
  });

  // Pause while the pointer is over the hero, then resume.
  hero?.addEventListener("mouseenter", stop);
  hero?.addEventListener("mouseleave", start);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  // Start immediately; first movement occurs exactly 2 seconds later.
  goTo(0);
  start();
});
