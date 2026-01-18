// JS pour la partie Body

// Partie Menu et langue
document.getElementById("toggleMenu").addEventListener("click", function () {
    let menuContainer = document.getElementById("menuContainer");
    let icon = this.querySelector("i");

    menuContainer.classList.toggle("show");

    if (menuContainer.classList.contains("show")) {
        icon.classList.replace("bi-three-dots-vertical", "bi-x-lg");
    } else {
        icon.classList.replace("bi-x-lg", "bi-three-dots-vertical");
    }
});

document
    .getElementById("langToggle")
    .addEventListener("click", function (event) {
        event.stopPropagation();
        const menu = document.getElementById("langMenu");
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });
document.addEventListener("click", function () {
    document.getElementById("langMenu").style.display = "none";
});

// Partie Theme
const link = document.getElementById("theme-link");
const toggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// Appliquer le thème au chargement
if (localStorage.getItem("theme") === "dark") {
    link.href = "././css/dark.css";
    html.setAttribute("data-theme", "dark");
    toggle.textContent = "☀️";
}

toggle.addEventListener("click", (e) => {
    e.preventDefault();
    const isDark = link.href.includes("dark.css");
    if (isDark) {
        link.href = "././css/light.css";
        html.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        toggle.textContent = "🌙";
    } else {
        link.href = "././css/dark.css";
        html.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        toggle.textContent = "☀️";
    }
});

