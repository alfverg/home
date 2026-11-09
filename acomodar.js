/* Acomodar: mover tareas de Tiempo, Obligatorio, Vivo y Done con anillos. Se abre desde Tareas (pelotita de Klink). */
(()=>{
/* Pokémon que la Home no tenía: Dialga (Tiempo) y Klink (la pelotita en Tareas) */
SPR[483]="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAADV0lEQVR42pWWLXijShSGX/JUrAxuVyKRxV0k65AdV2TWIRe3SGQqcRvJdVOJ60iuwyKRjQtyHVfAzAIlCT2Gtkn5zvl+zoz1+PjIhurHp7X4mZXfN9VuA2B/PGY4jgPQJ0WNHabms7quqet62sCmergF6jgOcXwgz0+ITAIgU8EeeBvA8DyPKxP3t1i4BtwfjxmAAZWpGIDl0IBSJUmSLgE1WF/XNZ7nXQXfacqWky5B4/iAlBKlSoQQq6Ca8jAMAYw8azLsAMbpzIdSSvL8BMCpeAUgCEKUKsnzE53tf2BIg4VhSJYNbLmuq/VfndhKktSAO46DEAIpJXF8YN8UhloNeqmLmau1LNNK05Qsy1CqvO9qx3GMiZQqCYJhijg+mO8sQO/WiiQzYGv8AgCdG5HnJ5QqDWien+jciFGaD5oFgW+eeto0Tac6X59YSmk01TprrQHckYFFmaY1rRo8CHyklKs5nwJbnufxlj3xlj3heR6FPUfwv33BDlNGT/TTFEwbVKoiyzKCIMTzPJ1161qOe8dxjIlsLyK6VCZCSy+MU/Z2mNKNf9fgcXxACEHbttcWi5l45szO9tlPQJMkpXMjTsUrh+iJzo2ww0E/7XoAkUnjjxXQHuj9Y/VR47ZtSZJUO3fmyks5NFa9/wFg3xRmiy1LNzZZHr3tRfjHiirxAayHiUFm661t29Wl36hyFVQbzw1C3vOIzvZxHIfO9nGf4+F//81XNV5qYU12bV/XNUKIWa6FECZi/rcvnF5e2F8qRDam41LNAKc74OFO/mfNxPEBpSqCICRN09m0GrRzIyNH50ZoiZbv2225BCRFzfcfLyajw1b7u6/f8+iDHIvMW8shtgAPtH11TEaDICQIQqSU7JtimKwuBiefWwN+iJ6mJptTufXqo+Om1Khb05gInYpXTamls825HZodG1nu+E1U257e3RVB4NM0DZ0bGWMB2F5kLgKXMuPXswvnll/PLv98vXz+znU8ZoNpbN9MOT0utZG0FH8PjdA8/zvbnwaeLwbbZ3qKcW5pVDnQOVI6Lb2I1o7S3b1ppzcO/YIkSels/xadlj4Y1g6ILebqb+S6r+shZm+/f/L9x8unLgm7DQvEWsvhFjpvvnhjnG4xYt27Q6/V//NV4KoW53DYAAAAAElFTkSuQmCC";
SPR[599]="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAYAAAAS7Y8mAAABe0lEQVR42q2UoXLDMAyGv+T2AoGDghlrYOBg4QINDfsKhYalhYamg4GGhoYrNBwMHcvA6lyaNlu324/su0SWvl9SsdlsuKFxdi74gx4WgQpgtM4BEELAHo/jX4KXOdA52Kh3O/5DZT4Mw0CMkXQ64awlhEDbtpwfGhd4flRxZjzGGGmaBuscztrpA6X1HMuS+aoXU8Y+BGKMGB/4UF84ti8vyOPjmrETwllV14yrqqLrOgDegyelRPP0RHx7I4SA73t+40U5v4gI+B58j4hgjKGqqqufrHOTF8MwoLruyosSKLRSaKVQWiMipJQu+LZty/N2i9nvAS48yFW1bXuBpZyBL3Jw6xxS14QQrrIdhoHD4UCSmg+1wxhD//q6OiA3ZY/H3AmICHtj2NQ1TdMgesd78JDSF8JF5ywDF1qpmy2UUhrn3ZONFhG89xO27zJeG9/pUevclGW+Zy/OlY4Pv5zUAkArdbFP8pTezfhezb3ICRQra/MefbtaPwFxA8jEyIo6iQAAAABJRU5ErkJggg==";
const TONES={azul:['#EEF6FE','#BBDEFD','#88C6FA','#3CACFF','#247AB8','#0D4B76','#00213B'],pasto:['#EAFCE2','#CFEEBF','#AEE291','#85D84D','#59982D','#315C0F','#0D2600'],
  naranja:['#FEF3EB','#FDD3B6','#FAB37F','#FC8D25','#B5610D','#723900','#351500'],rosa:['#FFF1F5','#FECCDE','#FDA4C6','#FF74B0','#B74F7C','#742C4C','#380D21'],
  haunter:['#F4F1F9','#D2C7E6','#967DC4','#5A3F8C','#432E6B','#31224E','#140E20']};
const CATCOL={A:'rosa',B:'azul',C:'pasto',M:'naranja'};

/* ---------- Opciones: Tiempo 0–20, luego Obligatorio, Vivo y Estado ---------- */
/* Nombres por defecto; al cargar se cambian por los nombres reales de Notion (meses y trimestres rotan) */
const T=["1️⃣ L","2️⃣ M","3️⃣ X","4️⃣ J","5️⃣ V","📅 Semana","🌴 Fin","⏩📅","⏩⏩📅📅","🗓️🗓️ Noviembre 🗓️🗓️","⏩🗓️🗓️ Diciembre ⏩🗓️🗓️","⏩⏩🗓️🗓️ Enero ⏩⏩🗓️🗓️","🎯 Oct - Dic","🎯🎯 Ene - Mar","🎯🎯🎯 Abr - Jun","🎯 🎯 🎯 🎯 Jul - Sept","🏗️ Mediano Plazo","🗿 Largo Plazo","🏁 Metas 2025","📌 Sin fecha / Backlog"];
const SHORT=["1️⃣ L","2️⃣ M","3️⃣ X","4️⃣ J","5️⃣ V","📅 Semana","🌴 Fin","⏩📅","⏩⏩📅📅","🗓️ Noviembre","⏩🗓️ Diciembre","⏩⏩🗓️ Enero","🎯 Oct-Dic","🎯🎯 Ene-Mar","🎯🎯🎯 Abr-Jun","🎯🎯🎯🎯 Jul-Sept","🏗️ Mediano","🗿 Largo","🏁 Metas 2025","📌 Backlog","Sin Tiempo"];
const SHORT0=SHORT.slice();
const SIN=T.length,BACKLOG=19;
/* Llave de cada opción de Tiempo: sus emojis (sin letras ni años), así "Noviembre" → "Diciembre" sigue siendo la misma */
const tkey=s=>(s||"").replace(/\uFE0F/g,"").replace(/[\p{L}\s\-\/]/gu,"").replace(/\d(?!\u20E3)/g,"");
const TKEY=T.map(tkey);
function syncT(){
  const seen={};
  [...(snap?.ti||[]),...(snap?.tasks||[]).map(t=>t.ti).filter(Boolean)].forEach(n=>{
    const i=TKEY.indexOf(tkey(n));if(i<0||seen[i])return;seen[i]=1;T[i]=n;
    if(i>=9&&i<=15)SHORT[i]=SHORT0[i].split(" ")[0]+" "+n.replace(/[^\p{L}\s\-]/gu,"").trim().replace(/\s*-\s*/,"-");
    if(i===18)SHORT[i]=n;
  });
}
const PROP=[["o","U","Urgente 🔥","🔥 Urgente"],["o","S","Si ☑️","☑️ Si"],["o","D","Duda ⁉️","⁉️ Duda"],["o","N","No 🚫","🚫 No"],
  ["v","p","💣 Por hacer💣","💣 Por hacer"],["v","h","👻Hold👻","👻 Hold"],["e",6,"✅ Done✅","✅ Done"],["e",7,"Done Limpiar","Done Limpiar"]];
const P0=SHORT.length;PROP.forEach(p=>SHORT.push(p[3]));
const LIMPIAR=P0+7;
/* Pokémon de cada opción (como en Tareas): Urgente, Si, Duda, No, —, Hold, Done */
const PKOPT=[6,229,54,143,0,96,494,0];
const isProp=o=>o>=P0;
const propOf=o=>PROP[o-P0];
const optName=o=>isProp(o)?propOf(o)[3].replace(/ /g," "):o===SIN?"Sin Tiempo":T[o];
const ESTADOS=["🕐 Sin empezar 🕐","🧠 Planeación🧠","🚀 Ejecución🚀","🔍 Seguimiento🔍","⛔ Bloqueo⛔","🔄 Doing🔄","✅ Done✅","Done Limpiar"];

/* Modos: pelotita con Pokémon, cómo se agrupa la lista y qué anillos abre */
const MODES={
  t:{name:"Tiempo",pk:483,c:"azul",rings:[["Días",[0,1,2,3,4]],["Semanas",[5,6,7,8]],["Meses",[9,10,11]],["Trimestres",[12,13,14,15]],["Plazos",[16,17,18,19,20]]]},
  o:{name:"Obligatorio",pk:[6,229,54,143],c:"naranja",rings:[["Obligatorio",[P0,P0+1,P0+2,P0+3]]]},
  v:{name:"Vivo",pk:96,c:"rosa",rings:[["Vivo",[P0+4,P0+5]]]},
  e:{name:"Done",pk:494,c:"pasto",rings:[["Estado",[P0+6,P0+7]]]},
};
let mode="t";

/* Valor actual de cada propiedad como índice de opción (null = vacío) */
const idxOf=(k,code)=>{if(code===""||code==null)return null;const i=PROP.findIndex(p=>p[0]===k&&p[1]===code);return i<0?null:P0+i};
/* Cambios sin guardar: viven en el celular hasta que tocas "Guardar en Notion" */
const KEY="acomodar";
const loadSaved=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return{}}};
const estIdx=e=>{const i=ESTADOS.findIndex(x=>norm(x)===norm(e));return i<0?0:i};
let items=[];
function loadItems(){
  syncT();
  const saved=loadSaved();
  items=(snap?.tasks||[]).map(t=>{
    const ti=t.ti?TKEY.indexOf(tkey(t.ti)):-1,e=estIdx(t.e),p=saved[t.id]||{};
    return {id:t.id,name:t.n||"(Tarjeta sin nombre)",cat:catCod(t.c),e0:e,
      from:{t:ti<0?SIN:ti,o:idxOf("o",oblCod(t.o)),v:idxOf("v",vivoCod(t.v)),e:e>=6?idxOf("e",e):null},
      p:{t:p.t??null,o:p.o??null,v:p.v??null,e:p.e??null}};
  });
}
const cur=(it,k)=>it.p[k]??it.from[k];
const changed=it=>["t","o","v","e"].some(k=>it.p[k]!==null);
const tone=(o,from)=>isProp(o)||from==null?"":o<from?"is-before":o>from?"is-after":"";

