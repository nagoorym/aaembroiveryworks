import { site, whatsappUrl } from "../data/site.js";

document.querySelectorAll("[data-whatsapp]").forEach(el => {
  el.href = whatsappUrl(el.dataset.whatsapp);
});

const menu = document.querySelector(".menu");
const nav = document.querySelector(".navlinks");
menu?.addEventListener("click", () => nav.classList.toggle("open"));

const year = document.querySelector("[data-year]");
if(year) year.textContent = new Date().getFullYear();

document.querySelectorAll("[data-phone]").forEach(el => {
  el.href = `tel:${site.phone}`;
});
document.querySelectorAll("[data-email]").forEach(el => {
  el.href = `mailto:${site.email}`;
});
