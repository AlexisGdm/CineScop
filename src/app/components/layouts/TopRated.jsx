import React, { useState, useEffect } from "react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function TopRated() {
  const [toprated, setTopRated] = useState([]);

  useEffect(() => {
    const fetchTopRated = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/topRatedSlider`
      );
      const data = await response.json();
      const randomTopRated = data.results
        .sort(() => 0.5 - Math.random())
        .slice(0, 50);
      setTopRated(randomTopRated);
    };
    fetchTopRated();
  }, []);

  return (
    <div className="swiper-container z-0">
      <div className="swiper-wrapper">
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
        >
          {toprated.map((toprated) => (
            <SwiperSlide key={toprated.id}>
              <div className="swiper-slide">
                <div className="flex justify-center">
                  <img
                    className="rounded-lg border"
                    src={`https://image.tmdb.org/t/p/w500/${toprated.poster_path}`}
                    alt={toprated.title}
                    width="200px"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default TopRated;
