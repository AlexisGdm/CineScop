import React, { useState, useEffect } from "react";

const API_KEY = "f525feb402f99bf8b6019d031f50d62e";
const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr-FR`;

const GenresDropdown = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(genresURL)
      .then(response => response.json())
      .then(data => {
        setGenres(data.genres);
      });
  }, []);

  return (
    <div className="space-y-1">
      {genres.map(genre => (
        <div key={genre.id} className="px-[20px] space-x-2">
          <input type="checkbox" id={genre.id} />
          <label htmlFor={genre.id}>{genre.name}</label>
        </div>
      ))}
    </div>
  );
};

export default GenresDropdown;