(function(){ 
 
var perPage=3,currentPage=1,selectedKey=null; 
var data = window.themisBlacklist||[]; 
 
var list=document.getElementById("th-list"), 
pagination=document.getElementById("th-pagination"), 
dossier=document.getElementById("th-dossier"); 
 
 
function safe(v){ 
if(v==null)return ""; 
return String(v) 
.replace(/&/g,"&amp;") 
.replace(/</g,"&lt;") 
.replace(/>/g,"&gt;") 
.replace(/"/g,"&quot;"); 
} 
 
 
function diamonds(n){ 
var out=""; 
for(var i=0;i<n;i++)out+="&#9670;"; 
return out; 
} 
 
 
function renderList(){ 
 
var start=(currentPage-1)*perPage; 
var end=start+perPage; 
 
var html= 
'<div class="th-headrow">'+ 
'<div class="th-cell">ID</div>'+ 
'<div class="th-cell">Nome</div>'+ 
'<div class="th-cell th-category">Condizione / Categoria</div>'+ 
'<div class="th-cell">Priorità</div>'+ 
'<div class="th-cell th-watcher">Monitorato da</div>'+ 
'<div class="th-cell">Stato</div>'+ 
'</div>'; 
 
for(var i=start;i<end&&i<data.length;i++){ 
 
var p=data[i]; 
var active=selectedKey===p.key?" active":""; 
 
html+= 
'<div class="th-row'+active+'" data-key="'+safe(p.key)+'">'+ 
'<div class="th-cell th-id">'+safe(p.id)+'</div>'+ 
'<div class="th-cell th-name">'+safe(p.name)+'</div>'+ 
'<div class="th-cell th-category">'+safe(p.condition)+'</div>'+ 
'<div class="th-cell th-priority">'+diamonds(p.priority)+'</div>'+ 
'<div class="th-cell th-watcher">'+safe(p.watcher)+'</div>'+ 
'<div class="th-cell th-status '+safe(p.statusClass)+'">'+safe(p.status)+'</div>'+ 
'</div>'; 
} 
 
list.innerHTML=html; 
 
} 
 
 
function renderPagination(){ 
 
var pages=Math.ceil(data.length/perPage); 
 
if(pages<=1){ 
pagination.innerHTML=""; 
return; 
} 
 
var html=""; 
 
for(var i=1;i<=pages;i++){ 
html+='<div class="th-page'+ 
(i===currentPage?" active":"")+ 
'" data-page="'+i+'">'+i+'</div>'; 
} 
 
pagination.innerHTML=html; 
 
} 
 
 
function field(label,value,extra){ 
 
return '<div class="th-field">'+ 
'<span class="th-label">'+safe(label)+'</span>'+ 
'<div class="th-value '+(extra||"")+'">'+safe(value)+'</div>'+ 
'</div>'; 
 
} 
 
 
function renderDossier(key){ 
 
var p=null; 
 
for(var i=0;i<data.length;i++){ 
if(data[i].key===key){ 
p=data[i]; 
break; 
} 
} 
 
if(!p)return; 
 
selectedKey=key; 
 
var right=""; 
 
if(p.officialCause){ 
right+=field("Causa ufficiale",p.officialCause); 
} 
 
if(p.publicCover){ 
right+=field("Causa di copertura (uso pubblico)",p.publicCover); 
} 
 
if(p.internalCover){ 
right+=field("Nota interna / copertura reale",p.internalCover); 
} 
 
 
var html= 
 
'<div class="th-sheet-main">'+ 
 
'<div class="th-sheet-photo">'+ 
'<img src="'+safe(p.image)+'">'+ 
'</div>'+ 
 
'<div class="th-sheet-data">'+ 
 
'<div class="th-sheet-name">'+safe(p.name)+'</div>'+ 
 
'<div class="th-data-grid">'+ 
 
'<div class="th-data-col">'+ 
field("Stato",p.status,"th-value-status "+p.statusClass)+ 
field("Priorità",diamonds(p.priority),"th-diamonds")+ 
field("Monitorato da",p.watcher)+ 
field("Categoria / Condizione",p.condition)+ 
'</div>'+ 
 
'<div class="th-data-col">'+right+'</div>'+ 
 
'</div>'+ 
'</div>'+ 
'</div>'+ 
 
'<div class="th-section">'+ 
'<div class="th-section-title">Sintesi</div>'+ 
'<div class="th-section-body"><p>'+safe(p.summary)+'</p></div>'+ 
'</div>'+ 
 
'<div class="th-section">'+ 
'<div class="th-section-title">Annotazioni interne</div>'+ 
'<div class="th-section-body"><p>'+safe(p.notes)+'</p></div>'+ 
'</div>'; 
 
dossier.innerHTML=html; 
dossier.className="visible"; 
 
renderList(); 
 
} 
 
 
function changePage(page){ 
 
currentPage=page; 
selectedKey=null; 
 
dossier.innerHTML=""; 
dossier.className=""; 
 
renderList(); 
renderPagination(); 
 
} 
 
 
document.getElementById("themis-registry").onclick=function(e){ 
 
var target=e.target; 
 
while(target&&target.id!=="themis-registry"){ 
 
if(target.className&&String(target.className).indexOf("th-row")!==-1){ 
 
var key=target.getAttribute("data-key"); 
 
if(key)renderDossier(key); 
 
return; 
} 
 
if(target.className&&String(target.className).indexOf("th-page")!==-1){ 
 
var page=parseInt(target.getAttribute("data-page"),10); 
 
if(page)changePage(page); 
 
return; 
} 
 
target=target.parentNode; 
 
} 
 
}; 
 
 
renderList(); 
renderPagination(); 
 
})(); 
