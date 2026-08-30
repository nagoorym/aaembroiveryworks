import { siteImages } from "../data/site-images.js";

function applyImages(){
  document.querySelectorAll(".hero-slide img").forEach((img,i)=>{if(siteImages.hero.items[i]) img.src=siteImages.hero.items[i]});
  document.querySelectorAll(".service-tile-image img").forEach((img,i)=>{if(siteImages.services.items[i]) img.src=siteImages.services.items[i]});
  document.querySelectorAll(".fashion-slide img").forEach((img,i)=>{if(siteImages.fashion.items[i]) img.src=siteImages.fashion.items[i]});
}
applyImages();