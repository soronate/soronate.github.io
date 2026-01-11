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

// Effet animation Noel
const s = document.createElement("style");
s.textContent = `#snow{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999}`;
document.head.appendChild(s);
const c = document.createElement("canvas");
c.id = "snow";
document.body.appendChild(c);
const x = c.getContext("2d");
c.width = innerWidth;
c.height = innerHeight;
const n = 120,
    f = Array.from({ length: n }, () => ({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: Math.random() * 3 + 1,
        v: Math.random() * 1.5 + 1,
    }));
(function d() {
    x.clearRect(0, 0, c.width, c.height);
    x.fillStyle = "white";
    f.forEach((a) => {
        x.beginPath();
        x.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        x.fill();
        a.y += a.v;
        if (a.y > c.height) {
            a.y = -5;
            a.x = Math.random() * c.width;
        }
    });
    requestAnimationFrame(d);
})();
