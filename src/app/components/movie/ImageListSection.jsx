import React from "react";
import MovieImages from "./MovieImages.jsx";

function MovieImagesList({ images }) {
  return (
    <section className="mx-auto max-w-7xl mb-5">
      <div className="mb-4 mt-20">
        <p className="text-white text-lg font-bold">Images</p>
      </div>
      <MovieImages images={images} />
    </section>
  );
}

export default MovieImagesList;
