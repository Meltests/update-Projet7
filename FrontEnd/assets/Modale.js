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

        div.appendChild(img); // je lie l'élement parent à l'élément enfant //
        div.appendChild(deleteSpan);
        modaleContainer.appendChild(div); //je met la div dans la modalecontainer//

    })
return galleryItems;
    }
    catch (error) {
    console.error(error);
    }
};

Galleriemodale();

