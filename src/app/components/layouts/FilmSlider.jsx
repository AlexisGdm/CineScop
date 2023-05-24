import React, { useState, useEffect } from "react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import defaultBackdrop from "../../assets/img/default-backdrop.jpg";
import { Link } from "react-router-dom";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function FilmSlider() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [moviesImages, setMoviesImages] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/topRatedFilmsSlider`
      );
      const data = await response.json();
      const topRatedMovies = data.results
        .sort(() => 0.5 - Math.random())
        .slice(0, 30);
      setPopularMovies(topRatedMovies);
    };
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const fetchMoviesImages = async () => {
      const tempMoviesImages = [];

      for (const popularMovie of popularMovies) {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/detailsMovie/${
            popularMovie.id
          }/images`
        );
        const data = await response.json();
        tempMoviesImages.push({ ...popularMovie, ...data });
      }
      setMoviesImages(tempMoviesImages);
    };
    fetchMoviesImages();
  }, [popularMovies]);

  return (
    <div className="swiper-container z-0">
      <div className="swiper-wrapper">
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
        >
          {moviesImages.map((movieImages) => {
            if (movieImages.backdrop_path === null) {
              return (
                <SwiperSlide key={movieImages.id}>
                  <Link to={`/details-movie/${movieImages.id}`}>
                    <div className="swiper-slide my-auto">
                      <div className="flex justify-center border rounded-lg overflow-hidden">
                        <img
                          className="z-0 w-full object-cover"
                          src={defaultBackdrop}
                          alt={movieImages.title}
                        />
                        <span className="s-10 absolute bottom-0 mx-auto w-[99%] text-white font-bold text-center swiper-gradient">
                          {movieImages.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            }

            if (movieImages.backdrops.length > 0) {
              return (
                <SwiperSlide key={movieImages.id}>
                  <Link to={`/details-movie/${movieImages.id}`}>
                    <div className="swiper-slide my-auto">
                      <div className="flex justify-center border rounded-lg overflow-hidden">
                        <img
                          className="z-0 w-full object-cover"
                          src={`https://image.tmdb.org/t/p/w500/${movieImages.backdrops[0].file_path}`}
                          alt={movieImages.title}
                        />
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            }

            if (movieImages.backdrops.length === 0) {
              return (
                <SwiperSlide key={movieImages.id}>
                  <Link to={`/details-movie/${movieImages.id}`}>
                    <div className="swiper-slide my-auto">
                      <div className="flex justify-center border rounded-lg overflow-hidden">
                        <img
                          className="z-0 w-full object-cover"
                          src={`https://image.tmdb.org/t/p/w500/${movieImages.backdrop_path}`}
                          alt={movieImages.title}
                        />
                        <span className="s-10 absolute bottom-0 mx-auto w-[99%] text-white font-bold text-center swiper-gradient">
                          {movieImages.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default FilmSlider;
