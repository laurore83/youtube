export function updateDateDuration(releaseDate) {
  // calcul de durée

  // date du jour en milliseconde
  const dateNow = Date.now();
  console.log(dateNow);

  // date de parution en millisecondes
  const releaseDateMilliS = Date.parse(releaseDate);
  console.log(releaseDateMilliS);
  // différence en secondes
  const duration = (dateNow - releaseDateMilliS) / 1000;

  // condition de formatage
  if (duration < 60) {
    return `${Math.floor(duration)} seconds ago`;
  } else if (duration < 3600) {
    return `${Math.floor(duration / 60)} minutes ago`;
  } else if (duration < 86400) {
    return `${Math.floor(duration / 3600)} hours ago`;
  } else if (duration < 604800) {
    return `${Math.floor(duration / (3600 * 24))} days ago`;
  } else if (duration < 2419200) {
    return `${Math.floor(duration / (3600 * 24 * 7))} weeks ago`;
  } else if (duration < 29030400) {
    return `${Math.floor(duration / (3600 * 24 * 30))} months ago`;
  } else {
    return `${Math.floor(duration / (3600 * 24 * 365))} years ago`;
  }
}
