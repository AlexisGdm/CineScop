import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieDetailsCard from "../movie/DetailsCard.jsx";
import MovieActorsCasting from "../movie/ActorsCasting.jsx";
import MovieImagesList from "../movie/ImageListSection.jsx";
import MoviesVideosList from "../movie/VideoListSection.jsx";

function DetailsMovie() {
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [images, setImages] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const apiMovie = `${
        import.meta.env.VITE_API_BASE_URL
      }/api/detailsMovie/${id}`;
      const apiCredits = `${
        import.meta.env.VITE_API_BASE_URL
      }/api/detailsMovie/${id}/credits`;
      const apiImages = `${
        import.meta.env.VITE_API_BASE_URL
      }/api/detailsMovie/${id}/images`;
      const apiVideos = `${
        import.meta.env.VITE_API_BASE_URL
      }/api/detailsMovie/${id}/videos`;
      const [movieResponse, creditsResponse, imagesResponse, videosResponse] =
        await Promise.all([
          fetch(apiMovie),
          fetch(apiCredits),
          fetch(apiImages),
          fetch(apiVideos),
        ]);
      const movieData = await movieResponse.json();
      const creditsData = await creditsResponse.json();
      const imagesData = await imagesResponse.json();
      const videosData = await videosResponse.json();

      setMovie(movieData);
      setCredits(creditsData);
      setImages(imagesData);
      setVideos(videosData);
    }

    fetchData();
  }, [id]);

  if (
    movie === null ||
    credits === null ||
    images === null ||
    videos === null
  ) {
    return <div></div>;
  }

  function getRuntime(movie) {
    const hours = Math.floor(movie.runtime / 60);
    const minutes = movie.runtime % 60;
    const calcRuntime = `${hours}h ${minutes}m`;

    return calcRuntime;
  }

  function getFrDate(release_date) {
    const date = new Date(release_date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth()).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}-${month}-${year}`;
  }

  function getProducer(credits) {
    const producer = credits.crew.find((crewMember) => {
      return (
        ["Director"].includes(crewMember.job) &&
        ["Directing"].includes(crewMember.department)
      );
    });
    return producer;
  }

  function getActors(credits) {
    const actors = credits.cast.sort((member1, member2) => {
      if (member1.popularity > member2.popularity) return -1;
      if (member1.popularity < member2.popularity) return 1;
      return 0;
    });
    const listActors = actors.slice(0, 15);
    return listActors;
  }
  const orderActors = getActors(credits);

  return (
    <>
      <MovieDetailsCard
        key={movie.id}
        cover={movie.poster_path}
        title={movie.title}
        tagline={movie.tagline}
        duration={getRuntime(movie)}
        releaseDate={getFrDate(movie.release_date)}
        genres={movie.genres}
        countries={movie.production_countries}
        voteAverage={movie.vote_average}
        voteCount={movie.vote_count}
        synopsys={movie.overview}
        producer={getProducer(credits)}
      />

      <MovieActorsCasting orderActors={orderActors} />

      {videos.results && videos.results.length > 0 ? (
        <MoviesVideosList videos={videos.results} />
      ) : (
        <div className="text-white text-lg font-bold my-20 mx-auto max-w-7xl">
          Aucune vidéo disponible pour ce film !
        </div>
      )}

      {images.posters && images.posters.length > 0 ? (
        <MovieImagesList images={images.posters} />
      ) : (
        <div className="text-white text-lg font-bold my-20 mx-auto max-w-7xl">
          Aucune image disponible pour ce film !
        </div>
      )}
    </>
  );
}

export default DetailsMovie;
