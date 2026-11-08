(function(){
var d=document,h=d.documentElement,$=function(s,r){return(r||d).querySelector(s)},$$=function(s,r){return[].slice.call((r||d).querySelectorAll(s))};
var b=$('.burger'),n=$('#nav'),top=$('.top'),th=$('.theme'),pr=$('.prog'),tt=$('.totop');
b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
n.addEventListener('click',function(e){if(e.target.tagName==='A')n.classList.remove('open')});
function sc(){var y=window.pageYOffset,m=h.scrollHeight-window.innerHeight;top.classList.toggle('solid',y>40);tt.classList.toggle('show',y>700);pr.style.width=(m>0?y/m*100:0)+'%'}
sc();window.addEventListener('scroll',sc,{passive:true});
tt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
function ic(){th.textContent=h.dataset.theme==='dark'?'☀️':'🌙'}ic();
th.addEventListener('click',function(){var t=h.dataset.theme==='dark'?'light':'dark';h.dataset.theme=t;try{localStorage.t=t}catch(e){}ic()});
// révélation + compteurs
var els=$$('.card,.note,.rv,.split>div,.tp,.mapinfo');els.forEach(function(e){e.classList.add('rv')});
function count(e){var x=$('b[data-n]',e);if(!x)return;var N=+x.dataset.n,s=x.dataset.s,t0=null;(function f(t){t0=t0||t;var p=Math.min((t-t0)/1200,1);x.textContent=Math.round(N*p)+(p<1?'':s);if(p<1)requestAnimationFrame(f)})(performance.now())}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(a){a.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');count(x.target);io.unobserve(x.target)}})},{threshold:.1});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add('in')});
// filtres
$$('.chip').forEach(function(c){c.addEventListener('click',function(){$$('.chip').forEach(function(x){x.classList.toggle('on',x===c)});$$('#exp .card').forEach(function(k){k.hidden=c.dataset.f!=='*'&&k.dataset.cat!==c.dataset.f})})});
// onglets
$$('[data-tabs]').forEach(function(t){var bs=$$('[role=tab]',t),ps=$$('[role=tabpanel]',t);bs.forEach(function(x,i){x.addEventListener('click',function(){bs.forEach(function(y,j){y.setAttribute('aria-selected',j===i);ps[j].hidden=j!==i;if(j===i)ps[j].classList.add('in')})})})});
// carte
var pins=$$('.pin'),mi=$('.mapinfo');function sel(p){pins.forEach(function(x){x.classList.toggle('on',x===p)});$('h3',mi).textContent=p.dataset.t;$('p',mi).textContent=p.dataset.d}
pins.forEach(function(p){p.addEventListener('click',function(){sel(p)})});if(pins[0])sel(pins[0]);
// galerie + lightbox
var gal=$('.gal'),gi=$$('.gi'),lb=$('.lb'),li=$('img',lb),lc=$('figcaption',lb),cur=0;
$$('.ga').forEach(function(a){a.addEventListener('click',function(){gal.scrollBy({left:+a.dataset.g*gal.clientWidth*.8,behavior:'smooth'})})});
function show(i){cur=(i+gi.length)%gi.length;li.src=gi[cur].dataset.full;li.alt=gi[cur].dataset.cap;lc.textContent=gi[cur].dataset.cap}
function open(i){show(i);lb.hidden=false;h.style.overflow='hidden';$('.lbx',lb).focus()}
function close(){lb.hidden=true;h.style.overflow='';gi[cur].focus()}
gi.forEach(function(g,i){g.addEventListener('click',function(){open(i)})});
lb.addEventListener('click',function(e){var a=e.target.dataset&&e.target.dataset.a;if(a==='x'||e.target===lb)close();else if(a==='p')show(cur-1);else if(a==='n')show(cur+1)});
d.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
var sx=0;lb.addEventListener('touchstart',function(e){sx=e.changedTouches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)show(cur+(dx<0?1:-1))},{passive:true});
// contact
var f=$('#cf');f.addEventListener('submit',function(e){e.preventDefault();var q=new FormData(f);
location.href='mailto:'+f.dataset.to+'?subject='+encodeURIComponent('SOROBALTE – '+q.get('n'))+'&body='+encodeURIComponent(q.get('m')+'\n\n'+q.get('n')+' <'+q.get('e')+'>')});
})();
