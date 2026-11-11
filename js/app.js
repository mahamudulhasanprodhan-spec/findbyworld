// app.js: loads the data, search form handlers and home <-> results switching.
// Loaded last, after links.js and search.js.
// ---------- DATA ----------
// Filled by loadData() from data/countries.json and data/platforms.json (see docs/DATA.md).
// PLATFORMS: { "Country name": [[platform name, domain, what it covers, scope, searchUrl], ...] }
// COUNTRIES: [[name, ISO code], ...]
let PLATFORMS={},COUNTRIES=[];
let dataReady=false;
const REGIONS=["Africa","Asia","Europe","Middle East","North America","Latin America & Caribbean","Oceania"];
const SCOPES=["national","international"];
const isText=v=>typeof v==="string"&&v.trim()!=="";

// Returns a reason the record is bad, or "" if it is fine.
function countryProblem(c){
  if(!c||typeof c!=="object")return "not an object";
  if(!isText(c.name))return "missing name";
  if(!isText(c.iso)||!/^[A-Z]{2}$/.test(c.iso))return "iso must be two capital letters";
  if(!REGIONS.includes(c.region))return "unknown region";
  return "";
}
function platformProblem(p){
  if(!p||typeof p!=="object")return "not an object";
  if(!isText(p.name))return "missing name";
  if(!isText(p.domain))return "missing domain";
  if(!isText(p.focus))return "missing focus";
  if(!SCOPES.includes(p.scope))return "scope must be national or international";
  if(!Array.isArray(p.countries)||!p.countries.length)return "countries must be a list of ISO codes";
  if(p.searchUrl!=null&&!(isText(p.searchUrl)&&p.searchUrl.startsWith("https://")&&p.searchUrl.includes("{q}")))return "searchUrl must be null, or start with https:// and contain {q}";
  return "";
}
async function getJSON(url){
  const r=await fetch(url);
  if(!r.ok)throw new Error(url+" returned "+r.status);
  const data=await r.json();
  if(!Array.isArray(data))throw new Error(url+" must contain a list");
  return data;
}
async function loadData(){
  try{
    const [cs,ps]=await Promise.all([getJSON("data/countries.json"),getJSON("data/platforms.json")]);
    const countries=[],nameOf={},platforms={};
    cs.forEach((c,i)=>{
      const why=countryProblem(c)||(nameOf[c.iso]?"duplicate iso":"");
      if(why){console.warn(`countries.json: skipped record ${i+1} (${why})`,c);return;}
      nameOf[c.iso]=c.name;countries.push([c.name,c.iso]);
    });
    ps.forEach((p,i)=>{
      const why=platformProblem(p);
      if(why){console.warn(`platforms.json: skipped record ${i+1} (${why})`,p);return;}
      p.countries.forEach(iso=>{
        if(!nameOf[iso]){console.warn(`platforms.json: "${p.name}" lists unknown country code "${iso}"`);return;}
        const focus=(p.focusByCountry&&isText(p.focusByCountry[iso]))?p.focusByCountry[iso]:p.focus;
        (platforms[nameOf[iso]]=platforms[nameOf[iso]]||[]).push([p.name,p.domain,focus,p.scope,p.searchUrl||""]);
      });
    });
    PLATFORMS=platforms;COUNTRIES=countries;dataReady=true;
    $("#load-error").hidden=true;
  }catch(err){
    console.error("FindByWorld could not load its data files.",err);
    dataReady=false;
    const box=$("#load-error");
    box.textContent="FindByWorld could not load its data files, so search is turned off. Open the site with VS Code Live Server (right-click index.html, then \"Open with Live Server\") instead of double-clicking the file. If you are already using Live Server, check data/countries.json and data/platforms.json for a typing mistake.";
    box.hidden=false;
  }
}
loadData();

function search(q,moq){
  q=q.trim();if(!q||!dataReady)return;
  current={q,moq:moq?String(Math.max(1,parseInt(moq,10)||0)||""):""};
  $("#q-res").value=current.q;$("#m-res").value=current.moq;
  render();
  $("#home").hidden=true;$("#results").hidden=false;
  location.hash="results";window.scrollTo(0,0);
}

$("#f-home").addEventListener("submit",e=>{e.preventDefault();search($("#q-home").value,$("#m-home").value);});
$("#f-res").addEventListener("submit",e=>{e.preventDefault();search($("#q-res").value,$("#m-res").value);});
document.querySelectorAll(".tries button").forEach(b=>b.addEventListener("click",()=>{$("#q-home").value=b.dataset.q;$("#m-home").value=b.dataset.m;search(b.dataset.q,b.dataset.m);}));
function goHome(){$("#results").hidden=true;$("#home").hidden=false;}
window.addEventListener("hashchange",()=>{if(location.hash!=="#results"||!current.q)goHome();});
if(location.hash==="#results")history.replaceState(null,"",location.pathname);
