import { galleryCategories as sourceGallery } from '../data/gallery.js';
const categories={blouses:'Blouses',logos:'Logos & Uniforms',custom:'Custom Embroidery',prints:'T-Shirt Prints'};
let data=JSON.parse(localStorage.getItem('aa-gallery-manager')||'null')||structuredClone(sourceGallery);
let active='blouses';
const tabs=document.querySelector('#tabs'), manager=document.querySelector('#galleryManager');
function persist(){localStorage.setItem('aa-gallery-manager',JSON.stringify(data))}
function render(){
 tabs.innerHTML=Object.entries(categories).map(([key,label])=>`<button class="${key===active?'active':''}" data-key="${key}">${label}</button>`).join('');
 tabs.querySelectorAll('button').forEach(b=>b.onclick=()=>{active=b.dataset.key;render()});
 const items=data[active]||[];
 manager.innerHTML=`<div class="counter">${items.length}/12 images</div>
 <div class="add-row"><input id="urlInput" placeholder="Paste ImageKit or Google Business image URL"><button id="addBtn">Add image</button></div>
 <div class="image-list">${items.map((url,i)=>`<article class="card"><img src="${url}" alt=""><div class="meta"><small title="${url}">${i+1}. ${url}</small><button data-remove="${i}">Remove</button></div></article>`).join('')}</div>`;
 document.querySelector('#addBtn').onclick=()=>{const input=document.querySelector('#urlInput'),url=input.value.trim();if(!url)return;if(items.length>=12){alert('Maximum 12 images per category.');return}data[active].push(url);persist();render()};
 manager.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{data[active].splice(+b.dataset.remove,1);persist();render()});
}
document.querySelector('#exportBtn').onclick=()=>{
 const content='export const galleryCategories = '+JSON.stringify(data,null,2)+';\n';
 const blob=new Blob([content],{type:'text/javascript'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='gallery.js';a.click();URL.revokeObjectURL(a.href);
};
render();