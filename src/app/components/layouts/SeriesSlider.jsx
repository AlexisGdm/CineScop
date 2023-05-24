import React, { useState, useEffect } from "react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import defaultBackdrop from "../../assets/img/default-backdrop.jpg";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function SeriesSlider() {
  const [popularSeries, setPopularSeries] = useState([]);
  const [seriesImages, setSeriesImages] = useState([]);

  useEffect(() => {
    const fetchPopularSeries = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/topRatedSeriesSlider`
      );
      const data = await response.json();
      const topRatedSeries = data.results
        .sort(() => 0.5 - Math.random())
        .slice(0, 30);
      setPopularSeries(topRatedSeries);
    };
    fetchPopularSeries();
  }, []);

  useEffect(() => {
    const fetchSeriesImages = async () => {
      const tempSeriesImages = [];

      for (const popularSerie of popularSeries) {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/detailsSerie/${
            popularSerie.id
          }/images`
        );
        const data = await response.json();
        tempSeriesImages.push({ ...popularSerie, ...data });
      }
      setSeriesImages(tempSeriesImages);
    };
    fetchSeriesImages();
  }, [popularSeries]);

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
          {seriesImages.map((seriesImages) => {
            if (seriesImages.backdrop_path.length > 0) {
              return (
                <SwiperSlide key={seriesImages.id}>
                  <Link to={`/details-series/${seriesImages.id}`}>
                    <div className="swiper-slide my-auto">
                      <div className="flex justify-center border rounded-lg overflow-hidden">
                        <img
                          className="z-0 w-full object-cover"
                          src={`https://image.tmdb.org/t/p/w500${seriesImages.backdrop_path}`}
                          alt={seriesImages.name}
                        />
                        <span className="s-10 absolute bottom-0 mx-auto w-[99%] text-white font-bold text-center swiper-gradient">
                          {seriesImages.name}
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

export default SeriesSlider;
