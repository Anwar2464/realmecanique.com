(function(){
  "use strict";
  const d=document;
  const menu=d.getElementById("menu"), nav=d.getElementById("nav");

  if(menu && nav){
    menu.addEventListener("click",()=>{
      const open=nav.classList.toggle("open");
      menu.setAttribute("aria-expanded",String(open));
      menu.setAttribute("aria-label",open?"Fermer le menu":"Ouvrir le menu");
    });
    nav.addEventListener("click",e=>{
      if(e.target.closest("a")){
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded","false");
        menu.setAttribute("aria-label","Ouvrir le menu");
      }
    });
  }

  // Accessible reveal: content remains visible if motion/observer is unavailable.
  const reveal=d.querySelectorAll(".service,.feature-grid article,.reference-grid article,.process>div");
  if("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    const io=new IntersectionObserver((entries,obs)=>{
      entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");obs.unobserve(entry.target);}});
    },{threshold:.1});
    reveal.forEach(el=>io.observe(el));
  }else reveal.forEach(el=>el.classList.add("visible"));

  // Premium custom cursor — desktop pointer devices only.
  const fine=window.matchMedia("(hover:hover) and (pointer:fine)");
  if(fine.matches){
    document.body.classList.remove("no-custom-cursor");
    const dot=d.createElement("div"), ring=d.createElement("div");
    dot.className="cursor-dot"; ring.className="cursor-ring";
    d.body.append(dot,ring);
    let mx=-100,my=-100,rx=-100,ry=-100,visible=false;
    const move=e=>{mx=e.clientX;my=e.clientY;if(!visible){visible=true;dot.style.opacity=ring.style.opacity="1";}};
    window.addEventListener("pointermove",move,{passive:true});
    const raf=()=>{rx+=(mx-rx)*.22;ry+=(my-ry)*.22;dot.style.transform=`translate3d(${mx-3.5}px,${my-3.5}px,0)`;ring.style.transform=`translate3d(${rx-17}px,${ry-17}px,0)`;requestAnimationFrame(raf)};raf();
    const setActive=on=>ring.classList.toggle("active",on);
    d.addEventListener("pointerover",e=>{if(e.target.closest("a,button,.service,.reference-grid article,.logo-frame,.map-card"))setActive(true);});
    d.addEventListener("pointerout",e=>{if(e.target.closest("a,button,.service,.reference-grid article,.logo-frame,.map-card"))setActive(false);});
    d.addEventListener("pointerdown",()=>ring.classList.add("click"));
    d.addEventListener("pointerup",()=>ring.classList.remove("click"));
  }else document.body.classList.add("no-custom-cursor");

  // Subtle 3D tilt for the logo only. Disabled for touch/reduced motion.
  if(fine.matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    const frame=d.querySelector(".logo-frame");
    if(frame){
      frame.addEventListener("pointermove",e=>{
        const r=frame.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
        frame.style.transform=`perspective(900px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translateZ(0)`;
      });
      frame.addEventListener("pointerleave",()=>frame.style.transform="");
    }
  }

  // Lightweight card tilt, capped to keep the industrial look professional.
  if(fine.matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    d.querySelectorAll(".service,.reference-grid article").forEach(card=>{
      card.addEventListener("pointermove",e=>{
        const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(700px) rotateX(${(-y*2.2).toFixed(2)}deg) rotateY(${(x*2.8).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave",()=>card.style.transform="");
    });
  }

  // Contact form: server-side endpoint first, mailto fallback second.
  const form=d.getElementById("cf"), status=d.getElementById("st");
  const mailto=fd=>{
    const body=[`Nom : ${fd.get("name")||"-"}`,`Société : ${fd.get("company")||"-"}`,`E-mail : ${fd.get("email")||"-"}`,`Téléphone : ${fd.get("phone")||"-"}`,`Service : ${fd.get("service")||"-"}`,"",String(fd.get("message")||"")].join("\n");
    return "mailto:contact@realmecanique.com?subject="+encodeURIComponent("Demande de devis")+"&body="+encodeURIComponent(body);
  };
  if(form){
    form.addEventListener("submit",async e=>{
      e.preventDefault();
      const fd=new FormData(form), button=form.querySelector("button");
      if(fd.get("website"))return;
      status.className="status";status.textContent="";button.disabled=true;button.textContent="Envoi en cours…";
      try{
        const r=await fetch("/api/contact",{method:"POST",body:fd,headers:{"X-Requested-With":"XMLHttpRequest"}});
        const data=await r.json().catch(()=>({}));
        if(!r.ok)throw data;
        form.reset();status.className="status ok";status.textContent="Merci. Votre demande a bien été envoyée.";
      }catch(err){
        status.className="status er";
        const a=d.createElement("a");a.href=mailto(fd);a.textContent="Envoyer par e-mail";a.target="_self";
        status.textContent=(err&&err.error?err.error+" ":"L’envoi direct n’est pas disponible. ");status.append(" ",a," ou appeler le +212 522 66 60 26.");
      }finally{button.disabled=false;button.textContent="Envoyer ma demande";}
    });
  }
})();

/* V2.3 — section reveal, active navigation and controlled 3D tilt */
(function(){
  "use strict";
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine=window.matchMedia("(pointer:fine)").matches;
  const revealTargets=document.querySelectorAll("section .w > *, .service, .feature-grid article, .reference-grid article, .journey-card");
  revealTargets.forEach(el=>el.classList.add("reveal-rm"));
  if("IntersectionObserver" in window){
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("in");io.unobserve(entry.target)}
    }),{threshold:.08,rootMargin:"0px 0px -7% 0px"});
    revealTargets.forEach(el=>io.observe(el));
  } else revealTargets.forEach(el=>el.classList.add("in"));

  const navLinks=[...document.querySelectorAll("#nav a")];
  const sections=navLinks.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if("IntersectionObserver" in window){
    const active=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){
        navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id));
      }
    }),{rootMargin:"-35% 0px -55% 0px",threshold:0});
    sections.forEach(s=>active.observe(s));
  }

  if(fine && !reduce){
    document.querySelectorAll(".tilt-card,.service").forEach(card=>{
      let raf=0;
      card.addEventListener("pointermove",e=>{
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        cancelAnimationFrame(raf);
        raf=requestAnimationFrame(()=>{
          const limit=card.classList.contains("tilt-card")?7:4;
          card.style.transform=`perspective(900px) rotateX(${(-y*limit).toFixed(2)}deg) rotateY(${(x*limit).toFixed(2)}deg) translateY(-3px)`;
        });
      });
      card.addEventListener("pointerleave",()=>{
        cancelAnimationFrame(raf);
        card.style.transform="";
      });
    });
  }
})();

