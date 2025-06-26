// fichier js 1 : page d'accueil // 
// fichier js 2 : page login // 
// fichier js 3 : page modale // 

//import { Galleriephoto } from './script.js';//

const form = document.getElementById('login-form'); // je vais chercher l'element de mon HTML que je souhaite traiter //

  form.addEventListener('submit', async (evenementlogin) => { // je vais écouter l'évenement au submit / formulaire // 
    evenementlogin.preventDefault(); // Empêche la soumission classique du formulaire //

    const email = document.getElementById('email').value; // je vais chercher les elements dans mon DOM //
    const password = document.getElementById('password').value; //je met value car champ input//

    try { // try pour afficher message si pas bon //
      const response = await fetch('http://localhost:5678/api/users/login', { //aller récuperer mon API//
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', // Trouvé dans request body du swagger // 
        },
        body: JSON.stringify({ email, password }), // je vais chercher les elements body dans le swagger //
      });

      if (!response.ok) {
        throw new Error('Identifiants incorrects');
      }

      const data = await response.json(); // creer fichier json pour le stocker dans localstorage //

      localStorage.setItem('token', data.token);  // Stocker le token dans localstorage ("id", "valeur")//
      window.location.href = 'index.html'; // redirection vers la page d'accueil une fois token utilisé-connecté // 

    } catch (error) {
      alert('Erreur : Email ou mot de passe incorrect'); 
    }
});