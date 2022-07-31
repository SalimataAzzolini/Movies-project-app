import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

// I. DATAS
const Form = () => {
  const [moviesData, setMoviesData] = useState([]); // On déclare useSate en tant que tableau vide

  // Création variable search pour l'input et mis apres dans l'url api
  const [search, setSearch] = useState("code");

  // On déclare un variable pour top et flot et on le met à null
  const [sortGoodBad, setSortGoodBad] = useState("null");

  //II. COMPORTEMENTS, METHODS
  // UseEffect joue une fonction dès que le composant est monté
  // Ue Effect ne se rejoue que quand on fait un callback
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${search}&language=fr-FR`
      )
      .then((res) => setMoviesData(res.data.results));
  }, [search]); // on relance le useEffect avec la variable search en callback

  // III. AFFICHAGE
  return (
    <div className="form-component">
      <div className="form-container">
        <form action="">
          <input
            type="text"
            placeholder="Entrez le titre d'un film"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input type="submit" value="Rechercher" />
        </form>
        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoodBad("goodToBad")}
          >
            Top <span>→</span>
          </div>
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoodBad("badToGood")}
          >
            Flop <span>→</span>
          </div>
        </div>
      </div>
      <div className="result">
        {/* <--!D'abord on slice puis on sort
             le sort prend en params a et b pour trier du plus grand au plus petit b-a
             et apres on map --> */}
        {moviesData
          .slice(0, 12)
          .sort((a, b) => {
            // Si clik top le meilleur au pire et inversement
            if (sortGoodBad === "goodToBad") {
              return b.vote_average - a.vote_average;
            } else if (sortGoodBad === "badToGood") {
              return a.vote_average - b.vote_average;
            }
          })
          .map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Form;
