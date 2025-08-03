// GALLERIE PHOTO DANS LA MODALE CREES EN DYNAMIQUE (import js) //

import { Galleriephoto, creerImageElement, urlAPI} from './script.js';

async function Galleriemodale() {


  try {
   const photosModale = await Galleriephoto(); 
 
   const modaleContainer = document.querySelector(".photo-gallerie"); 
   modaleContainer.innerHTML = ''; 

   photosModale.forEach(item => {  
        const div = document.createElement('div'); 
        div.classList.add('gallerie-item'); 

        const img = creerImageElement(item); 

        const deleteSpan = document.createElement('span');
        deleteSpan.classList.add('delete-icon');
        deleteSpan.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;


    // Supprimer image gallerie depuis la modale //
         
      deleteSpan.addEventListener('click', async () => { 
          
        const token = localStorage.getItem('token'); 
        if (!token) return;

        const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette photo ?");
        if (!confirmDelete) {
          return; 
        }


        
       try {
        const response = await fetch(`http://localhost:5678/api/works/${item.id}`, { 
          method: 'DELETE',
          headers: {
          'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          div.remove(); 
          await Galleriemodale(); 
        }
        } catch (error) {
        }
    });

      div.appendChild(img);
      div.appendChild(deleteSpan);
      modaleContainer.appendChild(div);
    });

    
return ; 
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
    const response = await fetch(urlAPI + 'categories');
    if (!response.ok) {
      throw new Error('Erreur récupération catégories');
    } 

    const categories = await response.json();


    categories.forEach(categorie => {
      const option = document.createElement('option');
      option.value = categorie.id;       
      option.textContent = categorie.name;
      categorySelect.appendChild(option);
    });

  } catch (error) {
    console.error('Erreur chargement catégories:', error);
  }
} 


// Affichage des elements de l'encart ajout photo modale2 // 

function afficherElementsFormulaireImage(afficher) {
  const fondencartIcon = document.querySelector('.fond-encart i');
  const fondtexte = document.querySelector('.fond-encart p');
  const boutonajout = document.getElementById('boutonajout');
  const nomImage = document.getElementById('nameimg');

  if (fondencartIcon && boutonajout && nomImage && fondtexte) {
    fondencartIcon.style.display = afficher ? 'block' : 'none';
    boutonajout.style.display = afficher ? 'inline-block' : 'none';
    nomImage.style.display = afficher ? 'inline-block' : 'none';
    fondtexte.style.display = afficher ? 'block' : 'none';
  }
}




document.addEventListener('DOMContentLoaded', () => {  
    
  ChargementCategories(); 


//OUVRIR LA MODALE//
  
  const openModale = document.querySelector('.mode-edition'); 
  const modale = document.getElementById('modale1'); 

  if (openModale && modale) {
    openModale.addEventListener('click', (ouvrirModale) => {
      ouvrirModale.preventDefault(); 
      modale.style.display = 'flex';
    });
  }

// FERMER LA MODALE //
  
  const fermerModale = document.querySelector('.close-btn'); 

  if (fermerModale && modale) { 
        fermerModale.addEventListener('click', () => { 
        modale.style.display ='none'; 
        });
  }



  // Afficher la deuxiéme partie modale au click sur valider // 

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
  
  // Supprimer fleche de retour sur 1er slide de la modale //
   if (flecheRetour && modalePartie1 && modalePartie2) {
    flecheRetour.addEventListener('click', () => {
      modalePartie2.style.display = 'none';
      modalePartie1.style.display = 'block';
      flecheRetour.style.display = 'none';
    });
  }
 

  // Fermer la modale en cliquant sur coté // 

     if (modale) { 
        modale.addEventListener('click', (fermerauclic) => {
          if (fermerauclic.target === modale) {
          modale.style.display = 'none';
          };
          });
      };





// AJOUT PHOTO SUR LA MODALE VIA FORMULAIRE //

      const form = document.getElementById('modaleForm');
      const chargementimg = document.getElementById('ajouterImg'); 
      const boutonajout = document.getElementById('boutonajout');
      const nomImage = document.getElementById('nameimg');
      
      

      if (boutonajout && chargementimg) {
          boutonajout.addEventListener('click', () => { 
          chargementimg.click(); 
      });


  // Ajout nom du fichier dans le span à la création //
      chargementimg.addEventListener('change', () => { 
        if (chargementimg.files.length > 0) { 
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
             afficherElementsFormulaireImage(false);
            
        };
      }
        reader.readAsDataURL(file); 
        nomImage.textContent = file.name;
      }
    });
  


// POSTER CES INFOS DANS L'API // 

       if (form) {

        
          form.addEventListener('submit', async (eventform) => { 
          eventform.preventDefault(); 

          const imageAjoutee = chargementimg.files[0];
          const title = document.getElementById('title').value;
          const category = document.getElementById('category').value;
          const visuelImage = document.getElementById('preview-image');

     if (!imageAjoutee || !title || !category) { 
      alert('Veuillez remplir tous les champs.');
      return;
    }


    const token = localStorage.getItem('token');
    if (!token) {
      alert("Vous devez être connecté pour ajouter une photo.");
      return;
    }

    const formData = new FormData();
    formData.append('image', imageAjoutee); 
    formData.append('title', title);
    formData.append('category', category);

 
    try {
      const response = await fetch(urlAPI + 'works', { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData 
      });

    

      if (response.ok) {
        alert("Photo ajoutée avec succès !");
        form.reset();
        nomImage.textContent = '';     
        visuelImage.src = ''; 
        visuelImage.style.display = 'none';

        // Réafficher les éléments masqués
        afficherElementsFormulaireImage(true); 
        
        const boutonValider = document.getElementById('BtnValiderActif');
        if (boutonValider) {
        boutonValider.disabled = true;
        boutonValider.style.backgroundColor = '#A7A7A7';  
        }


        await Galleriemodale();
        modalePartie2.style.display = 'none'; 
        modalePartie1.style.display = 'block';
        flecheRetour.style.display = 'none';
      } else {
        alert("Échec de l'ajout");
      }

    } catch (error) {
    }
    
  });
}

/// Bouton apparait en vert quand tous les champs sont remplis // 
const boutonValider = document.getElementById('BtnValiderActif');
const champTitre = document.getElementById('title');
const champCategorie = document.getElementById('category');


// Fonction pour activer ou désactiver le bouton//
function activerBoutonSiChampsRemplis() {
  if (chargementimg.files.length > 0 && champTitre.value !== '' && champCategorie.value !== '') {
    boutonValider.disabled = false;
    boutonValider.style.backgroundColor = '#1D6154'; 
  } else {
    boutonValider.disabled = true;
    boutonValider.style.backgroundColor = '#A7A7A7'; 
  }
}
activerBoutonSiChampsRemplis();


// ecouter l'évenement pour activer la fonction si champs selectionné // 
chargementimg.addEventListener('change', activerBoutonSiChampsRemplis);
champTitre.addEventListener('input', activerBoutonSiChampsRemplis);
champCategorie.addEventListener('change', activerBoutonSiChampsRemplis);
});



 