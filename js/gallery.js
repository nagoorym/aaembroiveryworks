import { siteImages } from "../data/site-images.js";
const PAGE_SIZE=12;
const grid=document.getElementById("gallery-grid");
const tabs=[...document.querySelectorAll(".gallery-tab")];
let activeCategory="blouses",currentPage=1,currentImages=[];
const map={blouses:"galleryBlouses",logos:"galleryLogos",custom:"galleryCustom",prints:"galleryPrints"};
function ensureLightbox(){
 let box=document.querySelector(".lightbox");if(box)return box;
 box=document.createElement("div");box.className="lightbox";
 box.innerHTML='<button class="lightbox-close" aria-label="Close image">×</button><button class="lightbox-nav lightbox-prev" aria-label="Previous image">←</button><img alt="Expanded gallery image"><button class="lightbox-nav lightbox-next" aria-label="Next image">→</button><div class="lightbox-count"></div>';
 document.body.appendChild(box);
 box.addEventListener("click",e=>{if(e.target===box)box.classList.remove("open")});
 box.querySelector(".lightbox-close").onclick=()=>box.classList.remove("open");
 document.addEventListener("keydown",e=>{if(!box.classList.contains("open"))return;if(e.key==="Escape")box.classList.remove("open");if(e.key==="ArrowLeft")move(-1);if(e.key==="ArrowRight")move(1)});
 return box;
}
const lightbox=ensureLightbox();let lightboxIndex=0;
function openImage(index){lightboxIndex=index;const img=lightbox.querySelector("img"),src=currentImages[lightboxIndex];img.src=src;img.alt=`AA Embroidery Work — ${activeCategory} ${lightboxIndex+1}`;lightbox.querySelector(".lightbox-count").textContent=`${lightboxIndex+1} / ${currentImages.length}`;lightbox.classList.add("open")}
function move(dir){if(!currentImages.length)return;lightboxIndex=(lightboxIndex+dir+currentImages.length)%currentImages.length;openImage(lightboxIndex)}
lightbox.querySelector(".lightbox-prev").onclick=()=>move(-1);
lightbox.querySelector(".lightbox-next").onclick=()=>move(1);
function scrollGalleryToTop(){
 const section=document.getElementById("our-work");
 if(section)section.scrollIntoView({behavior:"smooth",block:"start"});
}
function render(category=activeCategory,page=1){
 activeCategory=category;currentPage=page;
 currentImages=siteImages[map[category]]?.items||[];
 const pages=Math.max(1,Math.ceil(currentImages.length/PAGE_SIZE)),safe=Math.min(page,pages),start=(safe-1)*PAGE_SIZE,visible=currentImages.slice(start,start+PAGE_SIZE);
 document.querySelectorAll(".gallery-pagination").forEach(x=>x.remove());grid.innerHTML="";
 if(!visible.length){grid.innerHTML='<div class="gallery-empty"><strong>Collection coming soon.</strong><span>We are curating this collection.</span></div>';return}
 visible.forEach((src,i)=>{const index=start+i;const item=document.createElement("button");item.type="button";item.className="google-gallery-item";item.innerHTML='<img src="'+src+'" loading="lazy" alt="AA Embroidery Work gallery image"><span class="gallery-view">View</span>';item.onclick=()=>openImage(index);grid.appendChild(item)});
 if(pages>1){const nav=document.createElement("div");nav.className="gallery-pagination";nav.innerHTML=Array.from({length:pages},(_,i)=>'<button class="'+(i+1===safe?'active':'')+'" data-p="'+(i+1)+'">'+(i+1)+'</button>').join("");nav.querySelectorAll("button").forEach(b=>b.onclick=()=>{render(activeCategory,+b.dataset.p);scrollGalleryToTop()});grid.after(nav)}
}
tabs.forEach(tab=>tab.addEventListener("click",()=>{tabs.forEach(t=>{t.classList.remove("active");t.setAttribute("aria-selected","false")});tab.classList.add("active");tab.setAttribute("aria-selected","true");render(tab.dataset.galleryCategory,1)}));render();