/* ---------- Pelotitas de modo ---------- */
const modesEl=document.querySelector("#pg-acomodar .modes");
Object.entries(MODES).forEach(([k,m])=>{
  const b=document.createElement("button");b.type="button";b.dataset.m=k;
  b.style.setProperty("--mc",TONES[m.c][3]);b.style.setProperty("--mf",TONES[m.c][5]);
  const pks=[].concat(m.pk);
  b.innerHTML=`<span class="ball${pks.length>1?" many":""}">${pks.map(id=>`<img class="pk" src="${SPR[id]}" alt="">`).join("")}</span>${m.name}`;
  b.onclick=()=>{mode=k;build()};
  modesEl.append(b);
});

/* ---------- Encabezados de grupo, como en Tareas ---------- */
const DAYCOL=['azul','azul','rosa','rosa','pasto'];
const DAYNAME=['Lunes','Martes','Miércoles','Jueves','Viernes'];
const ROMBO={5:['W','azul','Semana'],6:['F','pasto','Finde'],7:['P','rosa','Próxima semana']};
function tHead(g){
  if(g<5)return[`<span class="circ disp" style="--c:${TONES[DAYCOL[g]][3]}">${"LMXJV"[g]}</span>`,DAYNAME[g]];
  if(ROMBO[g]){const [l,c,n]=ROMBO[g];return[`<span class="rombo" style="--c:${TONES[c][3]}"><span><b class="disp">${l}</b></span></span>`,n]}
  return["",g===SIN?"Sin Tiempo":T[g]];
}
function head(g,tag="h2"){
  const h=document.createElement(tag);h.className="disp";
  let ico="",txt="";
  if(tag==="h3"||mode==="t")[ico,txt]=tHead(g);
  else if(mode==="o"){const pk={0:6,1:229,2:54,3:143}[g-P0];if(pk)ico=`<img class="pk" src="${SPR[pk]}" alt="">`;txt=g==null?"Sin Obligatorio":optName(g).replace(/^\S+ /,"")}
  else if(mode==="v"){if(g===P0+5)ico=`<img class="pk" src="${SPR[96]}" alt="">`;txt=g==null?"Sin Vivo":optName(g)}
  else{if(g===6)ico=`<img class="pk" src="${SPR[494]}" alt="">`;txt=ESTADOS[g]}
  h.innerHTML=ico;const ts=document.createElement("span");ts.textContent=txt;h.append(ts);
  return h;
}
function groupOf(it){
  if(mode==="t")return it.from.t;
  if(mode==="e")return it.e0;
  return it.from[mode];
}
function groupsOrder(){
  if(mode==="t")return[...Array(SIN+1).keys()];
  if(mode==="e")return[...ESTADOS.keys()];
  return[...MODES[mode].rings[0][1],null];
}

