import React, { useState, useEffect } from "react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function MoreviewsSlider() {
  const [gender, setGender] = useState([]);

  useEffect(() => {
    const fetchGender = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=f525feb402f99bf8b6019d031f50d62e&language=fr`
      );
      const data = await response.json();
      const randomGender = data.results
        .sort(() => 0.5 - Math.random())
        .slice(0, 21);
      setGender(randomGender);
    };
    fetchGender();
  }, []);

  return (
    <div className="swiper-container z-0">
      <div className="swiper-wrapper">
        <Swiper
          spaceBetween={20}
          slidesPerView={7}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
        >
          {gender.map((gender) => (
            <SwiperSlide key={gender.id}>
              <div className="swiper-slide">
                <div className="flex justify-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${gender.name}`}
                    alt={gender.title}
                    width="200px"
                  />
                </div>

                <h3 className="text-center">{gender.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MoreviewsSlider;