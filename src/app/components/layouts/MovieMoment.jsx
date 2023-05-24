import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const MovieCard = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        import.meta.env.VITE_API_BASE_URL + "/api/popularFilm"
      );
      setMovie(result.data);
    };

    fetchData();
  }, []);

  if (!movie) {
    return <div>Chargement ou erreur</div>;
  }

  const API_IMAGE = "https://image.tmdb.org/t/p/w500/";

  return (
    <>
      <section className="flex flex-row bg-white/20 text-white font-semibold rounded border border-white mx-auto mt-28 mb-8 max-w-7xl">
        <Link to={`/details-movie/${movie.id}`}>
          <div>
            <img
              className="w-96 object-cover m-2 rounded border border-white"
              src={API_IMAGE + movie.poster_path}
            />
          </div>
        </Link>
        <div className="flex flex-col w-full mx-5">
          <div className="flex justify-center w-full pt-2">
            <Link to={`/details-movie/${movie.id}`}>
              <h1 className="text-3xl font-bold">{movie.title}</h1>
            </Link>
          </div>
          <div className="flex flex-row mt-10">
            <div className="flex flex-col w-full">
              <div>
                <span className="font-bold">Date de sortie : </span>
                {format(new Date(movie.release_date), "dd/MM/yyyy")}
              </div>
            </div>
            <div className="w-1/2 flex flex-col">
              <div>
                <span className="font-bold">Note moyenne : </span>
                {movie.vote_average}
              </div>
              <div>
                <span className="font-bold">Nombre de votes : </span>
                {movie.vote_count}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-full mt-10">
              <span className="font-bold">Synopsis : </span>
              <br />
              {movie.overview}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieCard;
