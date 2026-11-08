(function(){
var d=document,h=d.documentElement,$=function(s,r){return(r||d).querySelector(s)},$$=function(s,r){return[].slice.call((r||d).querySelectorAll(s))};
var b=$('.burger'),n=$('#nav'),top=$('.top'),th=$('.theme'),pr=$('.prog'),tt=$('.totop'),pill=$('.selpill'),red=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
n.addEventListener('click',function(e){if(e.target.tagName==='A')n.classList.remove('open')});
function sc(){var y=window.pageYOffset,m=h.scrollHeight-window.innerHeight;top.classList.toggle('solid',y>40);tt.classList.toggle('show',y>700);pr.style.width=(m>0?y/m*100:0)+'%'}
sc();window.addEventListener('scroll',sc,{passive:true});
tt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
function ic(){th.textContent=h.dataset.theme==='dark'?'☀️':'🌙'}ic();
th.addEventListener('click',function(){var t=h.dataset.theme==='dark'?'light':'dark';h.dataset.theme=t;try{localStorage.t=t}catch(e){}ic()});
// diaporama d'accueil
var hs=$$('.hero>img'),hi=0,dots=$('.dots'),tm;
function go(i){hi=(i+hs.length)%hs.length;hs.forEach(function(x,j){x.classList.toggle('on',j===hi)});$$('button',dots).forEach(function(x,j){x.style.opacity=j===hi?1:.5})}
function rs(){clearInterval(tm);if(!red)tm=setInterval(function(){go(hi+1)},7000)}
hs.forEach(function(x,i){var bt=d.createElement('button');bt.type='button';bt.setAttribute('aria-label',String(i+1));bt.addEventListener('click',function(){go(i);rs()});dots.appendChild(bt)});go(0);rs();
// heure et météo à Riga
var now=$('.now'),wx='';function wi(c){return c===0?'☀️':c<4?'⛅':c<50?'🌫️':c<70?'🌧️':c<80?'❄️':c<90?'🌦️':'⛈️'}
function tick(){try{var t=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',timeZone:'Europe/Riga'});now.textContent='🕑 '+t+(wx?' · '+wx:'')+' · Riga';now.hidden=false}catch(e){}}
tick();setInterval(tick,30000);
try{fetch('https://api.open-meteo.com/v1/forecast?latitude=56.95&longitude=24.11&current=temperature_2m,weather_code&timezone=Europe%2FRiga').then(function(r){return r.json()}).then(function(j){wx=wi(j.current.weather_code)+' '+Math.round(j.current.temperature_2m)+'°C';tick()}).catch(function(){})}catch(e){}
// compte à rebours Jāņi
var jd=$('#jd');if(jd){var t0=new Date(),td=new Date(t0.getFullYear(),t0.getMonth(),t0.getDate()),j=new Date(t0.getFullYear(),5,23);if(j<td)j=new Date(t0.getFullYear()+1,5,23);jd.textContent=Math.round((j-td)/864e5)}
// révélation + compteurs
var els=$$('.card,.note,.rv,.split>div,.tp,.mapinfo');els.forEach(function(e){e.classList.add('rv')});
function count(e){var x=$('b[data-n]',e);if(!x)return;var N=+x.dataset.n,s=x.dataset.s,t=null;(function f(ts){t=t||ts;var p=Math.min((ts-t)/1200,1);x.textContent=Math.round(N*p)+(p<1?'':s);if(p<1)requestAnimationFrame(f)})(performance.now())}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(a){a.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');count(x.target);io.unobserve(x.target)}})},{threshold:.1});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add('in')});
// filtres + recherche
var fl='*',q='';function ap(){var s=q.toLowerCase(),c=0;$$('#exp .card').forEach(function(k){var ok=(fl==='*'||k.dataset.cat===fl)&&(!s||k.textContent.toLowerCase().indexOf(s)>-1);k.hidden=!ok;if(ok)c++});$('.none').hidden=c>0}
$$('.chip').forEach(function(c){c.addEventListener('click',function(){fl=c.dataset.f;$$('.chip').forEach(function(x){x.classList.toggle('on',x===c)});ap()})});
$('.sq').addEventListener('input',function(){q=this.value;ap()});
// mon séjour
var sel=[];function us(){pill.hidden=!sel.length;$('b',pill).textContent=sel.length;var c=$('.chosen');c.hidden=!sel.length;c.textContent='★ '+sel.join(' · ')}
$$('.add').forEach(function(a){a.addEventListener('click',function(){var i=sel.indexOf(a.dataset.n);if(i>-1)sel.splice(i,1);else sel.push(a.dataset.n);var on=i<0;a.classList.toggle('on',on);a.textContent=on?a.dataset.b:a.dataset.a;a.setAttribute('aria-pressed',on);us()})});
pill.addEventListener('click',function(){$('#contact').scrollIntoView({behavior:'smooth'})});
// onglets
$$('[data-tabs]').forEach(function(t){var bs=$$('[role=tab]',t),ps=$$('[role=tabpanel]',t);bs.forEach(function(x,i){x.addEventListener('click',function(){bs.forEach(function(y,j){y.setAttribute('aria-selected',j===i);ps[j].hidden=j!==i;if(j===i)ps[j].classList.add('in')})})})});
// carte
var pins=$$('.pin'),mi=$('.mapinfo'),mg=$('img',mi);function pk(p){pins.forEach(function(x){x.classList.toggle('on',x===p)});mg.src=p.dataset.i;mg.alt=p.dataset.t;$('h3',mi).textContent=p.dataset.t;$('p',mi).textContent=p.dataset.d}
pins.forEach(function(p){p.addEventListener('click',function(){pk(p)})});if(pins[0])pk(pins[0]);
// galerie + visionneuse
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
// contact : mailto + Gmail
var f=$('#cf');function msg(){var q=new FormData(f),L=[q.get('m')];if(sel.length)L.push('',f.dataset.int+' '+sel.join(', '));L.push('',q.get('dy')+' · 👥 '+q.get('px'),q.get('n')+' <'+q.get('e')+'>');return{s:'SOROBALTE – '+q.get('n'),b:L.join('\n')}}
f.addEventListener('submit',function(e){e.preventDefault();var m=msg();location.href='mailto:'+f.dataset.to+'?subject='+encodeURIComponent(m.s)+'&body='+encodeURIComponent(m.b)});
$('#gm').addEventListener('click',function(){if(f.reportValidity&&!f.reportValidity())return;var m=msg();window.open('https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent(f.dataset.to)+'&su='+encodeURIComponent(m.s)+'&body='+encodeURIComponent(m.b),'_blank','noopener')});
})();
