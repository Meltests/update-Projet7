//INFOS : je n'ai pas encore lier le fichier au html// 
// fichier js 1 : tout ce qui est lié à la page d'accueil // 
// fichier js 2 (non crée) : tout ce qui sera lié à la page login // 
// fichier js 3 (non crée) : tout ce qui sera lié à la modale // 
// ==> Ne pas oublier de faire des commits réguliers // 


// CREATION GALLERIE IMAGE EN DYNAMIQUE //

async function Galleriephoto() { // Appeler l'API pour récuperer les données //
 
  let galleryItems;
  try {
    const response = await fetch('http://localhost : mettre ladresse ici'); // remplace l'URL par la tienne //

    if (!response.ok) {
      throw new Error ('Erreur lors du chargement'); // Le message s'affiche si pas de lien avec API // 
    }

  galleryItems = await response.json(); // je nomme data le fichier qui contiendra les elements de mon API  //
     
} catch (error) {
    console.error(error);
  }
 ;



  const galleryContainer = document.querySelector('.gallery'); // j'apelle la class de ma galerie pour creer des elements en dynamique //

  galleryItems.forEach(item => { //je creer ma boucle qui contient ces elements : je recupere l'element json // 
    const figure = document.createElement('figure'); // je creer l'element figure dans le html //
    const img = document.createElement('img'); // je creer l'element img dans le html //
    img.src = item.src; // je récupere l'image //
    img.alt = item.alt; // je récuperer le alt // 

    const figcaption = document.createElement('figcaption');
    figcaption.innerText = item.captionText; // Pour y mettre le texte correspondant //

    figure.appendChild(img); // les appendChild lient l'element enfant au Parent //  
    figure.appendChild(figcaption);
    galleryContainer.appendChild(figure); 
  })
};

// /!\ Pour la boucle, voir si je dois utiliser for. let. lenght à la place de foreach // 




// CREATION BOUTONS CATEGORIES EN DYNAMIQUE // 

async function Categories () { // Appeler l'API pour récuperer les données // 
  let categoryItems;
  try {
    const response = await fetch('http://localhost : mettre ici API liées aux catégories'); // remplace l'URL par la tienne //

    if (!response.ok) {
      throw new Error ('Erreur lors du chargement'); // message si pas de lien avec API // 
    }
   
  categoryItems = await response.json();

      } catch (error) {
    console.error(error);
  }
  
  
  // Creer bouton 'Tous' // 
  const filtresContainer = document.getElementById('button-container'); //  j'apelle l'emplacement de mon HTML pour creer un element //
  const buttons = document.createElement('button') // je creer un bouton // 
  buttons.innerText = "Tous"; // j'apelle le bouton "Tous" //
  buttons.classList.add("filtres-button"); // je lui ajoute une class css // 
  buttons.addEventListener("click", Galleriephoto); //je creer un evenement au click  sur mon bouton // 
  filtresContainer.appendChild(buttons); // je lie l'element enfant "bouton" à l'élement parent "filtresContianer". 
  

  // Creer boucle / bouton pour chaque catégorie // 

 categoryItems.forEach(categories => { 
  const button = document.createElement('button');
  button.innerText = // donner le nom de la categorie de l'API//
  button.classList.add("filtres-button");

  button.addEventListener("click", filtrerCaterogieGalerie); // creer cette fonction pour filtrer la catégorie du bouton cliqué // 
  });

  filtresContainer.appendChild(button);
};



async function filtrerCaterogieGalerie() {
  const response = await fetch(`http://localhost/`);  // recuperer les photos filtrées dans l'API //
  if (!response.ok) {
    console.error("Erreur lors du chargement des photos filtrées");
    return;
  }
  const filtrerPhotos = await response.json(); //creation fichier json//
  const galleryContainer = document.querySelector('.gallery'); // chercher l'element dans le DOM //
    galleryContainer.innerHTML = ''; // permet de supprimer la galleries des catégories nons appelées // 

  filteredPhotos.forEach(item => {
      const figure = document.createElement('figure'); // creer element figure //
      const img = document.createElement('img'); //creer element img//
      img.src = item.src;
      img.alt = item.alt;

      const figcaption = document.createElement('figcaption'); //creer element caption//
      figcaption.innerText = item.captionText;

      figure.appendChild(img); // lier element enfant à parent // 
      figure.appendChild(figcaption);
      galleryContainer.appendChild(figure);
    });

}

  document.addEventListener('DOMContentLoaded', () => { 
  Galleriephoto();
  Categories();
  console.log('ça fonctionne')
  });