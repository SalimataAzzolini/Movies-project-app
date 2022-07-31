import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Card from "../components/Card";

const UserList = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    //On recupère l'id des films coup de coeur dans le locl sotarge
    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(",") // on sépare les tableau avec split
      : [];

    for (let i = 0; i < moviesId.length; i++) {
      // On fait un boucle sur tous les élements de coup de coeur
      //Puis par la suite on les intègres dans le axios et i pour le tour de boucle dans lequel il est
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR`
        )
        .then((res) => setListData((listData) => [...listData, res.data])); //Ici avec ... ou spred opérateur
      // on casse le tableau en cours et on ajoute res.data tous les films
    }
  }, []);

  //  III. AFFICHAGE
  return (
    <div className="user-list-page">
      <Header />
      <h2>
        <span>💛</span> Coup de coeur <span>💖</span>
      </h2>

      <div className="result">
        {listData.length > 0 ? (
          listData.map((movie) => <Card movie={movie} key={movie.id} />)
        ) : (
          <h2>Aucun coup de coeur pour le moment</h2>
        )}
      </div>
    </div>
  );
};

export default UserList;
