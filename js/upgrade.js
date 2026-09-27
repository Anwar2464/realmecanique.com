/* RÉAL MÉCANIQUE — Premium Industrial layer (v3) : injecté sans casser main.js */
(function(){"use strict";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const calm=matchMedia("(prefers-reduced-motion: reduce)").matches,fine=matchMedia("(pointer:fine)").matches;
/* Hero : bras robotisé + HUD */
const hero=$(".hero");
if(hero){hero.insertAdjacentHTML("beforeend",
'<svg class="rm-robot" viewBox="0 0 300 300" aria-hidden="true"><defs><linearGradient id="rg" x1="0" x2="1"><stop offset="0" stop-color="#e9eef5"/><stop offset="1" stop-color="#8896a8"/></linearGradient></defs><ellipse cx="150" cy="284" rx="90" ry="8" fill="rgba(0,0,0,.25)"/><rect x="95" y="258" width="110" height="22" rx="4" fill="#3b4657"/><g class="a1"><rect x="138" y="150" width="24" height="112" rx="6" fill="url(#rg)"/><circle cx="150" cy="150" r="16" fill="#D8232A"/><g class="a2"><rect x="150" y="141" width="88" height="18" rx="6" fill="url(#rg)"/><circle cx="238" cy="148" r="11" fill="#1E6FD9"/><g class="a3"><rect x="238" y="140" width="30" height="8" rx="3" fill="#3b4657"/><rect x="238" y="150" width="30" height="8" rx="3" fill="#3b4657"/></g></g></g></svg>'+
'<div class="hud" aria-hidden="true"><i></i>X <b id="hx">000.00</b> · Y <b id="hy">000.00</b> · Z <b>012.50</b><br>PRÉCISION · USINAGE · QUALITÉ · PRODUCTION</div>');
const hx=$("#hx"),hy=$("#hy"),rb=$(".rm-robot");
addEventListener("pointermove",e=>{if(!fine||calm)return;
const r=hero.getBoundingClientRect();hero.style.setProperty("--mx",(e.clientX-r.left)+"px");hero.style.setProperty("--my",(e.clientY-r.top)+"px");
hero.style.setProperty("--gx",(e.clientX/innerWidth-.5)*-24);hero.style.setProperty("--gy",(e.clientY/innerHeight-.5)*-24);
hx.textContent=(e.clientX/4).toFixed(2).padStart(6,"0");hy.textContent=(e.clientY/4).toFixed(2).padStart(6,"0");
rb.style.transform="translate("+(e.clientX/innerWidth-.5)*-14+"px,"+(e.clientY/innerHeight-.5)*-8+"px)"},{passive:true})}
/* Services : un visuel SVG animé par service */
const V={
"Mécanique de précision":'<circle class="l" cx="100" cy="65" r="38"/><circle class="l sp2" cx="100" cy="65" r="26" stroke-dasharray="4 6"/><path class="l" d="M40 65h120M100 15v100"/><g class="scan"><path class="r" d="M100 12v106"/></g><text x="12" y="20" class="f" font-size="9" letter-spacing="2">± 0.01 MM</text>',
"Rectification":'<circle class="l sp" cx="100" cy="70" r="34"/><circle class="l" cx="100" cy="70" r="10"/><rect class="l" x="40" y="104" width="120" height="8"/><g fill="#ffb347"><circle class="spark" cx="122" cy="102" r="2"/><circle class="spark" cx="126" cy="103" r="1.6"/><circle class="spark" cx="118" cy="103" r="1.6"/></g>',
"Usinage":'<rect class="l" x="70" y="18" width="60" height="30" rx="3"/><g class="sp"><path class="l" d="M100 48v34M88 82h24"/></g><rect class="f" x="50" y="100" width="100" height="14" opacity=".6"/><circle class="chip" cx="104" cy="98" r="2"/><circle class="chip" cx="96" cy="99" r="1.6"/><circle class="chip" cx="110" cy="99" r="1.4"/>',
"Fraisage":'<rect class="l" x="86" y="12" width="28" height="30"/><g class="sp"><ellipse class="l" cx="100" cy="72" rx="30" ry="9"/><path class="l" d="M70 72v14M130 72v14M85 78v14M115 78v14M100 81v14"/></g><rect class="l" x="40" y="104" width="120" height="10"/>',
"Mécanique industrielle":'<g class="sp"><circle class="l" cx="78" cy="66" r="30" stroke-dasharray="8 5"/><circle class="l" cx="78" cy="66" r="12"/></g><g class="sp2"><circle class="l" cx="132" cy="80" r="22" stroke-dasharray="7 5"/><circle class="l" cx="132" cy="80" r="8"/></g>',
"Constructions spéciales":'<path class="l" d="M30 20h140v90H30z M30 50h140 M80 20v90"/><path class="r" d="M40 96l30-24 30 10 30-30 30 14" stroke-dasharray="6 6"><animate attributeName="stroke-dashoffset" to="-24" dur="1.5s" repeatCount="indefinite"/></path><circle class="f sp2" cx="150" cy="30" r="4"/>'};
$$(".service").forEach(s=>{const k=$("h3",s)?.textContent.trim(),p=V[k];if(p)s.insertAdjacentHTML("afterbegin",'<div class="svc-vis" aria-hidden="true"><svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid slice">'+p+"</svg></div>")});
/* Matériaux 3D */
const P={acier:["#eef2f7","#8391a3","#39424f","Arbre / engrenage usiné"],plastiques:["#e8f1fb","#9db8d6","#5b7594","Composant technique"],aluminium:["#f7f9fb","#bcc6d1","#7a8592","Carter usiné"],bronze:["#f4c98f","#bb7a3b","#6b3f1a","Bague de guidage"],laiton:["#ffe58f","#d3a634","#8a6410","Raccord usiné"],titane:["#dcdde8","#8f93ab","#4a4d63","Pièce haute exigence"]};
function piece(k){const[a,b,c]=P[k],g='<defs><linearGradient id="m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+a+'"/><stop offset=".55" stop-color="'+b+'"/><stop offset="1" stop-color="'+c+'"/></linearGradient></defs>',st=' fill="url(#m)" stroke="'+c+'" stroke-width="1.5"';let s;
if(k==="acier"){let pts=[];for(let i=0;i<24;i++){const t=i*Math.PI/12,r=i%2?38:50;pts.push((60+Math.cos(t)*r).toFixed(1)+","+(60+Math.sin(t)*r).toFixed(1))}s='<polygon points="'+pts.join(" ")+'"'+st+'/><circle cx="60" cy="60" r="16" fill="#1a2434"/>'}
else if(k==="aluminium")s='<rect x="12" y="26" width="96" height="68" rx="10"'+st+'/><circle cx="38" cy="60" r="16" fill="#1a2434"/><circle cx="82" cy="60" r="16" fill="#1a2434"/>';
else if(k==="bronze")s='<path fill-rule="evenodd" d="M60 12a48 48 0 1 0 .1 0zM60 38a22 22 0 1 1-.1 0z"'+st+'/>';
else if(k==="laiton")s='<polygon points="60,10 104,35 104,85 60,110 16,85 16,35"'+st+'/><circle cx="60" cy="60" r="20" fill="#1a2434"/>';
else if(k==="titane")s='<rect x="8" y="46" width="104" height="28" rx="5"'+st+'/><rect x="22" y="32" width="22" height="56" rx="4"'+st+'/><rect x="76" y="38" width="16" height="44" rx="3"'+st+'/>';
else s='<rect x="16" y="20" width="88" height="80" rx="14"'+st+'/><rect x="34" y="40" width="52" height="10" rx="5" fill="#1a2434"/><rect x="34" y="70" width="52" height="10" rx="5" fill="#1a2434"/>';
return'<svg viewBox="0 0 120 120" aria-hidden="true">'+g+s+'</svg>'}
const mi=$(".material-interactive");
if(mi){mi.insertAdjacentHTML("beforeend",'<div class="mat-stage" aria-live="polite"><div class="obj"></div><div><strong></strong><small></small></div></div>');
const st=$(".mat-stage",mi),ob=$(".obj",st),show=b=>{const k=b.dataset.material;ob.innerHTML=piece(k);$("strong",st).textContent=b.firstElementChild.textContent.toUpperCase();$("small",st).textContent=P[k][3].toUpperCase()+" · APERÇU 3D ILLUSTRATIF"};
const items=$$(".material-item",mi);items.forEach(b=>{b.addEventListener("click",()=>show(b));b.addEventListener("focus",()=>show(b));if(fine)b.addEventListener("mouseenter",()=>show(b))});show(items[0])}
/* Qualité : scan + progression + dashboard (exemple visuel) */
const pr=$(".process");
if(pr){pr.insertAdjacentHTML("beforebegin",'<div class="qc-scan" aria-hidden="true"><svg viewBox="0 0 600 150" preserveAspectRatio="none"><path fill="none" stroke="#cfe0f7" stroke-width="2" d="M40 110h120v-50h60v50h80v-70h60v70h140"/><circle cx="190" cy="60" r="4" fill="#5df0a3"/><circle cx="330" cy="40" r="4" fill="#5df0a3"/></svg><div class="laser"></div><span class="ok">MESURE → SCAN → VALIDÉ</span></div>');
pr.insertAdjacentHTML("afterend",'<div class="dash"><h3>Suivi de production — interface</h3><small>EXEMPLE VISUEL · NON REPRÉSENTATIF DE DONNÉES RÉELLES</small><div class="row"><span>PRODUCTION</span><div class="bar"><i data-v="82"></i></div><span>82%</span></div><div class="row"><span>QUALITÉ</span><div class="bar"><i data-v="100"></i></div><span>100%</span></div><div class="row"><span>TRAÇABILITÉ</span><div class="bar"><i data-v="92"></i></div><span>92%</span></div></div>');
const dash=$(".dash");if("IntersectionObserver"in window){new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){pr.classList.add("on");$$("i",dash).forEach(i=>i.style.width=i.dataset.v+"%");o.disconnect()}})).observe(pr)}else{pr.classList.add("on");$$("i",dash).forEach(i=>i.style.width=i.dataset.v+"%")}}
/* Galerie industrielle */
const G=[["assets/generated/precision-workshop.jpg","01 / USINAGE","Usinage de précision"],["assets/generated/cnc-machining.jpg","02 / CNC","Cellule CNC et pièce usinée"],["assets/generated/automation-workshop.jpg","03 / ROBOTIQUE","Cellule robotisée et outillage"],["assets/generated/quality-metrology.jpg","04 / MÉTROLOGIE","Contrôle dimensionnel et qualité"],["assets/generated/industrial-concept.jpg","05 / CONCEPTION","Conception et environnement industriel"],["assets/officiel/realisations/aeronautique.jpg","06 / AÉRONAUTIQUE","Applications aéronautiques"],["assets/officiel/realisations/moyens-assemblage.jpg","07 / AUTOMOBILE","Moyens d'assemblage automobile"],["assets/officiel/realisations/construction-metallique.jpg","08 / STRUCTURES","Construction métallique"],["assets/officiel/ateliers/bureaux.jpg","09 / BUREAUX","Bureaux et environnement projet"],["assets/officiel/controle/projecteur-profil.jpg","10 / CONTRÔLE","Contrôle dimensionnel"]];
const ct=$("#contact");if(ct){ct.insertAdjacentHTML("beforebegin",'<section class="wall" id="galerie"><div class="w"><p class="eyebrow">GALERIE</p><h2>L\'univers industriel RÉAL MÉCANIQUE.</h2><div class="wall-grid">'+G.map(g=>'<figure class="tilt3d"><img src="'+g[0]+'" alt="'+g[2]+'" loading="lazy"><figcaption><b>'+g[1].slice(0,2)+'</b>'+g[1].slice(2)+'</figcaption></figure>').join("")+'</div></div></section>')}
/* Images uniques par section */
const swap=(sel,src)=>{const i=$(sel);if(i)i.src=src};
swap("#contact .context-visual img","assets/user-industrial/enhanced/industrial-maintenance-technician-enhanced.jpg");
swap(".context-row.reverse .context-visual img[alt^='Environnement industriel et ligne']","assets/generated/industrial-concept.jpg");
swap("#approche .context-visual img","assets/generated/automation-workshop.jpg");

/* Interactions : tilt 3D + lumière curseur + boutons magnétiques */
if(fine&&!calm){
$$(".service,.reference-logo-card,.tilt3d").forEach(c=>{c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.setProperty("--mx",x*100+"%");c.style.setProperty("--my",y*100+"%");c.style.transform="perspective(800px) rotateX("+(.5-y)*6+"deg) rotateY("+(x-.5)*8+"deg) translateZ(6px)"});c.addEventListener("pointerleave",()=>c.style.transform="")});
$$(".btn.p").forEach(b=>{b.classList.add("magnetic");b.addEventListener("pointermove",e=>{const r=b.getBoundingClientRect();b.style.transform="translate("+((e.clientX-r.left-r.width/2)*.12)+"px,"+((e.clientY-r.top-r.height/2)*.2-2)+"px)"});b.addEventListener("pointerleave",()=>b.style.transform="")})}
})();
