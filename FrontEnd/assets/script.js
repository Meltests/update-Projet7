
//Fonction API // 
export const urlAPI = 'http://localhost:5678/api/';

// Fonction image // 
export function creerImageElement(item) {
  const img = document.createElement('img');
  img.src = item.imageUrl;
  img.alt = item.title;
  return img;
}


// CREATION GALLERIE IMAGE EN DYNAMIQUE //
export async function Galleriephoto() { 
  try {
    const response = await fetch(urlAPI + 'works'); 
    
    if (!response.ok) {
    throw new Error('Erreur lors du chargement'); 
    }
    const galleryItems = await response.json(); 
    

    const galleryContainer = document.querySelector('.gallery'); 
    galleryContainer.innerHTML = '';

    galleryItems.forEach(item => { 
      const figure = document.createElement('figure'); 
      const img = creerImageElement(item);

      const figcaption = document.createElement('figcaption'); 
      figcaption.innerText = item.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      galleryContainer.appendChild(figure);
    });
     return galleryItems;

  } catch (error) {
    console.error(error);
  }
}



// CREATION BOUTONS CATEGORIES EN DYNAMIQUE // 

async function Categories() {
  try {
    const response = await fetch(urlAPI + 'categories');
    
    if (!response.ok)    {
        throw new Error('Erreur lors du chargement des catégories');
      } 
    const categoryItems = await response.json();

    
    // Création bouton "Tous" // 
    const filtresContainer = document.getElementById('button-container');  
    const boutonTous = document.createElement('button');
    boutonTous.innerText = "Tous";
    boutonTous.classList.add("filtres-button", "active"); 
    boutonTous.addEventListener("click", () => { 
      activerBoutonActif(boutonTous);
      Galleriephoto();
    });
   
    filtresContainer.appendChild(boutonTous); 

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



// FONCTION POUR FILTRER LES CATEGORIES // 

async function filtrerCategorieGalerie(categoryId = 0) {
  try {
    const response = await fetch(urlAPI + 'works');  
   
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des photos");
    }
    const photos = await response.json(); 

    const galleryContainer = document.querySelector('.gallery'); 
    galleryContainer.innerHTML = ''; 

    const photosFiltrees = categoryId ? photos.filter(item => item.categoryId === categoryId) : photos; 

    photosFiltrees.forEach(item => {
      const figure = document.createElement('figure'); 
      const img = document.createElement('img'); 
      img.src = item.imageUrl;
      img.alt = item.title;

      const figcaption = document.createElement('figcaption');  
      figcaption.innerText = item.title;

      figure.appendChild(img);  
      figure.appendChild(figcaption);
      galleryContainer.appendChild(figure);
    });
  } catch (error) {
    console.error(error);
  }
}

function activerBoutonActif(boutonActif) {
  const boutons = document.querySelectorAll('.filtres-button'); 
  boutons.forEach(b => b.classList.remove('active'));
  boutonActif.classList.add('active');
}



// Afficher / supprimer elements en MODE EDITION // 
  
 function AffichageloginLogout() {
  const token = localStorage.getItem('token'); 
    const banner = document.querySelector('.banner-top'); 
    const loginMenu = document.getElementById('login');
    const logoutMenu = document.getElementById('logout');
    const btnCategories = document.getElementById('button-container');
    const btnModifier = document.querySelector('.mode-edition');

  if (token) {
   banner.style.display = 'flex'; 
   loginMenu.style.display = 'none';
   logoutMenu.style.display = 'inline-block';
   btnCategories.style.display = 'none';
   btnModifier.style.display = "flex";
  } 

  const logout = document.querySelector('#logout a');
 
  if (logout) {
  logout.addEventListener('click', (evenementLogout) => {
    evenementLogout.preventDefault();

    localStorage.removeItem('token');

    banner.style.display = 'none';
    loginMenu.style.display = 'inline-block';
    logoutMenu.style.display = 'none';
    btnCategories.style.display = 'flex';
    btnModifier.style.display = 'none';
  });
}
 }

// laisser charger le html avant d'executer les fonctions // 
document.addEventListener('DOMContentLoaded', () => {
  Galleriephoto();
  Categories();
  AffichageloginLogout();
});




 