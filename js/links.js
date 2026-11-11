// links.js: builds every search URL (one place for all URL logic).
// Loaded first; search.js and app.js use these functions.
// ---------- SEARCH LINKS ----------
const g=q=>"https://www.google.com/search?q="+encodeURIComponent(q);
const siteSearch=(domain,q,country)=>g(`site:${domain} ${q}${country?" "+country:""}`);
// A platform is [name, domain, focus, scope, searchUrl]. International platforms list suppliers from
// many countries, so their search also includes the country the link is shown under.
const platformSearch=(p,q,country)=>siteSearch(p[1],q,p[3]==="international"?country:"");
// The platform's own search page, built from its searchUrl template ("" when it has none).
// {q} is replaced by the product and {country} by the country name, both URL-encoded.
// {q-} is replaced by the product in lowercase with hyphens between words ("leather-bags"),
// for sites that put the search in the path. If the product has no letters a-z or digits,
// there is no direct link and the Google link is used.
const slug=q=>q.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
function platformDirect(p,q,country){
  if(!p[4])return "";
  const s=slug(q);
  if(p[4].includes("{q-}")&&!s)return "";
  return p[4].replace(/\{q-\}/g,()=>s).replace(/\{q\}/g,()=>encodeURIComponent(q)).replace(/\{country\}/g,()=>encodeURIComponent(country));
}
const kompass=(q,country)=>siteSearch("kompass.com",q,country);
// True when a country's platform list already has its own Kompass site (e.g. gb.kompass.com).
// That site is then the main result, so the small "Kompass" link is not shown again.
const hasOwnKompass=list=>list.some(p=>/(^|\.)kompass\.com$/.test(p[1]));
const alibaba=(q,country)=>siteSearch("alibaba.com",q+" supplier",country);
const web=(q,country,moq)=>g(`${q} manufacturer exporter ${country}${moq?" MOQ "+moq:""}`);
