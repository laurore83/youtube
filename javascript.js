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
          <img logo channel />
        </div>
        <div>
          <a href link video>
            title video
          </a>
          <br />
          nom de la channel
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
  img.src = data.img.src;
  img.textContent = data.img.alt;

  linkVideoImg.appendChild(img);
  cardElement.appendChild(linkVideoImg);

  const cardDetails = document.createElement("div");
  cardDetails.classList.add("cardDetails");
  cardElement.appendChild(cardDetails);

  const channel = document.createElement("div");
  channel.classList.add("logo");
  cardDetails.appendChild(channel);

  const linkChannelLogo = document.createElement("a");
  linkChannelLogo.href = data.urlChannel;
  linkChannelLogo.target = "_blank"; // Pour ouvrir le link dans un nouvel onglet
  channel.appendChild(linkChannelLogo);

  const logoChannel = document.createElement("img");
  logoChannel.classList.add("logo");
  logoChannel.src = data.logoChannel;
  linkChannelLogo.appendChild(logoChannel);

  const infosVideo = document.createElement("div");
  infosVideo.classList.add("infosVideo");
  cardDetails.appendChild(infosVideo);

  const linkVideoTitle = document.createElement("a");
  linkVideoTitle.href = data.link;
  linkVideoTitle.target = "_blank"; // Pour ouvrir le link dans un nouvel onglet
  infosVideo.appendChild(linkVideoTitle);

  const titleVideo = document.createElement("span");
  titleVideo.classList.add("titleVideo");
  titleVideo.textContent = data.title;
  linkVideoTitle.appendChild(titleVideo);

  const linkChannelTitle = document.createElement("a");
  linkChannelTitle.href = data.urlChannel;
  linkChannelTitle.target = "_blank"; // Pour ouvrir le link dans un nouvel onglet
  infosVideo.appendChild(linkChannelTitle);

  const nameChannel = document.createElement("h2");
  nameChannel.textContent = data.nameChannel;
  linkChannelTitle.appendChild(nameChannel);

  const viewsNbr = document.createElement("span");
  viewsNbr.classList.add("viewsNbr");
  viewsNbr.textContent = `${data.viewsNbr} views`;
  infosVideo.appendChild(viewsNbr);

  // Ajouter un point entre le nombre de vues et la date de publication
  const point = document.createElement("span");
  point.classList.add("point");
  point.textContent = " • ";
  infosVideo.appendChild(point);

  const releaseDate = document.createElement("span");
  releaseDate.classList.add("releaseDate");
  // releaseDate.textContent = `. ${data.releaseDate}`;
  infosVideo.appendChild(releaseDate);

  //   // Ajouter la carte au conteneur des cartes dans votre page HTML
  document.getElementById("card-container").appendChild(cardElement);

  function updateDuration() {
    // calcul de durée

    // date du jour en milliseconde
    const dateNow = Date.now();
    console.log(dateNow);

    // date de parution en millisecondes
    const releaseDateMilliS = Date.parse(data.releaseDate);
    console.log(releaseDateMilliS);
    // différence en secondes
    const duration = (dateNow - releaseDateMilliS) / 1000;

    // condition de foramtage

    if (duration < 60) {
      releaseDate.textContent = `${Math.floor(duration)} seconds ago`;
    } else if (duration < 3600) {
      releaseDate.textContent = `${Math.floor(duration / 60)} minutes ago`;
    } else if (duration < 86400) {
      releaseDate.textContent = `${Math.floor(duration / 3600)} hours ago`;
    } else if (duration < 604800) {
      releaseDate.textContent = `${Math.floor(
        duration / (3600 * 24)
      )} days ago`;
    } else if (duration < 2419200) {
      releaseDate.textContent = `${Math.floor(
        duration / (3600 * 24 * 7)
      )} weeks ago`;
    } else if (duration < 29030400) {
      releaseDate.textContent = `${Math.floor(
        duration / (3600 * 24 * 30)
      )} months ago`;
    } else {
      releaseDate.textContent = `${Math.floor(
        duration / (3600 * 24 * 365)
      )} years ago`;
    }
    console.log(releaseDate);
  }
  updateDuration();

  // hover
  // Ajouter l'écouteur d'événements mouseover à l'image miniature
  img.addEventListener("mouseover", function () {
    img.src = data.miniVideo;
  });
  // Ajouter l'écouteur d'événements mouseout à l'image miniature
  img.addEventListener("mouseout", function () {
    img.src = data.img.src;
    img.textContent = data.img.alt;
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

// filtre par title
function updateSearchResults(searchText) {
  // Effacer les vidéos actuellement affichées
  document.getElementById("card-container").innerHTML = "";

  // Filtrer les vidéos dont le title correspond à la recherche
  const filteredVideos = cardData.filter((video) =>
    video.title.toLowerCase().includes(searchText.toLowerCase())
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
