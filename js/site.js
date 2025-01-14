	// Fonction pour remonter en haut de la page
	function UpPage() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
	}
	
	// Affiche le bouton de scroll up dans la page
	  window.addEventListener('scroll', function () {
		const backToTopButton = document.getElementById('backToTop');
		if (window.scrollY > 300) {
		  backToTopButton.style.display = 'block';
		} else {
		  backToTopButton.style.display = 'none';
		}
	  });
