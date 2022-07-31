import React from "react";

const Card = ({ movie }) => {
  // METHODS
  //Fonction pour formater la date
  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/"); // permet d'ajouter un slahh a la fin de chaque elment
  };

  //Fonction pour mettre le genre du film
  const genreFinder = () => {
    let genreArray = [];
    for (let i = 0; i < movie.genre_ids.length; i++) {
      switch (
        movie.genre_ids[i] // en fonction de l'id on met le genre du film
      ) {
        case 28:
          genreArray.push(`Action`);
          break;
        case 12:
          genreArray.push(`Aventure`);
          break;
        case 16:
          genreArray.push(`Animation`);
          break;
        case 35:
          genreArray.push(`Comédie`);
          break;
        case 80:
          genreArray.push(`Policier`);
          break;
        case 99:
          genreArray.push(`Documentaire`);
          break;
        case 18:
          genreArray.push(`Drame`);
          break;
        case 10751:
          genreArray.push(`Famille`);
          break;
        case 14:
          genreArray.push(`Fantasy`);
          break;
        case 36:
          genreArray.push(`Histoire`);
          break;
        case 27:
          genreArray.push(`Horreur`);
          break;
        case 10402:
          genreArray.push(`Musique`);
          break;
        case 9648:
          genreArray.push(`Mystère`);
          break;
        case 10749:
          genreArray.push(`Romance`);
          break;
        case 878:
          genreArray.push(`Science-fiction`);
          break;
        case 10770:
          genreArray.push(`Téléfilm`);
          break;
        case 53:
          genreArray.push(`Thriller`);
          break;
        case 10752:
          genreArray.push(`Guerre`);
          break;
        case 37:
          genreArray.push(`Western`);
          break;
        default:
          break;
      }
      return genreArray.map((genre) => <li key={genre}>{genre}</li>);
    }
  };

  // Méthod pour enregistrer les coups de coeur dans le local storage
  const addStorage = () => {
    // On déclare une variable et on lui donne comme valeur window.localstorage s'il existe
    // sinon il crée un tableau vide
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",") // Permet de synder les element et Split partout ou il voit un tableau il met une virgule
      : [];
    if (!storedData.includes(movie.id.toString())) {
      //On vérifie qu'il n'a pas déja l'id du film et on push l'id
      storedData.push(movie.id);
      // On redonne au local storage la valeur rempli de storeData
      window.localStorage.movies = storedData;
    }
  };

  const deleteStorage = () => {
    let storedData = window.localStorage.movies.split(",");

    // Dans chaque tour de boucle on filtre l'id du movie cliqué
    let newData = storedData.filter((id) => id !== movie.id);
    // On redonne au local storage newdata les données filtrés sans l'id du film supprimé
    window.localStorage.movies = newData;
  };

  // III. AFFICAGE
  return (
    <div className="card">
      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
            : "./img/poster.jpg"
        }
        alt="affiche film"
      />
      <h2> {movie.title}</h2>
      {movie.release_date ? (
        <h5> Sorti le : {dateFormater(movie.release_date)}</h5>
      ) : (
        ""
      )}
      <h4>
        {" "}
        {movie.vote_average} / 10 <span> ⭐</span>
      </h4>

      {/* Là on demande si movie.genre_ids existe par rapport à l'autre tableau fetch utilisé dans UserList car movie est massé en props */}
      <ul>
        {movie.genre_ids
          ? genreFinder()
          : movie.genres.map(
              (
                genre,
                index // Quand on a pas de key on met index après le nom de chaqque tour de boucle
              ) => <li key={index}>{genre.name}</li>
            )}
      </ul>

      {movie.overview ? <h3> Synopsis</h3> : ""}
      <p>{movie.overview}</p>

      {movie.genre_ids ? (
        <div className="btn" onClick={() => addStorage()}>
          Ajouter aux coups de coeur
        </div>
      ) : (
        <div
          className="btn"
          onClick={() => {
            deleteStorage();
            window.location.reload(); // Il rechage le page pour enlever l'element
          }}
        >
          Supprimer de la liste
        </div>
      )}
    </div>
  );
};

export default Card;
