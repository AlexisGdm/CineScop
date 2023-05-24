import React from "react";
import MovieVideos from "./MovieVideos";

export default function MoviesVideosList({ videos }) {
  return (
    <section className="mx-auto max-w-7xl mb-5">
      <div className="mb-4 mt-20">
        <p className="text-white text-lg font-bold">Vidéos</p>
      </div>
      <MovieVideos videos={videos} />
    </section>
  );
}
