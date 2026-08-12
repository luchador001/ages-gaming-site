(() => {
'use strict';
const pages=new Set(['home','about','products','services','contact']);
const menu=document.getElementById('mobileMenu');
const burger=document.getElementById('menuBtn');
function show(id,write=true){
  if(!pages.has(id)) id='home';
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));
  document.querySelectorAll('[data-go]').forEach(a=>{if(a.classList?.contains('navlink'))a.classList.toggle('active',a.dataset.go===id)});
  menu?.classList.remove('open');
  burger?.setAttribute('aria-expanded','false');
  if(write){const h=id==='home'?'':('#'+id); if(location.hash!==h) history.pushState({page:id},'',location.pathname+location.search+h);}
  window.scrollTo(0,0);
}
function openMenu(e){
  e?.preventDefault();e?.stopPropagation();e?.stopImmediatePropagation?.();
  if(!menu||!burger)return;
  const open=!menu.classList.contains('open');
  menu.classList.toggle('open',open);
  burger.setAttribute('aria-expanded',String(open));
}
if(burger){burger.addEventListener('click',openMenu,true);burger.onclick=openMenu;}
document.addEventListener('click',e=>{
  const a=e.target.closest?.('[data-go]');
  if(!a||!pages.has(a.dataset.go))return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  show(a.dataset.go,true);
},true);
document.addEventListener('click',e=>{if(menu?.classList.contains('open')&&!e.target.closest('#mobileMenu')&&!e.target.closest('#menuBtn')){menu.classList.remove('open');burger?.setAttribute('aria-expanded','false')}},false);
window.addEventListener('hashchange',()=>show((location.hash||'#home').slice(1),false));
window.addEventListener('popstate',()=>show((location.hash||'#home').slice(1),false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu?.classList.remove('open');burger?.setAttribute('aria-expanded','false')}});
show((location.hash||'#home').slice(1),false);
})();