// Masquer la loupe au début
window.addEventListener('DOMContentLoaded', function() {
    var loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none'; // Masque la loupe dès début
    }
});

// Capturer l'envoi
var form = document.getElementById('search-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche la redirection

        var artistInput = form.querySelector('input[name="artist"]');
        var titleInput = form.querySelector('input[name="title"]');
        var button = form.querySelector('input[type="submit"]');
        var loader = document.getElementById('loader');
        var lyricsContainer = document.getElementById('lyrics');

        // Récupérer les valeurs saisies
        var artist = artistInput.value.trim().toLowerCase();
        var title = titleInput.value.trim().toLowerCase().replace(/\s+/g, '-');

        // Vérification des champs
        if (artist === '' || title === '') {
            alert('Veuillez remplir les deux champs');
            return;
        }

        // Désactivation du bouton et affichage de la loupe pendant la recherche
        button.disabled = true;
        loader.style.display = 'inline';  // loupe
        lyricsContainer.textContent = ''; // Vide le texte 

        // API
        var url = 'https://lyrics.api.pierre-jehan.com/music?title=' + title + '&artist=' + artist;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de connexion');
                }
                return response.json();
            })
            .then(data => {
                // Vérification de la réponse de l'API
                var lyrics = data['hydra:member'];

                if (lyrics && lyrics.length > 0) {
                    lyricsContainer.textContent = lyrics[0].lyrics; // Afficher les paroles
                } else {
                    lyricsContainer.textContent = "The music you are looking for can't be found..."; // Musique introuvable
                }
            })
            .catch(error => {
                // Afficher un message d'erreur si la requête échoue
                lyricsContainer.textContent = "The music you are looking for can't be found...";
            })
            .finally(() => {
                button.disabled = false;
                loader.style.display = 'none'; // Masque la loupe
            });
    });
}
