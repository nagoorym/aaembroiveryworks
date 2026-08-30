const defaults={
hero:{title:'Hero Slider',size:'1200 × 1500 px · 4:5',max:8,items:[
'https://ik.imagekit.io/MiCV/Hero__0000s_0003_02.jpg','https://ik.imagekit.io/MiCV/Hero__0000s_0000_05.jpg','https://ik.imagekit.io/MiCV/blouse.jpg','https://ik.imagekit.io/MiCV/Hero__0000s_0002_03.jpg','https://ik.imagekit.io/MiCV/Hero__0000s_0004_01.jpg','https://ik.imagekit.io/MiCV/Hero__0000s_0001_04.jpg']},
services:{title:'One Studio · Four Ways to Customise',size:'1200 × 1500 px · 4:5',max:4,labels:['Blouse Embroidery','Custom Embroidery','Political & Organisation','DTF Printing'],items:['https://ik.imagekit.io/MiCV/images/blouse.jpg','https://ik.imagekit.io/MiCV/images/Ser__0001_01.jpg','https://ik.imagekit.io/MiCV/images/Ser__0002_02.jpg','https://ik.imagekit.io/MiCV/images/Ser__0000_03.jpg']},
fashion:{title:'Whatever Your Fashion',size:'1200 × 1500 px · 4:5',max:2,labels:['Fashion image 1','Fashion image 2'],items:['','']},
promise:{title:'Our Promise / Process Section',size:'1200 × 1500 px · 4:5',max:6,items:[]},
galleryBlouses:{title:'Gallery · Blouses',size:'1200 × 1200 px · 1:1',max:12,square:true,items:[]},
galleryLogos:{title:'Gallery · Logos & Uniforms',size:'1200 × 1200 px · 1:1',max:12,square:true,items:[]},
galleryCustom:{title:'Gallery · Custom Embroidery',size:'1200 × 1200 px · 1:1',max:12,square:true,items:[]},
galleryPrints:{title:'Gallery · T-Shirt Prints',size:'1200 × 1200 px · 1:1',max:12,square:true,items:[]}
};
let data=JSON.parse(localStorage.getItem('aa-complete-image-manager')||'null')||structuredClone(defaults);
const root=document.querySelector('#sections');
function preview(url){return url?'<img src="'+url.replaceAll('"','&quot;')+'" alt="" onerror="this.parentElement.innerHTML=\'<span>Image URL could not be loaded</span>\'">':'<span>Paste an image URL to preview it here</span>'}
function render(){
root.innerHTML=Object.entries(data).map(([key,s])=>'<section class="section '+(s.square?'square':'')+'"><div class="head"><div><p class="eyebrow">IMAGE SECTION</p><h2>'+s.title+'</h2></div><div class="badge">'+s.size+' · Max '+s.max+'</div></div><div class="grid">'+s.items.map((url,i)=>'<div class="card"><div class="preview">'+preview(url)+'</div><div class="label">'+(s.labels?.[i]||'Image '+(i+1))+'</div><input data-k="'+key+'" data-i="'+i+'" value="'+url.replaceAll('"','&quot;')+'" placeholder="Paste image URL"></div>').join('')+'</div>'+(s.items.length<s.max?'<div class="add"><input id="add-'+key+'" placeholder="Paste a new image URL"><button data-add="'+key+'">Add image</button></div>':'')+'</section>').join('');
root.querySelectorAll('input[data-k]').forEach(inp=>inp.onchange=()=>{data[inp.dataset.k].items[+inp.dataset.i]=inp.value.trim();save();render()});
root.querySelectorAll('[data-add]').forEach(btn=>btn.onclick=()=>{const k=btn.dataset.add,u=document.querySelector('#add-'+k).value.trim();if(!u)return;data[k].items.push(u);save();render()});
}
function save(){localStorage.setItem('aa-complete-image-manager',JSON.stringify(data))}
document.querySelector('#exportBtn').onclick=()=>{const content='export const siteImages = '+JSON.stringify(data,null,2)+';\n';const b=new Blob([content],{type:'text/javascript'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='site-images.js';a.click();URL.revokeObjectURL(a.href)};
render();