/* ---------- Lista ---------- */
const board=$("ac-board");
function build(){
  modesEl.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.m===mode?"true":"false"));
  board.replaceChildren();
  groupsOrder().forEach(g=>{
    const list=items.filter(it=>groupOf(it)===g);
    if(!list.length&&!(mode==="t"&&g<5))return;
    const sec=document.createElement("section");
    const h=head(g);const n=document.createElement("small");n.textContent=list.length||"";h.append(n);sec.append(h);
    if(!list.length){const p=document.createElement("p");p.className="none";p.textContent="Sin tarjetas";sec.append(p)}
    /* Obligatorio y Vivo: dentro de cada grupo, sub-grupos por Tiempo */
    const sub=mode==="o"||mode==="v";
    if(sub)list.sort((a,b)=>a.from.t-b.from.t);
    let lastT;
    list.forEach(it=>{
      if(sub&&it.from.t!==lastT){lastT=it.from.t;sec.append(head(lastT,"h3"))}
      const track=document.createElement("div");track.className="track";
      const b=document.createElement("div");b.className="bubble";b.tabIndex=0;b.setAttribute("role","button");
      const c=CATCOL[it.cat];
      if(c){b.style.setProperty("--k",TONES[c][3]);b.style.setProperty("--kb",TONES[c][4]);b.style.setProperty("--kf",TONES[c][6])}
      b.innerHTML=`<span class="n"></span>`;b.firstChild.textContent=it.name;
      const d=document.createElement("div");d.className="dest";
      track.append(b);sec.append(track,d);
      it.b=b;it.d=d;it.picked=false;bind(it);paint(it);
    });
    board.append(sec);
  });
  commit();
}
function paint(it){
  const b=it.b;
  b.classList.toggle("chg",changed(it));
  const e=cur(it,"e");b.classList.toggle("done",e!=null);
  const hold=cur(it,"v")===P0+5;
  b.querySelector(".vv")?.remove();
  const pk=e!=null?494:hold?96:0;
  if(pk)b.insertAdjacentHTML("beforeend",`<img class="pk vv" src="${SPR[pk]}" alt="">`);
  it.d.replaceChildren();
  const add=(t,cls)=>{const s=document.createElement("span");s.textContent=t;if(cls)s.className=cls;if(it.d.childNodes.length)it.d.append(" · ");it.d.append(s)};
  if(it.p.t!==null)add(`→ ${optName(it.p.t)}`,tone(it.p.t,it.from.t));
  ["o","v","e"].forEach(k=>{if(it.p[k]!==null)add(optName(it.p[k]))});
  b.setAttribute("aria-label",`${it.name}: ${optName(cur(it,"t"))}`);
}
const OFF=36;
function paintPick(it){
  it.b.classList.toggle("is-picked",!!it.picked);
  it.b.style.transform=it.picked?`translateX(${-OFF}px)`:"";
  it.b.setAttribute("aria-pressed",it.picked?"true":"false");
}
function commit(){
  const moved=items.filter(changed);
  const picked=items.filter(i=>i.picked).length;
  $("ac-count").textContent=`${moved.length} ${moved.length===1?"cambio":"cambios"}`+(picked?` · ${picked} ${picked===1?"marcada":"marcadas"}`:"");
  $("ac-save").disabled=!moved.length;
  try{const o={};moved.forEach(i=>o[i.id]=i.p);localStorage.setItem(KEY,JSON.stringify(o))}catch(e){}
}
/* Poner un valor pendiente; si queda igual que en Notion, o se elige otra vez, se quita */
function setVal(it,o){
  if(!isProp(o)){it.p.t=o===it.from.t?null:o;return}
  const k=propOf(o)[0];
  const off=it.p[k]===o||it.from[k]===o;
  it.p[k]=off?null:o;
  if(o===LIMPIAR){if(off){if(it.p.t===BACKLOG)it.p.t=null}else it.p.t=it.from.t===BACKLOG?null:BACKLOG}
}

