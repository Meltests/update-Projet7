// fichier js 1 : tout ce qui est lié à la page d'accueil // 
// fichier js 2 (non crée) : tout ce qui sera lié à la page login // 
// fichier js 3 (non crée) : tout ce qui sera lié à la modale // 


// GALLERIE PHOTO DANS LA MODALE CREES EN DYNAMIQUE (import js) //

import { Galleriephoto } from './script.js';

async function Galleriemodale() {

  try {
   const photosModale = await Galleriephoto();  // Appelle la fonction déjà exportée, et récupère les données API
 
   const modaleContainer = document.querySelector(".photo-gallerie"); // je récupere l'élement du DOM que je veux // 
   modaleContainer.innerHTML = ''; // vider ce qui est avant //

   photosModale.forEach(item => { // je fais ma boucle // 
        const div = document.createElement('div'); //je creer la div qui contiendra mes elements: img, alt etc//
        div.classList.add('gallerie-item'); // je crrer la class associé à la div //

        const img = document.createElement('img'); //je creer l'img dans ma div//
        img.src = item.imageUrl;
        img.alt = item.title;

        const deleteSpan = document.createElement('span'); //je creer le span dans la div qui va contenir l'icone poubelle//
        deleteSpan.classList.add('delete-icon');
        deleteSpan.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;


    // Supprimer image gallerie depuis la modale //
         
      deleteSpan.addEventListener('click', async () => { //evenemnt au clic sur pooubelle//
          
        const token = localStorage.getItem('token'); //apelle le token //
        if (!token) return;

       try {
        const response = await fetch(`http://localhost:5678/api/works/${item.id}`, { //route de l'API//
          method: 'DELETE',
          headers: {
          'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          div.remove(); // Supprime la div (img) de la modale //
          await Galleriemodale(); // Recharge la galerie modale //
        }
        } catch (error) {
        }
    });

      div.appendChild(img);
      div.appendChild(deleteSpan);
      modaleContainer.appendChild(div);
    });



    
return galleryItems;
    }
    catch (error) {
    console.error(error);
    }
};

Galleriemodale();


//OUVRIR LA MODALE//

document.addEventListener('DOMContentLoaded', () => { // je creer un evenement sur le bouton "modifier"//
  const openModale = document.querySelector('.mode-edition'); //je vais chercher l'élement// 
  const modale = document.getElementById('modale1'); 

  if (openModale && modale) {
    openModale.addEventListener('click', (ouvrirModale) => {
      ouvrirModale.preventDefault();
      modale.style.display = 'flex';
    });
  }

// FERMER LA MODALE //
  
  const fermerModale = document.querySelector('.close-btn'); // je vais chercher l'element croix//

  if (fermerModale && modale) { //j'apelle mes 2 consts concernées la croix et la modale//
        fermerModale.addEventListener('click', () => { 
        modale.style.display ='none'; // si je clique sur la croix, alors la modale disparait// 
        });
  }



  // afficher la deuxiéme partie modale au click sur valider // 

  const btnAjouterPhoto = document.getElementById('Validerbtn');
  const modalePartie1 = document.querySelector('.modale-partie-1');
  const modalePartie2 = document.querySelector('.modale-partie-2');
  const flecheRetour = document.querySelector('.fleche-retour');

    if (btnAjouterPhoto && modalePartie1 && modalePartie2 && flecheRetour) {
    btnAjouterPhoto.addEventListener('click', () => {
      modalePartie1.style.display = 'none';
      modalePartie2.style.display = 'block';
       flecheRetour.style.display = 'inline';
    });
  }
  
  // supprimer fleche de retour sur 1er slide de la modale //
   if (flecheRetour && modalePartie1 && modalePartie2) {
    flecheRetour.addEventListener('click', () => {
      modalePartie2.style.display = 'none';
      modalePartie1.style.display = 'block';
      flecheRetour.style.display = 'none';
    });
  }
 

  // fermer la modale en cliquant sur coté // 

     if (modale) { // "modale" est la class de aside, dont la partie en gris hors de la modale //
        modale.addEventListener('click', (fermerauclic) => {
          if (fermerauclic.target === modale) {
          modale.style.display = 'none';
          };
          });
      };



// supprimer ou photo avec poubelle // 


});



   