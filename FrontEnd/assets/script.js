// fichier js 1 : tout ce qui est lié à la page d'accueil // 
// fichier js 2 (non crée) : tout ce qui sera lié à la page login // 
// fichier js 3 (non crée) : tout ce qui sera lié à la modale //  




// CREATION GALLERIE IMAGE EN DYNAMIQUE //
export async function Galleriephoto() { // je fais un export pour réutiliser ma fonction dans autre js//
  try {
    const response = await fetch('http://localhost:5678/api/works'); // Appeler l'API pour récuperer les données images//
    
    if (!response.ok) {
    throw new Error('Erreur lors du chargement'); // Le message s'affiche si pas de lien avec API //
    }
    const galleryItems = await response.json(); // je nomme le fichier qui contiendra les elements de mon API //
    

    const galleryContainer = document.querySelector('.gallery'); // j'apelle la class de ma galerie pour creer des elements en dynamique //
    galleryContainer.innerHTML = '';

    galleryItems.forEach(item => { //je creer ma boucle qui contient ces elements : je recupere l'element json // 
      const figure = document.createElement('figure'); // je creer l'element figure dans le html //
      const img = document.createElement('img'); // je creer l'element img dans le html //
      img.src = item.imageUrl; // je récupere du swagger //
      img.alt = item.title;

      const figcaption = document.createElement('figcaption'); 
      figcaption.innerText = item.title;

      figure.appendChild(img);// les appendChild lient l'element enfant au Parent //  
      figure.appendChild(figcaption);
      galleryContainer.appendChild(figure);
    });
     return galleryItems; // ce qui me permet de faire mon export/import grace au json// 

  } catch (error) {
    console.error(error);
  }
}

// CREATION BOUTONS CATEGORIES EN DYNAMIQUE // 

async function Categories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories'); // remplace l'URL par la tienne //
    
    if (!response.ok)    {
        throw new Error('Erreur lors du chargement des catégories');
      } 
    const categoryItems = await response.json();

    
    // Création bouton "Tous" // 
    const filtresContainer = document.getElementById('button-container'); //  j'apelle l'emplacement de mon HTML pour creer un element // 
    const boutonTous = document.createElement('button');// je creer un bouton // 
    boutonTous.innerText = "Tous"; // j'apelle le bouton "Tous" //
    boutonTous.classList.add("filtres-button", "active"); // je lui ajoute une class css // 
    boutonTous.addEventListener("click", () => { //je creer un evenement au click  sur mon bouton // 
      activerBoutonActif(boutonTous);
      Galleriephoto();
    });
   
    filtresContainer.appendChild(boutonTous); // je lie l'element enfant "bouton" à l'élement parent "filtresContianer". 

    // Creer boucle / bouton pour chaque catégorie //
    categoryItems.forEach(category => {
      const button = document.createElement('button');
      button.innerText = category.name;
      button.classList.add("filtres-button");

      button.addEventListener("click", () => {
        activerBoutonActif(button);
        filtrerCategorieGalerie(category.id);
      });

      filtresContainer.appendChild(button);
    });

  } catch (error) {
    console.error(error);
  }
}

async function filtrerCategorieGalerie(categoryId = 0) {
  try {
    const response = await fetch('http://localhost:5678/api/works');  // recuperer les photos filtrées dans l'API //
   
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des photos");
    }
    const photos = await response.json(); //creation fichier json//

    const galleryContainer = document.querySelector('.gallery'); // chercher l'element dans le DOM //
    galleryContainer.innerHTML = ''; // Met à jour les elements du dom/ supprime la galleries des catégories nons appelées // 

    const photosFiltrees = categoryId ? photos.filter(item => item.categoryId === categoryId) : photos; // filtre selon catégorie selectionnée //

    photosFiltrees.forEach(item => {
      const figure = document.createElement('figure');  // creer element figure //
      const img = document.createElement('img'); //creer element img//
      img.src = item.imageUrl;
      img.alt = item.title;

      const figcaption = document.createElement('figcaption');  //creer element caption//
      figcaption.innerText = item.title;

      figure.appendChild(img);  // lier element enfant à parent // 
      figure.appendChild(figcaption);
      galleryContainer.appendChild(figure);
    });
  } catch (error) {
    console.error(error);
  }
}

function activerBoutonActif(boutonActif) {
  const boutons = document.querySelectorAll('.filtres-button'); // j'apelle la class de mon bouton //
  boutons.forEach(b => b.classList.remove('active')); // je remove l'activation de la couleur du bouton // 
  boutonActif.classList.add('active');
}


document.addEventListener('DOMContentLoaded', () => {
  Galleriephoto();
  Categories();


  // Afficher / supprimer elements en MODE EDITION // 
  

  const token = localStorage.getItem('token'); // je récupére le token de ma page login //
    const banner = document.querySelector('.banner-top'); // je récupere les elements du DOM // 
    const loginMenu = document.getElementById('login');
    const logoutMenu = document.getElementById('logout');
    const btnCategories = document.getElementById('button-container');
    const btnModifier = document.querySelector('.mode-edition');

  if (token) {
   banner.style.display = 'flex'; // condition sur element si token actif, pour activer l'element//
   loginMenu.style.display = 'none';
   logoutMenu.style.display = 'inline-block';
   btnCategories.style.display = 'none';
   btnModifier.style.display = "flex";
  } else {
  banner.style.display = 'none'; // condition sur element si token non actif //
  loginMenu.style.display = 'inline-block';
  logoutMenu.style.display = 'none';
  btnCategories.style.diplay = 'flex';
  btnModifier.style.display = 'none';
  }

  const logout = document.querySelector('#logout a'); // récuperer element bouton logout en //
  if (logout) {
    logout.addEventListener('click', (evenementLogout) => {
      evenementLogout.preventDefault();
      localStorage.removeItem('token');
      window.location.reload();
    });
  }
});