/* ---------- Anillos ---------- */
const dial=$("ac-dial"),face=$("ac-face");
const HOLD=180,SLOP=9,DRAG_SLOP=16,STEP=36,GAP=56,THIN=30,THICK=84,GROW=36;
const NS="http://www.w3.org/2000/svg";
let S=null,abierto=false;
const rings=()=>MODES[mode].rings;
const optsOf=c=>rings()[c][1].filter(i=>i!==SIN||S.allowSin);
const catOf=i=>Math.max(0,rings().findIndex(c=>c[1].includes(i)));
const pt=(r,a)=>[S.cx+Math.sin(a)*r,S.vy-Math.cos(a)*r];
function sector(r1,r2,a1,a2){
  const [x1,y1]=pt(r2,a1),[x2,y2]=pt(r2,a2),[x3,y3]=pt(r1,a2),[x4,y4]=pt(r1,a1);
  return `M${x1} ${y1}A${r2} ${r2} 0 0 1 ${x2} ${y2}L${x3} ${y3}A${r1} ${r1} 0 0 0 ${x4} ${y4}Z`;
}
function shape(tag,attrs,text){
  const e=document.createElementNS(NS,tag);
  for(const k in attrs)e.setAttribute(k,attrs[k]);
  if(text!==undefined)e.textContent=text;
  face.append(e);return e;
}
function openDial(it,how,x,y){
  const w=innerWidth;
  const picked=items.filter(i=>i.picked);
  const group=it.picked&&picked.length>1?picked:[it];
  const W=Math.min(w/2-4,260);
  const rows=rings().length;
  const need=GAP+rows*THIN+THICK+GROW+64;
  const fy=Math.max(need+8,Math.min(innerHeight-20,y));
  const cx=Math.max(W+4,Math.min(w-W-4,x));
  const k=mode==="t"?"t":mode;
  const now=cur(it,k);
  const sel=now!=null&&rings().some(r=>r[1].includes(now))?now:rings()[0][1][0];
  const start=catOf(sel);
  S={it,group,W,cx,fy,vy:fy+W,sel,cat:start,startCat:start,mode:how,startX:x,startY:y,ax:x,ay:y,lock:null,moved:false,pressing:how==="drag",allowSin:group.every(i=>i.from.t===SIN),CANCEL:rows};
  $("ac-task").textContent=group.length>1?`${group.length} tareas`:it.name;
  $("ac-head").style.top=Math.max(8,fy-need+4)+"px";
  dial.hidden=false;
  render();
}
function render(){
  const {cat,W,sel,it,CANCEL}=S;
  face.replaceChildren();
  let r=W+GAP,activeMid=null,activeIn=0;
  for(let c=0;c<=CANCEL;c++){
    const active=c===cat&&c!==CANCEL,th=active?THICK:THIN,quit=c===CANCEL;
    const am=Math.asin(Math.min(1,W/(r+th)))+.02;
    if(active){activeMid=r+th/2;activeIn=r}
    else{
      const on=quit&&cat===CANCEL;
      shape("path",{class:"band"+(quit?" quit":"")+(on?" on":""),d:sector(r,r+th,-am,am),"data-cat":c});
      const name=quit?"✕ Cancelar":rings()[c][0];
      const cls="bt"+(quit?" quit":"")+(on?" on":"");
      (c>cat&&!quit?[-.62,.62]:[0]).forEach(k=>{
        const a=Math.asin(k*W/(r+th/2));const [tx,ty]=pt(r+th/2,a);
        shape("text",{class:cls,x:tx,y:ty,transform:`rotate(${a*180/Math.PI} ${tx} ${ty})`},name);
      });
    }
    r+=th;
  }
  if(activeMid!==null){
    const opts=optsOf(cat),n=opts.length,am=Math.asin(Math.min(1,W/activeMid));
    const draw=(o,i)=>{
      const isSel=o===sel,a1=-am+2*am*i/n,a2=-am+2*am*(i+1)/n,ma=(a1+a2)/2;
      const top=activeIn+THICK+(isSel?GROW:0);
      shape("path",{class:"wedge "+tone(o,it.from.t)+(isSel?" sel":""),d:sector(activeIn,top,a1,a2),"data-opt":o});
      const [tx,ty]=pt((activeIn+top)/2,ma);
      let parts=SHORT[o].split(" ");
      const pk=PKOPT[o-P0];
      let dy=0;
      if(pk){   // la opción lleva su Pokémon en lugar del emoji
        parts=parts.slice(1);const sz=isSel?36:28;
        shape("image",{href:SPR[pk],x:tx-sz/2,y:ty-sz+4,width:sz,height:sz,style:"image-rendering:pixelated"});
        dy=10;
      }
      const deg=0;   // el texto va derecho
      const now=isProp(o)?cur(it,propOf(o)[0])===o:o===it.from.t;
      const cls="wt "+tone(o,it.from.t)+(now?" from":"")+(isSel?" sel":"");
      const lh=isSel?21:16;
      parts.forEach((t,j)=>shape("text",{class:cls,x:tx,y:ty+dy+(j-(parts.length-1)/2)*lh,transform:`rotate(${deg} ${tx} ${ty})`},t));
    };
    opts.forEach((o,i)=>{if(o!==sel)draw(o,i)});
    const si=opts.indexOf(sel);if(si>=0)draw(sel,si);
  }
  const route=$("ac-route");route.className="";
  const {group}=S;
  if(sel===null)route.textContent="Suelta para cancelar";
  else if(isProp(sel))route.textContent=`${group.length>1?"Todas":MODES[mode].name} → ${optName(sel)}`+(sel===LIMPIAR?" · 📌 Backlog":"");
  else if(group.length>1)route.textContent=`Todas → ${optName(sel)}`;
  else if(sel===it.from.t)route.textContent=`Se queda en ${optName(sel)}`;
  else{route.className=tone(sel,it.from.t);route.textContent=`${optName(it.from.t)} → ${optName(sel)}`}
}
/* Gesto relativo a donde tocaste: arriba/abajo cambia de anillo (un paso cada VSTEP px);
   a los lados elige dentro del anillo (un paso cada HSTEP px, más fino). Mientras vas de lado no cambia el anillo. */
