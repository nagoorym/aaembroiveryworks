(() => {
  function initHero() {
    const track = document.getElementById("hero-track");
    const media = document.querySelector(".hero-media");
    const dots = document.querySelector(".hero-media .slider-dots");
    const prevBtn = document.querySelector(".hero-arrow.prev");
    const nextBtn = document.querySelector(".hero-arrow.next");
    if (!track || !media || !dots) return;

    const slides = Array.from(track.querySelectorAll(".hero-slide"));
    if (slides.length < 2) return;

    let current = 0;
    let timer;
    const AUTOPLAY_MS = 2000;

    dots.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Show hero image " + (i + 1));
      dot.addEventListener("click", () => {
        goTo(i);
        restart();
      });
      dots.appendChild(dot);
    });

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = "translateX(-" + (current * 100) + "%)";
      Array.from(dots.children).forEach((dot, i) => dot.classList.toggle("active", i === current));
    }

    function start() {
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), AUTOPLAY_MS);
    }

    function restart() { start(); }

    prevBtn?.addEventListener("click", () => { goTo(current - 1); restart(); });
    nextBtn?.addEventListener("click", () => { goTo(current + 1); restart(); });

    // Keep automatic scrolling active continuously at a 2-second interval.
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearInterval(timer);
      else start();
    });

    goTo(0);
    start();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHero, { once: true });
  } else {
    initHero();
  }
})();