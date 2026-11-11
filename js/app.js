// app.js: data, search form handlers and home <-> results switching.
// Loaded last, after links.js and search.js.
// ---------- DATA ----------
// Country-specific platforms, from "Comprehensive Global B2B Directories – All Countries (Reviewed)".
// [platform name, domain, what it covers]
const PLATFORMS={
  "Argentina":[["Kompass Argentina","ar.kompass.com","Industrial and general B2B companies"]],
  "Australia":[["IndustrySearch","industrysearch.com.au","Industrial equipment and components"]],
  "Bangladesh":[["B2Bmap","b2bmap.com","Textiles, jute, general B2B"],["ExportHub","exporthub.com","Exporters, garments"]],
  "Brazil":[["B2Brazil","b2brazil.com","General B2B, agribusiness"]],
  "Canada":[["Thomasnet","thomasnet.com","Industrial manufacturing and components"]],
  "China":[["Alibaba","alibaba.com","General manufacturing, auto parts"],["Global Sources","globalsources.com","Electronics, auto parts"],["Made-in-China","made-in-china.com","Machinery, industrial goods, consumer products"]],
  "Colombia":[["Kompass Colombia","co.kompass.com","Industrial and general B2B companies"]],
  "France":[["DirectIndustry","directindustry.com","Industrial machinery"],["Europages","europages.com","European manufacturers and wholesalers"]],
  "Germany":[["IndustryStock","industrystock.com","Machinery, engineering, components"],["WLW (wer liefert was)","wlw.de","Heavy industrial, engineering"]],
  "India":[["IndiaMART","indiamart.com","General industrial, consumer goods"],["TradeIndia","tradeindia.com","Industrial goods, textiles, chemicals"]],
  "Indonesia":[["Indonetwork","indonetwork.co.id","General trade, industrial supplies"],["Indotrading","indotrading.com","Industrial products, materials, equipment"]],
  "Japan":[["IPROS","ipros.jp","Manufacturing tech, automation"]],
  "Malaysia":[["MATRADE","matrade.gov.my","Official exporter directory"]],
  "Mexico":[["Cosmos Online","cosmos.com.mx","Chemicals, machinery, industrial goods"],["QuimiNet","quiminet.com","Industrial goods, chemicals"]],
  "Morocco":[["Kompass Morocco","ma.kompass.com","Industrial and general B2B companies"]],
  "Pakistan":[["TradeKey","tradekey.com","Textiles, leather, sports goods"]],
  "Peru":[["Kompass Peru","pe.kompass.com","Industrial and general B2B companies"]],
  "Philippines":[["Yellow Pages Philippines","yellow-pages.ph","General businesses and suppliers"]],
  "Saudi Arabia":[["Saudi Exports","saudiexports.sa","Official Saudi exporter resource"],["TradeKey","tradekey.com","General merchandise, materials"]],
  "Singapore":[["Singapore Business Federation","sbf.org.sg","Business network and trade resources"]],
  "South Africa":[["Africa Business Pages","africa-business.com","General trade, African suppliers"],["Kompass South Africa","za.kompass.com","Industrial and general B2B companies"]],
  "South Korea":[["EC21","ec21.com","Machinery, electronics"],["tradeKorea","tradekorea.com","General export"]],
  "Spain":[["SoloStocks","solostocks.com","Wholesale goods, machinery, supplies"]],
  "Taiwan":[["Taiwantrade","taiwantrade.com","IT, auto parts, hardware"]],
  "Thailand":[["Thailand YellowPages","yellowpages.co.th","Industrial and general suppliers"]],
  "Turkey":[["TurkishExporter","turkishexporter.com.tr","Textiles, apparel, machinery, food"]],
  "United Arab Emirates":[["Tradeling","tradeling.com","Wholesale food, consumer and business supplies"]],
  "United Kingdom":[["Applegate","applegate.co.uk","Engineering, plastics"],["Kompass UK","gb.kompass.com","Industrial and general B2B companies"]],
  "United States":[["Thomasnet","thomasnet.com","Industrial, custom manufacturing"],["MFG.com","mfg.com","Custom machining, CNC, fabrication"]],
  "Vietnam":[["VietnamExport","vietnamexport.com","Textiles, agriculture, footwear"]]
};
// All countries [name, ISO code]
const COUNTRIES=[["Afghanistan","AF"],["Albania","AL"],["Algeria","DZ"],["Andorra","AD"],["Angola","AO"],["Antigua and Barbuda","AG"],["Argentina","AR"],["Armenia","AM"],["Australia","AU"],["Austria","AT"],["Azerbaijan","AZ"],["Bahamas","BS"],["Bahrain","BH"],["Bangladesh","BD"],["Barbados","BB"],["Belarus","BY"],["Belgium","BE"],["Belize","BZ"],["Benin","BJ"],["Bhutan","BT"],["Bolivia","BO"],["Bosnia and Herzegovina","BA"],["Botswana","BW"],["Brazil","BR"],["Brunei","BN"],["Bulgaria","BG"],["Burkina Faso","BF"],["Burundi","BI"],["Cabo Verde","CV"],["Cambodia","KH"],["Cameroon","CM"],["Canada","CA"],["Central African Republic","CF"],["Chad","TD"],["Chile","CL"],["China","CN"],["Colombia","CO"],["Comoros","KM"],["Congo","CG"],["Costa Rica","CR"],["Croatia","HR"],["Cuba","CU"],["Cyprus","CY"],["Czechia","CZ"],["DR Congo","CD"],["Denmark","DK"],["Djibouti","DJ"],["Dominica","DM"],["Dominican Republic","DO"],["Ecuador","EC"],["Egypt","EG"],["El Salvador","SV"],["Equatorial Guinea","GQ"],["Eritrea","ER"],["Estonia","EE"],["Eswatini","SZ"],["Ethiopia","ET"],["Fiji","FJ"],["Finland","FI"],["France","FR"],["Gabon","GA"],["Gambia","GM"],["Georgia","GE"],["Germany","DE"],["Ghana","GH"],["Greece","GR"],["Grenada","GD"],["Guatemala","GT"],["Guinea","GN"],["Guinea-Bissau","GW"],["Guyana","GY"],["Haiti","HT"],["Honduras","HN"],["Hungary","HU"],["Iceland","IS"],["India","IN"],["Indonesia","ID"],["Iran","IR"],["Iraq","IQ"],["Ireland","IE"],["Israel","IL"],["Italy","IT"],["Ivory Coast","CI"],["Jamaica","JM"],["Japan","JP"],["Jordan","JO"],["Kazakhstan","KZ"],["Kenya","KE"],["Kiribati","KI"],["Kuwait","KW"],["Kyrgyzstan","KG"],["Laos","LA"],["Latvia","LV"],["Lebanon","LB"],["Lesotho","LS"],["Liberia","LR"],["Libya","LY"],["Liechtenstein","LI"],["Lithuania","LT"],["Luxembourg","LU"],["Madagascar","MG"],["Malawi","MW"],["Malaysia","MY"],["Maldives","MV"],["Mali","ML"],["Malta","MT"],["Marshall Islands","MH"],["Mauritania","MR"],["Mauritius","MU"],["Mexico","MX"],["Micronesia","FM"],["Moldova","MD"],["Monaco","MC"],["Mongolia","MN"],["Montenegro","ME"],["Morocco","MA"],["Mozambique","MZ"],["Myanmar","MM"],["Namibia","NA"],["Nauru","NR"],["Nepal","NP"],["Netherlands","NL"],["New Zealand","NZ"],["Nicaragua","NI"],["Niger","NE"],["Nigeria","NG"],["North Korea","KP"],["North Macedonia","MK"],["Norway","NO"],["Oman","OM"],["Pakistan","PK"],["Palau","PW"],["Palestine","PS"],["Panama","PA"],["Papua New Guinea","PG"],["Paraguay","PY"],["Peru","PE"],["Philippines","PH"],["Poland","PL"],["Portugal","PT"],["Qatar","QA"],["Romania","RO"],["Russia","RU"],["Rwanda","RW"],["Saint Kitts and Nevis","KN"],["Saint Lucia","LC"],["Saint Vincent and the Grenadines","VC"],["Samoa","WS"],["San Marino","SM"],["Sao Tome and Principe","ST"],["Saudi Arabia","SA"],["Senegal","SN"],["Serbia","RS"],["Seychelles","SC"],["Sierra Leone","SL"],["Singapore","SG"],["Slovakia","SK"],["Slovenia","SI"],["Solomon Islands","SB"],["Somalia","SO"],["South Africa","ZA"],["South Korea","KR"],["South Sudan","SS"],["Spain","ES"],["Sri Lanka","LK"],["Sudan","SD"],["Suriname","SR"],["Sweden","SE"],["Switzerland","CH"],["Syria","SY"],["Taiwan","TW"],["Tajikistan","TJ"],["Tanzania","TZ"],["Thailand","TH"],["Timor-Leste","TL"],["Togo","TG"],["Tonga","TO"],["Trinidad and Tobago","TT"],["Tunisia","TN"],["Turkey","TR"],["Turkmenistan","TM"],["Tuvalu","TV"],["Uganda","UG"],["Ukraine","UA"],["United Arab Emirates","AE"],["United Kingdom","GB"],["United States","US"],["Uruguay","UY"],["Uzbekistan","UZ"],["Vanuatu","VU"],["Vatican City","VA"],["Venezuela","VE"],["Vietnam","VN"],["Yemen","YE"],["Zambia","ZM"],["Zimbabwe","ZW"]];

function search(q,moq){
  q=q.trim();if(!q)return;
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
