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
  /*
    <div>
      <a lien video>
        <img miniature video />
      </a>
      <div>
        <div>
          <img logo chaine />
        </div>
        <div>
          <a href lien video>
            titre video
          </a>
          <br />
          nom de la chaine
          <br />
          <span>nmbr vue</span><span>. date de la video</span>
        </div>
      </div
    </div

  */

  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const lienVideoImg = document.createElement("a");
  lienVideoImg.href = data.lien;
  lienVideoImg.target = "_blank"; // Pour ouvrir le lien dans un nouvel onglet

  const miniatureVideo = document.createElement("img");
  miniatureVideo.src = data.miniatureVideo;
  lienVideoImg.appendChild(miniatureVideo);
  cardElement.appendChild(lienVideoImg);

  const cardDetails = document.createElement("div");
  cardDetails.classList.add("cardDetails");
  cardElement.appendChild(cardDetails);

  const chaine = document.createElement("div");
  chaine.classList.add("logo");
  cardDetails.appendChild(chaine);

  const logoChaine = document.createElement("img");
  logoChaine.classList.add("logo");

  logoChaine.src = data.logoChaine;
  chaine.appendChild(logoChaine);

  const infosVideo = document.createElement("div");
  infosVideo.classList.add("infosVideo");
  cardDetails.appendChild(infosVideo);

  const lienVideoTitle = document.createElement("a");
  lienVideoTitle.href = data.lien;
  lienVideoTitle.target = "_blank"; // Pour ouvrir le lien dans un nouvel onglet
  infosVideo.appendChild(lienVideoTitle);

  const titreVideo = document.createElement("span");
  titreVideo.classList.add("titreVideo");
  titreVideo.textContent = data.titre;
  lienVideoTitle.appendChild(titreVideo);

  const nomDeLaChaine = document.createElement("h2");
  nomDeLaChaine.textContent = data.nomDeLaChaine;
  infosVideo.appendChild(nomDeLaChaine);

  const nombreDeVuest = document.createElement("span");
  nombreDeVuest.classList.add("nombreDeVuest");
  nombreDeVuest.textContent = data.nombreDeVuest;
  infosVideo.appendChild(nombreDeVuest);

  const dateDeParution = document.createElement("span");
  dateDeParution.classList.add("dateDeParution");
  dateDeParution.textContent = ". " + data.dateDeParution;
  // dateDeParution.textContent = `. ${data.dateDeParution}`;
  infosVideo.appendChild(dateDeParution);

  //   // Ajouter la carte au conteneur des cartes dans votre page HTML
  document.getElementById("card-container").appendChild(cardElement);

  //   // calcul de durée

  //   // date du jour en milliseconde
  //   const dateNow = Date.now();
  //   console.log(dateNow);

  //   // date de parution
  //   const dateDeParution = Date.parse(data.dateDeParution);
  //   console.log(dateDeParution);

  //   function updateDuration() {
  //     const duration = dateNow - dateDeParution;
  //     // const durationS = formate en seconde
  //     console.log(duration);
  //     // console.log(durationS);
  //   }
  //   updateDuration();

  // hover
  // Ajouter l'écouteur d'événements mouseover à l'image miniature
  miniatureVideo.addEventListener("mouseover", function () {
    miniatureVideo.src = data.imgVideo;
  });
  // Ajouter l'écouteur d'événements mouseout à l'image miniature
  miniatureVideo.addEventListener("mouseout", function () {
    miniatureVideo.src = data.miniatureVideo;
  });
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
