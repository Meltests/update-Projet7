// fichier js "script" : Page d'accueil // 
// fichier js "login": Page login // 
// fichier js "modale" page modale // 


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

        const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette photo ?");
        if (!confirmDelete) {
          return; // si pas de confirmation de suppression alors retour //
        }


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



// CHARGEMENT DES CATERGORIES sur modale dans formulaire ajout photo // 
const categorySelect = document.getElementById('category');

async function ChargementCategories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    if (!response.ok) {
      throw new Error('Erreur récupération catégories');
    } 

    const categories = await response.json();


    categories.forEach(categorie => {
      const option = document.createElement('option'); // je creer une option de dynamique qui affichera la catégorie // 
      option.value = categorie.id;         // id de la catégorie (swagger) //
      option.textContent = categorie.name; // afficher le nom de la catégorie (swagger) //
      categorySelect.appendChild(option);
    });

  } catch (error) {
    console.error('Erreur chargement catégories:', error);
  }
}




//OUVRIR LA MODALE//

document.addEventListener('DOMContentLoaded', () => { // une fois que DOM est chargé // 
    
  ChargementCategories(); // Appel de la fonction pour charger les catégories//

  /// ------------------------------- ///
  
  const openModale = document.querySelector('.mode-edition'); //je vais chercher l'élement// 
  const modale = document.getElementById('modale1'); 

  if (openModale && modale) {
    openModale.addEventListener('click', (ouvrirModale) => {
      ouvrirModale.preventDefault(); // pour ne pas recharger la page//
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





// AJOUT PHOTO SUR LA MODALE //

      const form = document.getElementById('modaleForm'); // je vais chercher le formulaire de la modale//
      const chargementimg = document.getElementById('ajouterImg'); //
      const boutonajout = document.getElementById('boutonajout');
      const nomImage = document.getElementById('nameimg');

      if (boutonajout && chargementimg && nomImage) {
          boutonajout.addEventListener('click', () => { 
          chargementimg.click(); // changer d'image quand je clique sur le bouton //
      });


  // ajout nom du fichier dans le span à la création //
      chargementimg.addEventListener('change', () => { // change pour modifier la valeur du champ //
        if (chargementimg.files.length > 0) { // si au moins 1 fichier selectionné //
        nomImage.textContent = chargementimg.files[0].name;
        } 
       }); 
       }

// Afficher la photo ajoutée en format image //

    chargementimg.addEventListener('change', () => {
      if (chargementimg.files.length > 0) {
        const file = chargementimg.files[0];
        const reader = new FileReader();

        reader.onload = function (evenementReader) {
          const visuelImage = document.getElementById('preview-image');
          if (visuelImage) {
            visuelImage.src = evenementReader.target.result;
            visuelImage.style.display = 'block';

            // Cacher les autres éléments à l'ajout de la photo //
            const fondencartIcon = document.querySelector('.fond-encart i');
            const fondtexte = document.querySelector('.fond-encart p');

              if (fondencartIcon && boutonajout && nomImage && fondtexte) { //mettre ces elements en none//
                fondencartIcon.style.display = 'none';
                boutonajout.style.display = 'none';
                nomImage.style.display = 'none';
                fondtexte.style.display = 'none';
              }
        };
      }

        reader.readAsDataURL(file); 
        nomImage.textContent = file.name;
      }
    });
  
//////////////////////////


       if (form) {
          form.addEventListener('submit', async (eventform) => { // submit pour le formulaire //
          eventform.preventDefault(); // eviter que la page se recharge //

          const imageAjoutee = chargementimg.files[0];
          const title = document.getElementById('title').value;
          const category = document.getElementById('category').value;

     if (!imageAjoutee || !title || !category) { // si pas un des elements, recevoir ce message //
      alert('Veuillez remplir tous les champs.');
      return;
    }


    const token = localStorage.getItem('token');
    if (!token) {
      alert("Vous devez être connecté pour ajouter une photo.");
      return;
    }

    const formData = new FormData();
    formData.append('image', imageAjoutee); // append pour ajouter valeur // 
    formData.append('title', title);
    formData.append('category', category);

 
    try {
      const response = await fetch('http://localhost:5678/api/works', { // creer requete API dans POST //
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData // je viens ajouter dans mon API la data crée (img,titre,catérogie) //
      });

      if (response.ok) {
        alert("Photo ajoutée avec succès !");
        form.reset();
        nomImage.textContent = '';

        
        await Galleriemodale();
        modalePartie2.style.display = 'none'; // une fois que la photo est ajoutée, revenir sur modale 1//
        modalePartie1.style.display = 'block';
        flecheRetour.style.display = 'none';
      } else {
        alert("Échec de l'ajout");
      }

    } catch (error) {
    }
    
  });
}
});



   