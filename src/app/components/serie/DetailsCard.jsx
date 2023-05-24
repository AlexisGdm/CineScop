import React from "react";

function MovieDetailsCard({
  cover,
  title,
  tagline,
  duration,
  releaseDate,
  genres,
  countries,
  voteAverage,
  voteCount,
  synopsys,
  producer,
}) {
  const API_IMAGE = "https://image.tmdb.org/t/p/w500/";

  return (
    <section className="flex flex-row bg-white rounded mx-auto mt-28 mb-8 max-w-7xl">
      <div>
        <img
          className="w-96 object-cover p-2 rounded"
          src={API_IMAGE + cover}
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-center w-full pt-2">
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        <div className="pt-2 flex justify-center">
          <p className="text-xl font-semibold">{tagline}</p>
        </div>
        <div className="flex flex-row mt-10">
          <div className="flex flex-col w-1/2 ml-3">
            <div>
              <span className="font-bold">Un film de : </span>
              {producer.name}
            </div>
            <div>
              <span className="font-bold">Durée : </span>
              {duration}
            </div>
            <div>
              <span className="font-bold">Date de sortie : </span>
              {releaseDate}
            </div>
            <div>
              <span className="font-bold">Genre : </span>
              {genres.map((genre, index) => (
                <span key={genre.id}>
                  {genre.name}
                  {index !== genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
            <div>
              <span className="font-bold">Pays : </span>
              {countries.map((country, index) => (
                <span key={country.id}>
                  {country.name}
                  {index !== countries.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
          <div className="w-1/2 flex flex-col">
            <div>
              <span className="font-bold">Note moyenne : </span>
              {voteAverage}
            </div>
            <div>
              <span className="font-bold">Nombre de votes : </span>
              {voteCount}
            </div>
            <div>
              <span className="font-bold">Vu : </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-3/4 ml-3">
            <span className="font-bold">Synopsis : </span>
            <br />
            {synopsys}
          </div>
          <div className="w-1/4">
            <div className="font-bold">Pseudo a noté ce film</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieDetailsCard;