/* Vibración cortita en cada paso (Android; en iPhone no hace nada) */
const buzz=()=>{try{navigator.vibrate&&navigator.vibrate(8)}catch(e){}};
const VSTEP=56,HSTEP=26,LOCK=10;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function selFor(cat,prevOpts,prevSel){
  if(cat===S.CANCEL)return null;
  const opts=optsOf(cat),k=mode==="t"?"t":mode,now=cur(S.it,k);
  if(opts.includes(now))return now;
  const f=prevOpts&&prevOpts.length>1&&prevSel!=null?prevOpts.indexOf(prevSel)/(prevOpts.length-1):0;
  return opts[Math.round(f*(opts.length-1))];
}
function pick(x,y){
  const dx=x-S.ax,dy=y-S.ay,adx=Math.abs(dx),ady=Math.abs(dy);
  // Cambiar de eje solo si el dedo claramente va en la otra dirección
  if(S.lock==="h"&&ady>28&&adx<LOCK){S.lock="v";S.ax=x;return pick(x,y)}   // lo recorrido hacia arriba sí cuenta
  if(S.lock==="v"&&adx>28&&ady<LOCK){S.lock="h";S.ay=y;return pick(x,y)}
  if(!S.lock){
    if(adx>LOCK&&adx>=ady)S.lock="h";
    else if(ady>LOCK&&ady>adx*1.5)S.lock="v";
    else return;
  }
  if(S.lock==="v"){
    const n=Math.trunc(-dy/VSTEP);if(!n)return;
    S.ay-=n*VSTEP;S.ax=x;
    const cat=clamp(S.cat+n,0,S.CANCEL);
    if(cat===S.cat)return;
    const prev=S.cat===S.CANCEL?null:optsOf(S.cat);
    S.sel=selFor(cat,prev,S.sel);S.cat=cat;render();buzz();
  }else{
    const n=Math.trunc(dx/HSTEP);if(!n)return;
    S.ax+=n*HSTEP;S.ay=y;
    if(S.cat===S.CANCEL)return;
    const opts=optsOf(S.cat),i=clamp(opts.indexOf(S.sel)+n,0,opts.length-1);
    if(opts[i]!==S.sel){S.sel=opts[i];render();buzz()}
  }
}
function closeDial(apply){
  if(!S)return;
  const {group,sel}=S;
  if(apply&&sel!==null){group.forEach(i=>{setVal(i,sel);paint(i);i.picked=false;paintPick(i)});commit()}
  dial.hidden=true;S=null;
}
function bind(it){
  const b=it.b;let press=null;
  b.addEventListener("pointerdown",e=>{
    if(S||e.button)return;
    if(e.pointerType==="mouse")e.preventDefault();
    press={id:e.pointerId,x:e.clientX,y:e.clientY,swipe:false,t:setTimeout(()=>{
      if(!press)return;const p=press;press=null;
      try{b.setPointerCapture(p.id)}catch(err){}
      openDial(it,"drag",p.x,p.y);
    },HOLD)};
  });
  b.addEventListener("pointermove",e=>{
    if(!press)return;
    const dx=e.clientX-press.x,dy=e.clientY-press.y;
    if(!press.swipe&&Math.hypot(dx,dy)>SLOP){
      clearTimeout(press.t);
      if(Math.abs(dx)>Math.abs(dy)){press.swipe=true;b.classList.add("swiping");try{b.setPointerCapture(press.id)}catch(err){}}
      else{press=null;return}
    }
    if(press.swipe){press.dx=Math.max(-OFF,Math.min(0,dx+(it.picked?-OFF:0)));b.style.transform=`translateX(${press.dx}px)`}
  });
  const stop=e=>{
    if(!press)return;clearTimeout(press.t);
    const p=press,tap=e.type==="pointerup";press=null;
    if(p.swipe){b.classList.remove("swiping");if(tap)it.picked=p.dx<-OFF/2;paintPick(it);commit()}
    else if(tap)openDial(it,"sticky",e.clientX,e.clientY);
  };
  b.addEventListener("pointerup",stop);b.addEventListener("pointercancel",stop);
  b.addEventListener("contextmenu",e=>e.preventDefault());
  b.addEventListener("keydown",e=>{
    if(S)return;
    if(e.key==="Enter"||e.key===" "){e.preventDefault();const r=b.getBoundingClientRect();openDial(it,"sticky",r.left,r.top)}
    else if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();it.picked=e.key==="ArrowLeft";paintPick(it);commit()}
  });
}
addEventListener("pointermove",e=>{
  if(!S||!S.pressing)return;
  if(!S.moved&&Math.hypot(e.clientX-S.startX,e.clientY-S.startY)>DRAG_SLOP)S.moved=true;
  if(S.moved)pick(e.clientX,e.clientY);
});
addEventListener("pointerup",()=>{
  if(!S||!S.pressing)return;
  S.pressing=false;
  if(S.moved){closeDial(true);return}   // arrastró: suelta y se guarda lo elegido
  // Fue un toque: queda abierto. Si tocó un anillo o una opción, se usa; Cancelar cierra sin cambios
  S.mode="sticky";const t=S.tap;S.tap=null;
  if(!t)return;
  if(t.cat===S.CANCEL){closeDial(false);return}
  if(t.cat!=null){S.cat=t.cat;S.sel=selFor(t.cat,null,null);render();buzz()}
  else if(t.opt!=null){S.sel=t.opt;closeDial(true)}
});
addEventListener("pointercancel",()=>{if(S)closeDial(false)});
/* Abierto con un toque: el dedo va donde quieras y se arrastra igual que al mantener presionado. Tocar fuera no cierra. */
dial.addEventListener("pointerdown",e=>{
  if(!S||S.mode!=="sticky")return;
  const c=e.target.closest("[data-cat]"),o=e.target.closest("[data-opt]");
  S.tap=c?{cat:+c.getAttribute("data-cat")}:o?{opt:+o.getAttribute("data-opt")}:null;
  Object.assign(S,{pressing:true,moved:false,startX:e.clientX,startY:e.clientY,ax:e.clientX,ay:e.clientY,lock:null});
});
dial.addEventListener("contextmenu",e=>e.preventDefault());
document.addEventListener("touchmove",e=>{if(S)e.preventDefault()},{passive:false});
addEventListener("keydown",e=>{
  if(!S)return;
  if(e.key==="Escape"){e.preventDefault();const b=S.it.b;closeDial(false);b.focus()}
  else if(e.key==="Enter"||e.key===" "){e.preventDefault();const b=S.it.b;closeDial(true);b.focus()}
  else if(e.key==="ArrowUp"||e.key==="ArrowDown"){
    e.preventDefault();const L=rings().length;
    S.cat=Math.max(0,Math.min(L-1,(S.cat===S.CANCEL?L-1:S.cat)+(e.key==="ArrowUp"?1:-1)));S.sel=optsOf(S.cat)[0];render();
  }else if(e.key==="ArrowLeft"||e.key==="ArrowRight"){
    e.preventDefault();if(S.cat===S.CANCEL)return;
    const o=optsOf(S.cat),i=o.indexOf(S.sel)+(e.key==="ArrowRight"?1:-1);S.sel=o[(i+o.length)%o.length];render();
  }
});
addEventListener("resize",()=>closeDial(false));

