// links.js: builds every search URL (one place for all URL logic).
// Loaded first; search.js and app.js use these functions.
// ---------- SEARCH LINKS ----------
const g=q=>"https://www.google.com/search?q="+encodeURIComponent(q);
const siteSearch=(domain,q,country)=>g(`site:${domain} ${q}${country?" "+country:""}`);
// A platform is [name, domain, focus, scope]. International platforms list suppliers from
// many countries, so their search also includes the country the link is shown under.
const platformSearch=(p,q,country)=>siteSearch(p[1],q,p[3]==="international"?country:"");
const kompass=(q,country)=>siteSearch("kompass.com",q,country);
const alibaba=(q,country)=>siteSearch("alibaba.com",q+" supplier",country);
const web=(q,country,moq)=>g(`${q} manufacturer exporter ${country}${moq?" MOQ "+moq:""}`);
