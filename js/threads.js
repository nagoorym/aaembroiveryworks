import { articles } from "../data/articles.js";
const grid=document.querySelector("#threads-grid");
articles.forEach(a=>{
 const card=document.createElement("article"); card.className="service-card";
 card.innerHTML=`<div class="ratio"><img src="${a.image}" loading="lazy" alt="${a.title}"></div>
 <div class="card-copy"><span class="eyebrow">${a.category}</span><h3>${a.title}</h3><p>${a.excerpt}</p><a class="btn" href="#">Read article →</a></div>`;
 grid.appendChild(card);
});
