// search.js: renders the results, the country filter and the copy message.
// Loaded second. render() uses PLATFORMS and COUNTRIES from app.js when it runs.
// ---------- UI ----------
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let current={q:"",moq:""};

function inquiry(q,moq){
  return `Hello, I am sourcing ${q}.\nOrder quantity: ${moq?moq+" units":"small trial order"}.\nCould you share your price per unit, minimum order quantity (MOQ), lead time and shipping port?\nThank you.`;
}
// Results are grouped by region, in this order. "" in currentRegion means all regions.
const REGION_ORDER=["Asia","Africa","Europe","Middle East","North America","Latin America & Caribbean","Oceania"];
let currentRegion="";
function render(filter=""){
  const {q,moq}=current;const f=filter.trim().toLowerCase();
  const list=COUNTRIES.filter(([n,,r])=>(!f||n.toLowerCase().includes(f))&&(!currentRegion||r===currentRegion));
  const ded=list.filter(([n])=>PLATFORMS[n]);
  const rest=list.filter(([n])=>!PLATFORMS[n]);
  const totalPlat=ded.reduce((a,[n])=>a+PLATFORMS[n].length,0);
  const qd=esc(q);

  const dedCard=([n,iso])=>`
    <article class="country" id="c-${iso}">
      <div class="c-head"><span class="iso">${iso}</span><h3>${esc(n)}</h3><small>${PLATFORMS[n].length} director${PLATFORMS[n].length>1?"ies":"y"}</small></div>
      ${PLATFORMS[n].map(p=>{const [name,dom,focus]=p;const direct=platformDirect(p,q,n),viaGoogle=platformSearch(p,q,n);return `
        <div class="hit"><span class="u">${esc(dom)}</span>
          <a class="t" href="${esc(direct||viaGoogle)}" target="_blank" rel="noopener">${qd} suppliers on ${esc(name)}</a>
          <p>${esc(focus)}.${moq?` Ask for MOQ ${esc(moq)} units.`:""}</p>
          ${direct?`<a class="via" href="${viaGoogle}" target="_blank" rel="noopener" aria-label="${qd} on ${esc(name)} via Google">via Google</a>`:""}</div>`;}).join("")}
      <div class="more">${hasOwnKompass(PLATFORMS[n])?"":`<a href="${kompass(q,n)}" target="_blank" rel="noopener">Kompass</a>`}<a href="${alibaba(q,n)}" target="_blank" rel="noopener">Alibaba</a><a href="${web(q,n,moq)}" target="_blank" rel="noopener">Web search</a></div>
    </article>`;
  const restRow=([n,iso])=>`
    <div class="orow"><span class="n"><span class="iso">${iso}</span><span>${esc(n)}</span></span>
      <span class="l"><a href="${kompass(q,n)}" target="_blank" rel="noopener">Kompass</a><a href="${web(q,n,moq)}" target="_blank" rel="noopener">Web</a></span></div>`;

  // One block per region: countries with dedicated directories first, then the others.
  const regionsHTML=REGION_ORDER.map(r=>{
    const d=ded.filter(c=>c[2]===r),o=rest.filter(c=>c[2]===r),total=d.length+o.length;
    if(!total)return "";
    return `<section class="region" aria-labelledby="r-${slug(r)}">
      <h2 class="sec" id="r-${slug(r)}">${esc(r)} <small>${total} countr${total>1?"ies":"y"}</small></h2>
      ${d.map(dedCard).join("")}
      ${o.length?`${d.length?`<p class="sub">More countries in ${esc(r)}, through Kompass and web search</p>`:""}<div class="others">${o.map(restRow).join("")}</div>`:""}
    </section>`;}).join("");
  const chipsHTML="";

  $("#res").innerHTML=`
    <p class="summary">Results for <b>${qd}</b>${moq?` · MOQ <b>${esc(moq)}</b> units`:""}${currentRegion?` in <b>${esc(currentRegion)}</b>`:""} — <b>${ded.length}</b> countries with dedicated directories (${totalPlat} platforms) and <b>${rest.length}</b> more through global directories.</p>
    <div class="msg">
      <div class="msg-head"><span>Message to send suppliers</span><button class="small-btn" type="button" id="copy">Copy</button></div>
      <p id="msgtext">${esc(inquiry(q,moq))}</p>
    </div>
    <div class="jump"><input id="cf" type="search" placeholder="Jump to a country" aria-label="Filter countries" value="${esc(filter)}"></div>
    ${chipsHTML}
    ${list.length?`<p class="res-note">Each region lists countries with their own directories first. The other countries link to Kompass and web search.</p>${regionsHTML}`:""}
    ${!list.length?`<p class="empty">No country matches "${esc(filter)}"${currentRegion?` in ${esc(currentRegion)}`:""}.</p>`:""}
    <p class="disclaimer">FindByWorld links to third-party directories and does not verify suppliers. Check business licences, ask for samples and use secure payment terms before ordering.</p>`;
  const cf=$("#cf");cf.addEventListener("input",e=>{const pos=e.target.selectionStart;render(e.target.value);const n=$("#cf");n.focus();n.setSelectionRange(pos,pos);});
  $("#copy").addEventListener("click",()=>{const t=$("#msgtext").textContent;
    try{navigator.clipboard.writeText(t).then(()=>toast("Message copied"),()=>selectText());}catch(_){selectText();}});
}
function selectText(){const r=document.createRange();r.selectNodeContents($("#msgtext"));const s=getSelection();s.removeAllRanges();s.addRange(r);toast("Press Ctrl+C to copy");}
let tt;function toast(m){const t=$("#toast");t.textContent=m;t.hidden=false;clearTimeout(tt);tt=setTimeout(()=>t.hidden=true,2000);}
