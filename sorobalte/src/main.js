(function(){
var d=document,h=d.documentElement,b=d.querySelector('.burger'),n=d.getElementById('nav'),top=d.querySelector('.top'),th=d.querySelector('.theme');
b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
n.addEventListener('click',function(e){if(e.target.tagName==='A')n.classList.remove('open')});
function sc(){top.classList.toggle('solid',window.scrollY>40)}sc();addEventListener('scroll',sc,{passive:true});
function ic(){th.textContent=h.dataset.theme==='dark'?'☀️':'🌙'}ic();
th.addEventListener('click',function(){var t=h.dataset.theme==='dark'?'light':'dark';h.dataset.theme=t;try{localStorage.t=t}catch(e){}ic()});
var els=d.querySelectorAll('.card,.note,.rv,.split>div');els.forEach(function(e){e.classList.add('rv')});
function count(e){var b=e.querySelector('b[data-n]');if(!b)return;var n=+b.dataset.n,s=b.dataset.s,t0=null;(function f(t){t0=t0||t;var p=Math.min((t-t0)/1200,1);b.textContent=Math.round(n*p)+(p<1?'':s);if(p<1)requestAnimationFrame(f)})(performance.now())}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(a){a.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');count(x.target);io.unobserve(x.target)}})},{threshold:.15});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add('in')});
var f=d.getElementById('cf');
f.addEventListener('submit',function(e){e.preventDefault();var d2=new FormData(f);
location.href='mailto:'+f.dataset.to+'?subject='+encodeURIComponent('SOROBALTE – '+d2.get('n'))+'&body='+encodeURIComponent(d2.get('m')+'\n\n'+d2.get('n')+' <'+d2.get('e')+'>')});
})();