// Partie Effet text HP Desktop
(function () {
    const words = [
        "clients.",
        "TPE / PME / ETI / GE.",
        "startups.",
        "entreprises innovantes.",
        "entrepreneurs individuels.",
        "collectivités locales.",
        "administrations publiques.",
        "organismes gouvernementaux.",
        "institutions de recherche.",
        "centres de formation.",
        "commerçants.",
        "réseaux de franchise.",
        "associations.",
        "ONG.",
        "coopératives.",
        "professionnels indépendants.",
        "particuliers.",
    ];

    const el = document.querySelector(".soro-type");
    if (!el) return;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function loop() {
        const word = words[wordIndex];

        if (!deleting) {
            el.textContent = word.slice(0, ++charIndex);
            if (charIndex === word.length) {
                deleting = true;
                setTimeout(loop, 1000);
                return;
            }
        } else {
            el.textContent = word.slice(0, --charIndex);
            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(loop, deleting ? 60 : 90);
    }

    loop();
})();

// Partie Effet text HP Mobile
(function () {
    const words = [
        "clients.",
        "TPE / PME / ETI / GE.",
        "startups.",
        "entreprises innovantes.",
        "entrepreneurs individuels.",
        "collectivités locales.",
        "administrations publiques.",
        "organismes gouvernementaux.",
        "institutions de recherche.",
        "centres de formation.",
        "commerçants.",
        "réseaux de franchise.",
        "associations.",
        "ONG.",
        "coopératives.",
        "professionnels indépendants.",
        "particuliers.",
    ];

    const el = document.querySelector(".soro-type-mobile");
    if (!el) return;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function loop() {
        const word = words[wordIndex];

        if (!deleting) {
            el.textContent = word.slice(0, ++charIndex);
            if (charIndex === word.length) {
                deleting = true;
                setTimeout(loop, 1000);
                return;
            }
        } else {
            el.textContent = word.slice(0, --charIndex);
            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(loop, deleting ? 60 : 90);
    }

    loop();
})();



// Effet animation Noel, pluir, autone suivant un flag ou rien pour ne pas activer
// ===== Flag saison =====
// "" | winter | spring | summer | autumn | rain
const SEASON = ""; // changez selon la saison

// ===== Config saisons =====
const SEASONS = {
    winter: { color: "white", count: 150, vy: [1,3], size: [1,4], drift: 1 },
    spring: { color: "pink", count: 100, vy: [0.5,1.2], size: [2,5], drift: 1 },
    summer: { color: "yellow", count: 60, vy: [0.2,0.6], size: [1,3], drift: 1.2 },
    autumn: { colors: ["#c96a2b","#b5522b","#e3a018"], count: 100, vy: [0.6,1.4], size: [6,10], drift: 2 },
    rain: { color: "rgba(180,180,200,0.5)", count: 250, vy: [6,12], size: [10,20], drift: 2 }
};

if(SEASON && SEASONS[SEASON]) {

    const cfg = SEASONS[SEASON];

    // ===== Canvas & style =====
    const s = document.createElement("style");
    s.textContent = `#seasonFx{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999}`;
    document.head.appendChild(s);

    const c = document.createElement("canvas");
    c.id = "seasonFx";
    document.body.appendChild(c);

    const x = c.getContext("2d");

    // fonction pour ajuster le canvas à la fenêtre
    function resizeCanvas(){
        c.width = window.innerWidth;
        c.height = window.innerHeight;

        // optionnel : réduire le nombre de particules sur petit écran
        if(window.innerWidth < 768){
            cfg.count = Math.floor(cfg.count * 0.6);
        }
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // ===== Vent dynamique =====
    let windPhase = 0;
    function getWind(){ return Math.sin(windPhase)*2; }

    // ===== Particules =====
    const f = Array.from({length:cfg.count},()=>({
        x: Math.random()*c.width,
        y: Math.random()*c.height,
        r: Math.random()*(cfg.size[1]-cfg.size[0])+cfg.size[0],
        v: Math.random()*(cfg.vy[1]-cfg.vy[0])+cfg.vy[0],
        dx: Math.random()*2-1,
        angle: Math.random()*Math.PI*2,
        spin: Math.random()*0.05+0.01,
        phase: Math.random()*Math.PI*2,
        drift: cfg.drift,
        color: cfg.colors ? cfg.colors[Math.floor(Math.random()*cfg.colors.length)] : cfg.color
    }));

    // ===== Dessins spécifiques =====
    function drawLeaf(a){
        x.save();
        x.translate(a.x,a.y);
        x.rotate(a.angle);
        x.fillStyle=a.color;
        x.beginPath();
        x.moveTo(0,-a.r);
        x.bezierCurveTo(a.r,-a.r,a.r,a.r,0,a.r*1.4);
        x.bezierCurveTo(-a.r,a.r,-a.r,-a.r,0,-a.r);
        x.fill();
        x.restore();
    }

    function drawPetal(a){
        x.save();
        x.translate(a.x,a.y);
        x.rotate(a.angle);
        x.fillStyle=a.color;
        x.beginPath();
        x.ellipse(0,0,a.r*1.2,a.r,0,0,Math.PI*2);
        x.fill();
        x.restore();
    }

    function drawPollen(a){
        x.save();
        x.translate(a.x,a.y);
        x.fillStyle=a.color;
        x.beginPath();
        x.arc(0,0,a.r,0,Math.PI*2);
        x.fill();
        x.restore();
    }

    // ===== Animation =====
    (function anim(){
        x.clearRect(0,0,c.width,c.height);
        const wind = getWind();
        windPhase += 0.005; // vitesse du vent

        f.forEach(a=>{
            const windEffect = wind*a.drift;

            if(SEASON==="winter"){
                a.y += a.v;
                a.x += Math.sin(a.angle)*0.5 + windEffect;
                a.angle += 0.01;
                x.fillStyle=a.color;
                x.beginPath();
                x.arc(a.x,a.y,a.r,0,Math.PI*2);
                x.fill();
            }

            else if(SEASON==="spring"){
                a.y += a.v + Math.sin(a.phase)*0.5;
                a.x += Math.sin(a.angle)*a.drift*0.7 + windEffect;
                a.angle += a.spin;
                a.phase += 0.05;
                drawPetal(a);
            }

            else if(SEASON==="summer"){
                a.y += a.v + Math.sin(a.phase)*0.2;
                a.x += Math.sin(a.phase)*a.drift*0.3 + windEffect;
                a.phase += 0.05;
                drawPollen(a);
            }

            else if(SEASON==="autumn"){
                a.y += a.v + Math.sin(a.phase)*0.4;
                a.x += Math.sin(a.phase)*a.drift + windEffect;
                a.angle += a.spin;
                a.phase += 0.05;
                drawLeaf(a);
            }

            else if(SEASON==="rain"){
                x.beginPath();
                x.moveTo(a.x,a.y);
                x.lineTo(a.x-2,a.y+a.r);
                x.strokeStyle=a.color;
                x.lineWidth=1;
                x.stroke();
                a.y += a.v;
                a.x -= 2 + windEffect*0.5;
            }

            // ===== Reset =====
            if(a.y>c.height+30 || a.x<-30 || a.x>c.width+30){
                a.y=-30;
                a.x=Math.random()*c.width;
            }
        });

        requestAnimationFrame(anim);
    })();
}
