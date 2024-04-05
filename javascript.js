let cardData = [];
// récupération de toutes les cartes
const postMethods = async () => {
  try {
    const response = await fetch("data.json"); // Remplacez 'data.json' par le chemin de votre fichier JSON
    cardData = await response.json();
    // // récupère data.json
    // cardData.map((data) => {
    //   console.log(data);

    // Peut être directement remplacé par filterByType();
    cardData.map((data) => {
      createCard(data);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données JSON :", error);
  }
};
postMethods();

// fonction createCard
function createCard(data) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const lienVideo = document.createElement("a");
  lienVideo.href = data.lien;
  lienVideo.target = "_blank"; // Pour ouvrir le lien dans un nouvel onglet

  const logoChaine = document.createElement("img");
  logoChaine.src = data.logoChaine;
  logoChaine.classList.add("logo");

  const titreVideo = document.createElement("span");
  titreVideo.textContent = data.titre;

  const nomDeLaChaineElement = document.createElement("span2");
  nomDeLaChaineElement.textContent = data.nomDeLaChaine;

  const miniatureVideo = document.createElement("img");
  miniatureVideo.src = data.miniatureVideo;

  const date = document.createElement("h3");
  date.textContent = data.dateDeParution;

  // calcul de durée

  // date du jour en milliseconde
  const dateNow = Date.now();
  console.log(dateNow);

  // date de parution
  const dateDeParution = Date.parse(data.dateDeParution);
  console.log(dateDeParution);

  function updateDuration() {
    const duration = dateNow - dateDeParution;
    // const durationS = formate en seconde
    console.log(duration);
    // console.log(durationS);
  }
  updateDuration();

  // hover
  // Ajouter l'écouteur d'événements mouseover à l'image miniature
  miniatureVideo.addEventListener("mouseover", function () {
    miniatureVideo.src = data.imgVideo;
  });
  // Ajouter l'écouteur d'événements mouseout à l'image miniature
  miniatureVideo.addEventListener("mouseout", function () {
    miniatureVideo.src = data.miniatureVideo;
  });
  // Placer l'iframe à l'intérieur du lien
  lienVideo.appendChild(miniatureVideo);
  lienVideo.appendChild(titreVideo);

  // Ajouter les éléments à la carte
  cardElement.appendChild(lienVideo);
  cardElement.appendChild(nomDeLaChaineElement);
  cardElement.appendChild(logoChaine);
  cardElement.appendChild(date);

  // Ajouter la carte au conteneur des cartes dans votre page HTML
  document.getElementById("card-container").appendChild(cardElement);
}

// Fonction pour afficher les cartes selon le type
const filterByType = (type) => {
  // Supprimer toutes les cartes actuellement affichées
  document.getElementById("card-container").innerHTML = "";

  // Boucler sur les données et afficher uniquement les cartes du type spécifié
  cardData.map((data) => {
    // Si on ne reçoit pas de type OU si le type est égal au type de data
    // if (!type || data.type === type) {
    if (data.type === type) {
      createCard(data);
    }
  });
};

// filtre
const sport = document.querySelector(".sport");
sport.addEventListener("click", function () {
  filterByType("sport");
});

const musique = document.querySelector(".musique");
musique.addEventListener("click", function () {
  filterByType("musique");
});

const jeuxVideos = document.querySelector(".jeuxVideos");
jeuxVideos.addEventListener("click", function () {
  filterByType("jeuxVideos");
});

const Tous = document.querySelector(".Tous");
Tous.addEventListener("click", function () {
  // Supprimer toutes les cartes actuellement affichées
  document.getElementById("card-container").innerHTML = "";
  postMethods();
});

// filtre par titre
function updateSearchResults(searchText) {
  // Effacer les vidéos actuellement affichées
  document.getElementById("card-container").innerHTML = "";

  // Filtrer les vidéos dont le titre correspond à la recherche
  const filteredVideos = cardData.filter((video) =>
    video.titre.toLowerCase().includes(searchText.toLowerCase())
  );

  // Afficher les vidéos filtrées
  filteredVideos.forEach((video) => createCard(video));
}

// Sélectionnez l'élément de la barre de recherche
const searchBar = document.getElementById("searchInput");

// Ajoutez un écouteur d'événements pour l'événement d'entrée (input)
searchBar.addEventListener("input", function (event) {
  // Récupérez la valeur saisie dans la barre de recherche
  const searchText = event.target.value;

  // Utilisez la valeur récupérée pour effectuer une action, par exemple, filtrer les vidéos
  // console.log("Texte saisi :", searchText);
  // Appelez la fonction de mise à jour des résultats de recherche avec le texte saisi
  updateSearchResults(searchText);
});
