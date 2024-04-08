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
      <a link video>
        <img miniature video />
      </a>
      <div>
        <div>
          <img logo chaine />
        </div>
        <div>
          <a href link video>
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

  const linkVideoImg = document.createElement("a");
  linkVideoImg.href = data.link;
  linkVideoImg.target = "_blank"; // Pour ouvrir le link dans un nouvel onglet

  const img = document.createElement("img");
  img.src = data.img;
  linkVideoImg.appendChild(img);
  cardElement.appendChild(linkVideoImg);

  const cardDetails = document.createElement("div");
  cardDetails.classList.add("cardDetails");
  cardElement.appendChild(cardDetails);

  const chaine = document.createElement("div");
  chaine.classList.add("logo");
  cardDetails.appendChild(chaine);

  const logoChannel = document.createElement("img");
  logoChannel.classList.add("logo");

  logoChannel.src = data.logoChannel;
  chaine.appendChild(logoChannel);

  const infosVideo = document.createElement("div");
  infosVideo.classList.add("infosVideo");
  cardDetails.appendChild(infosVideo);

  const linkVideoTitle = document.createElement("a");
  linkVideoTitle.href = data.link;
  linkVideoTitle.target = "_blank"; // Pour ouvrir le link dans un nouvel onglet
  infosVideo.appendChild(linkVideoTitle);

  const titreVideo = document.createElement("span");
  titreVideo.classList.add("titreVideo");
  titreVideo.textContent = data.titre;
  linkVideoTitle.appendChild(titreVideo);

  const nameChannel = document.createElement("h2");
  nameChannel.textContent = data.nameChannel;
  infosVideo.appendChild(nameChannel);

  const viewsNbr = document.createElement("span");
  viewsNbr.classList.add("viewsNbr");
  viewsNbr.textContent = data.viewsNbr;
  infosVideo.appendChild(viewsNbr);

  const releaseDate = document.createElement("span");
  releaseDate.classList.add("releaseDate");
  releaseDate.textContent = ". " + data.releaseDate;
  // releaseDate.textContent = `. ${data.releaseDate}`;
  infosVideo.appendChild(releaseDate);

  //   // Ajouter la carte au conteneur des cartes dans votre page HTML
  document.getElementById("card-container").appendChild(cardElement);

  //   // calcul de durée

  //   // date du jour en milliseconde
  //   const dateNow = Date.now();
  //   console.log(dateNow);

  //   // date de parution
  //   const releaseDate = Date.parse(data.releaseDate);
  //   console.log(releaseDate);

  //   function updateDuration() {
  //     const duration = dateNow - releaseDate;
  //     // const durationS = formate en seconde
  //     console.log(duration);
  //     // console.log(durationS);
  //   }
  //   updateDuration();

  // hover
  // Ajouter l'écouteur d'événements mouseover à l'image miniature
  img.addEventListener("mouseover", function () {
    img.src = data.imgVideo;
  });
  // Ajouter l'écouteur d'événements mouseout à l'image miniature
  img.addEventListener("mouseout", function () {
    img.src = data.img;
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
