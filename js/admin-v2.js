const PAGE_SIZE=12;
const defaults={
hero:{title:'Hero Slider',size:'1600 × 900 px · 16:9',labels:['Hero 1','Hero 2','Hero 3','Hero 4','Hero 5'],items:[
'https://ik.imagekit.io/MiCV/Hero__0000s_0004_01.jpg','https://ik.imagekit.io/MiCV/Hero__0000s_0004_02.jpg','https://ik.imagekit.io/MiCV/Hero__0000s_0002_03.jpg','https://ik.imagekit.io/MiCV/Hero__0000s_0004_04.jpg','https://ik.imagekit.io/MiCV/Hero__0000s_0001_05.jpg']},
services:{title:'One Studio · Four Ways to Customise',size:'1200 × 1500 px · 4:5',labels:['Blouse Embroidery','Custom Embroidery','Political & Organisation','DTF Printing'],items:['https://ik.imagekit.io/MiCV/blouse.jpg','https://ik.imagekit.io/MiCV/images/Ser__0001_01.jpg','https://ik.imagekit.io/MiCV/images/Ser__0002_02.jpg','https://ik.imagekit.io/MiCV/images/Ser__0000_03.jpg']},
fashion:{title:'Whatever Your Fashion',size:'1200 × 1500 px · 4:5',labels:['Fashion image 1','Fashion image 2'],items:['https://ik.imagekit.io/MiCV/_0001_st_02.jpg','https://ik.imagekit.io/MiCV/images/_0000_st_01.jpg']},
galleryBlouses:{title:'Gallery · Blouses',size:'1200 × 1200 px · 1:1',square:true,items:[]},
galleryLogos:{title:'Gallery · Logos & Uniforms',size:'1200 × 1200 px · 1:1',square:true,items:[]},
galleryCustom:{title:'Gallery · Custom Embroidery',size:'1200 × 1200 px · 1:1',square:true,items:[]},
galleryPrints:{title:'Gallery · T-Shirt Prints',size:'1200 × 1200 px · 1:1',square:true,items:[]}
};
let data=JSON.parse(localStorage.getItem('aa-complete-image-manager')||'null')||structuredClone(defaults);
let galleryPages={};
const root=document.querySelector('#sections');
function save(){localStorage.setItem('aa-complete-image-manager',JSON.stringify(data))}
function preview(url){return url?'<img src="'+url.replaceAll('"','&quot;')+'" alt="" onerror="this.parentElement.innerHTML=\'<span>Image URL could not be loaded</span>\'">':'<span>Paste an image URL to preview it here</span>'}
function fixedSection(key,s){
 return '<section class="section '+(s.square?'square':'')+'"><div class="head"><div><p class="eyebrow">WEBSITE IMAGE SECTION</p><h2>'+s.title+'</h2><p>Replace the existing image. The number of image slots is fixed for this section.</p></div><div class="badge">'+s.size+'</div></div><div class="grid">'+s.items.map((url,i)=>'<div class="card"><div class="preview">'+preview(url)+'</div><div class="label">'+s.labels[i]+'</div><input data-k="'+key+'" data-i="'+i+'" value="'+url.replaceAll('"','&quot;')+'" placeholder="Paste replacement image URL"><button class="replace" data-replace="'+key+'" data-i="'+i+'">Replace image</button></div>').join('')+'</div></section>';
}
function gallerySection(key,s){
 const page=galleryPages[key]||1, total=Math.max(1,Math.ceil(s.items.length/PAGE_SIZE)), safe=Math.min(page,total), start=(safe-1)*PAGE_SIZE, visible=s.items.slice(start,start+PAGE_SIZE);
 return '<section class="section square"><div class="head"><div><p class="eyebrow">GALLERY COLLECTION</p><h2>'+s.title+'</h2><p>Unlimited images. 12 images are shown per page in the manager and website gallery.</p></div><div class="badge">'+s.size+' · '+s.items.length+' images</div></div><div class="grid">'+visible.map((url,j)=>{const i=start+j;return '<div class="card"><div class="preview">'+preview(url)+'</div><div class="label">Image '+(i+1)+'</div><input data-k="'+key+'" data-i="'+i+'" value="'+url.replaceAll('"','&quot;')+'" placeholder="Paste replacement image URL"><div class="actions"><button class="replace" data-replace="'+key+'" data-i="'+i+'">Replace</button><button class="remove" data-remove="'+key+'" data-i="'+i+'">Remove</button></div></div>'}).join('')+'</div><div class="pagination">'+Array.from({length:total},(_,n)=>'<button class="'+(safe===n+1?'active':'')+'" data-page="'+key+'" data-p="'+(n+1)+'">'+(n+1)+'</button>').join('')+'</div><div class="add"><input id="add-'+key+'" placeholder="Paste a new gallery image URL"><button data-add="'+key+'">Add image</button></div></section>';
}
function render(){
 root.innerHTML=Object.entries(data).map(([k,s])=>k.startsWith('gallery')?gallerySection(k,s):fixedSection(k,s)).join('');
 root.querySelectorAll('input[data-k]').forEach(inp=>inp.onchange=()=>{data[inp.dataset.k].items[+inp.dataset.i]=inp.value.trim();save();});
 root.querySelectorAll('[data-replace]').forEach(btn=>btn.onclick=()=>{const k=btn.dataset.replace,i=+btn.dataset.i,input=root.querySelector('input[data-k="'+k+'"][data-i="'+i+'"]');data[k].items[i]=input.value.trim();save();render();});
 root.querySelectorAll('[data-remove]').forEach(btn=>btn.onclick=()=>{const k=btn.dataset.remove,i=+btn.dataset.i;data[k].items.splice(i,1);save();render();});
 root.querySelectorAll('[data-add]').forEach(btn=>btn.onclick=()=>{const k=btn.dataset.add,u=document.querySelector('#add-'+k).value.trim();if(!u)return;data[k].items.push(u);galleryPages[k]=Math.ceil(data[k].items.length/PAGE_SIZE);save();render();});
 root.querySelectorAll('[data-page]').forEach(btn=>btn.onclick=()=>{galleryPages[btn.dataset.page]=+btn.dataset.p;render();});
}
document.querySelector('#exportBtn').onclick=()=>{const content='export const siteImages = '+JSON.stringify(data,null,2)+';\n';const b=new Blob([content],{type:'text/javascript'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='site-images.js';a.click();URL.revokeObjectURL(a.href)};
render();