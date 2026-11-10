var d=document,h=d.documentElement,$=function(s,r){return(r||d).querySelector(s)},$$=function(s,r){return[].slice.call((r||d).querySelectorAll(s))},E=atob("__E__");
var th=$(".theme");function ic(){th.textContent=h.dataset.theme==="dark"?"☀️":"🌙"}
if(th){ic();th.addEventListener("click",function(){var t=h.dataset.theme==="dark"?"light":"dark";h.dataset.theme=t;try{localStorage.t=t}catch(e){}ic()})}
$$(".mx").forEach(function(x){x.addEventListener("click",function(){location.href="mailto:"+E+"?subject="+encodeURIComponent("SOROBALTE")})});
