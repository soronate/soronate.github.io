(function(){
var d=document,h=d.documentElement,$=function(s){return d.querySelector(s)};
var b=$('.burger'),n=$('#nav'),th=$('.theme'),pr=$('.prog'),tt=$('.totop');
b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
n.addEventListener('click',function(e){if(e.target.tagName==='A')n.classList.remove('open')});
function sc(){var y=window.pageYOffset,m=h.scrollHeight-window.innerHeight;tt.classList.toggle('show',y>700);pr.style.width=(m>0?y/m*100:0)+'%'}
sc();window.addEventListener('scroll',sc,{passive:true});
tt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
function ic(){th.textContent=h.dataset.theme==='dark'?'☀️':'🌙'}ic();
th.addEventListener('click',function(){var t=h.dataset.theme==='dark'?'light':'dark';h.dataset.theme=t;try{localStorage.t=t}catch(e){}ic()});
[].forEach.call(d.querySelectorAll('[data-em]'),function(a){a.addEventListener('click',function(e){e.preventDefault();location.href='mailto:'+atob(a.dataset.em)})});
})();