/* V2.5 — Live contextual photo motion: scroll + pointer depth */
(function(){
  "use strict";
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine=window.matchMedia("(pointer:fine)").matches;
  const visuals=[...document.querySelectorAll(".context-visual")];
  if(!visuals.length || reduce) return;
  let sx=0, sy=0, ticking=false;
  const render=()=>{
    ticking=false;
    const vh=window.innerHeight || 800;
    visuals.forEach(v=>{
      const r=v.getBoundingClientRect();
      if(r.bottom<0 || r.top>vh) return;
      const center=(r.top+r.height/2)/vh-.5;
      const depth=parseFloat(v.dataset.depth||"0.1");
      const img=v.querySelector("img");
      if(img) img.style.transform=`translate3d(${(sx*depth).toFixed(1)}px,${(-center*18*depth).toFixed(1)}px,0) scale(1.07)`;
    });
  };
  const schedule=()=>{if(!ticking){ticking=true;requestAnimationFrame(render)}};
  window.addEventListener("scroll",schedule,{passive:true});
  if(fine){
    window.addEventListener("pointermove",e=>{sx=(e.clientX/window.innerWidth-.5)*24;sy=(e.clientY/window.innerHeight-.5)*18;schedule()},{passive:true});
  }
  render();
})();

/* V2.6 — Interactive material samples: hover on desktop, click/tap on all devices */
(function(){
  "use strict";
  const items=[...document.querySelectorAll(".material-item")];
  if(!items.length) return;
  const closeOthers=(keep)=>items.forEach(item=>{
    if(item!==keep){item.classList.remove("active");item.setAttribute("aria-expanded","false");}
  });
  items.forEach(item=>{
    item.addEventListener("click",()=>{
      const active=item.classList.contains("active");
      closeOthers(item);
      item.classList.toggle("active",!active);
      item.setAttribute("aria-expanded",String(!active));
    });
    item.addEventListener("mouseenter",()=>{if(window.matchMedia("(hover:hover) and (pointer:fine)").matches){closeOthers(item);item.classList.add("active");item.setAttribute("aria-expanded","true");}});
    item.addEventListener("mouseleave",()=>{if(window.matchMedia("(hover:hover) and (pointer:fine)").matches){item.classList.remove("active");item.setAttribute("aria-expanded","false");}});
  });
})();
