(function(){ 
var perPage = 3; 
var currentPage = 1; 
var selectedKey = null; 
 
/* DB AFFLITTI */ 
console.log(window.troubled); 
var afflitti = window.troubled; 
 
var list = document.getElementById("hb-record-list"); 
var pagination = document.getElementById("hb-pagination"); 
var dossier = document.getElementById("hb-dossier"); 
var count = document.getElementById("hb-result-count"); 
 
/* HTML*/ 
function safe(value){ 
if(value === null || value === undefined){ 
return ""; 
} 
return String(value) 
.replace(/&/g,"&amp;") 
.replace(/</g,"&lt;") 
.replace(/>/g,"&gt;") 
.replace(/"/g,"&quot;"); 
} 
 
/* LISTA */ 
function renderList(){ 
var start = (currentPage - 1) * perPage; 
var end = start + perPage; 
var html = ""; 
for(var i=start;i<end && i<afflitti.length;i++){ 
var p = afflitti[i]; 
 
var active = selectedKey === p.key ? " active" : ""; 
html += '<div class="hb-record'+active+'" data-key="'+safe(p.key)+'">'+ 
'<div class="hb-cell hb-list-id">'+safe(p.id)+'</div>'+'<div class="hb-cell hb-thumb">'+ 
'<img src="'+safe(p.image)+'">'+'</div>'+'<div class="hb-cell hb-list-name">'+safe(p.name)+'<span>'+safe(p.age)+'</span>'+'</div>'+'<div class="hb-cell hb-category">'+safe(p.category)+'</div>'+'<div class="hb-cell hb-risk '+safe(p.riskClass)+'">'+safe(p.risk)+'</div>'+'<div class="hb-cell hb-noticed">'+safe(p.noticed)+'</div>'+'<div class="hb-cell hb-known">'+safe(p.known)+'</div>'+'<div class="hb-cell hb-chevron">›</div>'+'</div>'; } 
 
list.innerHTML = html; 
count.innerHTML = afflitti.length + " RISULTATI"; 
 
} 
 
 
/* ===================================================== 
 PAGINAZIONE 
===================================================== */ 
 
function renderPagination(){ 
 
var pages = Math.ceil(afflitti.length / perPage); 
 
var html = ""; 
 
for(var i=1;i<=pages;i++){ 
 
html += 
'<div class="hb-page'+ 
(i===currentPage ? ' active' : '')+ 
'" data-page="'+i+'">'+ 
i+ 
'</div>'; 
 
} 
 
pagination.innerHTML = html; 
 
} 
 
 
/* ===================================================== 
 INFO ROW 
===================================================== */ 
 
function infoRow(label,value,extraClass){ 
 
return '<div class="hb-info-row">'+ 
'<div class="hb-info-label">'+safe(label)+'</div>'+ 
'<div class="hb-info-value '+(extraClass || "")+'">'+safe(value)+'</div>'+ 
'</div>'; 
 
} 
 
 
/* ===================================================== 
 SETTORE 
===================================================== */ 
 
function sectorBlock(name,data){ 
 
 return '<div class="hb-sector">'+ 
 
 '<div class="hb-sector-icon">'+data.icon+'</div>'+ 
 
 '<div>'+ 
 '<div class="hb-sector-name">'+safe(name)+'</div>'+ 
 '<div class="hb-sector-text">'+safe(data.text)+'</div>'+ 
 '</div>'+ 
 
 '</div>'; 
} 
 
 
/* ===================================================== 
 DOSSIER 
===================================================== */ 
 
function renderDossier(key){ 
 
var p = null; 
 
for(var i=0;i<afflitti.length;i++){ 
 
if(afflitti[i].key === key){ 
p = afflitti[i]; 
break; 
} 
 
} 
 
if(!p){ 
return; 
} 
 
selectedKey = key; 
 
 
var html = 
'<div class="hb-tabs">'+'<div class="hb-tab-code active">'+safe(p.id)+'</div>'+'</div>'+ 
'<div class="hb-main">'+ '<div class="hb-main-photo">'+'<img src="'+safe(p.image)+'">'+ 
'</div>'+ 
'<div class="hb-main-datas">'+'<div class="hb-main-name">'+safe(p.name)+'</div>'+ 
infoRow("Età",p.age)+ 
infoRow("Occupazione",p.occupation)+ 
infoRow("Residenza",p.residence)+ 
infoRow("Stato civile",p.civil)+'</div>'+ 
'<div class="hb-detail-panel">'+'<div class="hb-panel-title">Dettagli principali</div>'+ 
infoRow("Categoria",p.category)+ 
infoRow("Sottocategoria",p.subcategory)+ 
infoRow("Rischio",p.risk,p.riskClass)+ 
infoRow("Controllo",p.control)+ 
infoRow("Ereditarietà",p.inheritance)+'</div>'+'</div>'+ 
'<div class="hb-box">'+'<div class="hb-sections-title">Descrizione problema</div>'+'<div class="hb-box-body">'+safe(p.description)+'</div>'+'</div>'+ 
'<div class="hb-triple">'+'<div class="hb-triple-box">'+'<div class="hb-sections-title">Prima apparizione nota</div>'+'<div class="hb-small-text">'+safe(p.firstKnown)+'</div>'+ 
'</div>'+'<div class="hb-triple-box">'+'<div class="hb-sections-title">Come è stato notato</div>'+'<div class="hb-small-text">'+ 
safe(p.discovery)+'<br><br>'+ 
safe(p.discoveryDetail)+'</div>'+'</div>'+ 
'<div class="hb-triple-box">'+'<div class="hb-sections-title">Esposizione pubblica</div>'+ 
'<div class="hb-small-text">'+safe(p.exposure)+'<br><br>'+safe(p.cover)+'</div>'+'</div>'+'</div>'+ 
'<div class="hb-double">'+'<div class="hb-double-box">'+'<div class="hb-sections-title">Trigger noti</div>'+'<div class="hb-small-text">'+safe(p.triggers)+'</div>'+'</div>'+ 
'<div class="hb-double-box">'+'<div class="hb-sections-title">Note</div>'+'<div class="hb-small-text">'+safe(p.notes)+'</div>'+'</div>'+'</div>'+ 
'<div class="hb-sectors">'+'<div class="hb-sections-title">Chi sa della condizione</div>'+ 
'<div class="hb-sector-grid">'+ 
sectorBlock("Militia",p.militia)+ 
sectorBlock("Syndicate",p.syndicate)+ 
sectorBlock("Aid",p.aid)+'</div>'+'</div>'+ 
'<div class="hb-dossier-footer">'+'<div class="hb-docs">'+'<strong>DOCUMENTI COLLEGATI</strong>'+' &nbsp; • &nbsp; '+safe(p.documents)+'</div>'+'<div class="hb-update">'+'<strong>ULTIMO AGGIORNAMENTO</strong>'+safe(p.updated)+'</div>'+'</div>'; 
 
 
dossier.innerHTML = html; 
dossier.className = "visible"; 
 
renderList(); 
 
} 
 
 
/* CAMBIO PAGINA */ 
 
function changePage(page){ 
 
currentPage = page; 
selectedKey = null; 
 
dossier.innerHTML = ""; 
dossier.className = ""; 
 
renderList(); 
renderPagination(); 
 
} 
 
 
/* ===================================================== 
 CLICK 
===================================================== */ 
 
document.getElementById("hb-registry").onclick = function(event){ 
 
var target = event.target; 
 
while(target && target.id !== "hb-registry"){ 
 
if(target.className && 
String(target.className).indexOf("hb-record") !== -1){ 
 
var key = target.getAttribute("data-key"); 
 
if(key){ 
renderDossier(key); 
} 
 
return; 
 
} 
 
 
if(target.className && 
String(target.className).indexOf("hb-page") !== -1){ 
 
var page = parseInt( 
target.getAttribute("data-page"), 
10 
); 
 
if(page){ 
changePage(page); 
} 
 
return; 
 
} 
 
target = target.parentNode; 
 
} 
 
}; 
 
 
/* AVVIO */ 
renderList(); 
renderPagination(); 
})(); 
