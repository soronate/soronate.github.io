
	// Fonction pour remonter en haut de la page
	function UpPage() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
	}
	/*
	// Affiche le bouton de scroll up dans la page
	  window.addEventListener('scroll', function () {
		const backToTopButton = document.getElementById('backToTop');
		if (window.scrollY > 300) {
		  backToTopButton.style.display = 'block';
		} else {
		  backToTopButton.style.display = 'none';
		}
	  });
	  */	
	  
	  // Affiche la barre de progression	  
	   	  window.onload = () => {
	      // Ecouteur d'évènement sur scroll
	      window.addEventListener("scroll", () => {
	          // Calcul de la hauteur "utile" du document
	          let hauteur = document.documentElement.scrollHeight - window.innerHeight

	          // Récupération de la position verticale
	          let position = window.scrollY

	          // Récupération de la largeur de la fenêtre
	          let largeur = document.documentElement.clientWidth

	          // Calcul de la largeur de la barre
	          let barre = position / hauteur * largeur

	          // Modification du CSS de la barre
	          document.getElementById("progress").style.width = barre+"px"
	      })
	  }
	  

	  // Decodage caracteres pour actualités	  
	  function decodeHTML(html) {
	    let txt = document.createElement("textarea");
	    txt.innerHTML = html;
	    return txt.value;
	  }


	  //*Animation du liseret sous les titres
	  document.addEventListener("DOMContentLoaded", function() {
	    const underlines = document.querySelectorAll('.title-underline');
	    const options = { threshold: 0.6 };

	    const observer = new IntersectionObserver((entries, obs) => {
	      entries.forEach(entry => {
	        if (entry.isIntersecting) {
	          entry.target.classList.add('active');
	          obs.unobserve(entry.target); // pour ne le déclencher qu'une fois
	        }
	      });
	    }, options);

	    underlines.forEach(underline => observer.observe(underline));
	  });