/* ---------- Abrir desde Tareas, volver y guardar ---------- */
const strip=document.querySelector(".strip");
function abrir(){
  abierto=true;loadItems();build();
  $("pg-tareas").hidden=true;strip.style.display="none";$("pg-acomodar").hidden=false;$("ac-bar").hidden=false;scrollTo(0,0);
}
function cerrar(){abierto=false;closeDial(false);$("pg-acomodar").hidden=true;$("ac-bar").hidden=true;strip.style.display=""}
document.querySelector("#ac-open img").src=SPR[599];
$("ac-open").onclick=abrir;
$("ac-back").onclick=()=>{cerrar();$("pg-tareas").hidden=false;scrollTo(0,0)};
// La barra de páginas (Tareas · Hábitos) también sale de Acomodar
document.querySelectorAll("nav.pags button").forEach(b=>b.addEventListener("click",cerrar));

/* Un solo envío con todos los cambios; el Apps Script los pone en Notion y regresa los datos nuevos */
$("ac-save").onclick=async()=>{
  if(!cfg)return toast("Falta conectar");
  const lista=items.filter(changed);
  const cambios=lista.map(it=>{
    const c={id:it.id};
    if(it.p.t!==null)c.tiempo=it.p.t===SIN?null:T[it.p.t];
    if(it.p.o!==null)c.obligatorio=propOf(it.p.o)[2];
    if(it.p.v!==null)c.vivo=propOf(it.p.v)[2];
    if(it.p.e!==null)c.estado=propOf(it.p.e)[2];
    return c;
  });
  const btn=$("ac-save");btn.disabled=true;btn.textContent="Guardando…";
  try{
    const r=await(await fetch(cfg.url,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},
      body:JSON.stringify({action:"acomodar",cambios,k:cfg.key})})).json();
    if(r.error)throw new Error(r.error);
    const malos=new Set((r.errores||[]).map(x=>x.id));
    const o=loadSaved();lista.forEach(it=>{if(!malos.has(it.id))delete o[it.id]});
    try{localStorage.setItem(KEY,JSON.stringify(o))}catch(e){}
    if(r.snap){snap=r.snap;LS.set("snap",snap)}
    toast(malos.size?`Se guardaron ${lista.length-malos.size}; ${malos.size} fallaron`:`Guardado en Notion (${lista.length})`,4000);
    window.render();   // el render de la Home (el de aquí adentro dibuja los anillos)
  }catch(e){avisoError(e,true)}
  btn.textContent="Guardar en Notion";commit();
};
/* La Home llama esto cuando llegan datos nuevos */
window.AC={refresh(){if(abierto&&!S){loadItems();build()}}};
})();
