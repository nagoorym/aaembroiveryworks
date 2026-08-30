import { tshirts } from "../data/tshirts.js";
import { whatsappUrl } from "../data/site.js";
const grid=document.querySelector("#tee-grid");
tshirts.forEach(t=>{
 const card=document.createElement("article"); card.className="tee-card";
 const message=`Hi AA Embroidery Work, I'm interested in the "${t.name}" T-shirt listed at ₹${t.offerPrice}. Please share the details.`;
 card.innerHTML=`<div class="ratio"><img src="${t.image}" loading="lazy" alt="${t.name}"></div>
 <div class="tee-info"><span class="badge">${t.availability}</span><h3>${t.name}</h3>
 <div class="price">₹${t.offerPrice}<span class="old">₹${t.regularPrice}</span></div>
 <a class="btn gold" target="_blank" href="${whatsappUrl(message)}">Shop on WhatsApp →</a></div>`;
 grid.appendChild(card);
});
