import React, { useState, useEffect } from "react";
import MovieBox from "./MovieBox";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api/topRatedFilmsSlider";
const API_URL2 =
  "https://api.themoviedb.org/3/discover/movie?api_key=f525feb402f99bf8b6019d031f50d62e&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=2";
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const current = document.getElementById("current");

var currentPage = 1;
var nextPage = 2;
var previousPage = 3;
var lastUrl = "";
var totalPages = 100;

function FilmListView() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  return (
    <div className="container mx-auto  w-full pt-5 pt-auto">
      <div className="grid gap-8 grid-cols-4 grid-rows-4 ">
        {movies.map((movieReq) => (
          <MovieBox key={movieReq.id} {...movieReq} />
        ))}
      </div>
    </div>
  );
}

export default FilmListView;
