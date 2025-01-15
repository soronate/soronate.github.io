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


	<script>
	  document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
		link.addEventListener('click', function () {
		  const navbarCollapse = document.getElementById('navbarResponsive');
		  const navbarToggler = document.querySelector('.navbar-toggler');

		  if (navbarCollapse.classList.contains('show')) {
			navbarCollapse.classList.remove('show');
			navbarToggler.setAttribute('aria-expanded', 'false');
		  }
		});
	  });

	</script>

	<script>
		document.addEventListener('DOMContentLoaded', () => {
			const closeMenuButton = document.getElementById('closeMenuButton');
			const menuToggler = document.getElementById('menuToggler');
			const navbarResponsive = document.getElementById('navbarResponsive');

			closeMenuButton.addEventListener('click', () => {
				menuToggler.click(); // Simule un clic sur le toggler pour fermer le menu
			});
		});
	</script>