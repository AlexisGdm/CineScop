import React, { useState, useEffect } from "react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import defaultAvatar from "../../assets/img/defaultAvatar.svg";
import { Link } from "react-router-dom";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function PersonSlider() {
  const [person, setPerson] = useState([]);

  useEffect(() => {
    const fetchPerson = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/topRatedPersonalitySlider`
      );
      const data = await response.json();
      const randomPerson = data.results
        .sort(() => 0.5 - Math.random())
        .slice(0, 21);
      setPerson(randomPerson);
    };
    fetchPerson();
  }, []);

  return (
    <div className="swiper-container z-0">
      <div className="swiper-wrapper">
        <Swiper
          spaceBetween={20}
          slidesPerView={7}
          navigation
          pagination={{
            clickable: true,
            bulletActiveClass: "!bg-[#FFFFFF]",
            bulletInActiveClass: "!bg-white",
          }}
          autoplay={{ delay: 5000 }}
        >
          {person.map((person) => (
            <SwiperSlide key={person.id}>
              <div className="swiper-slide">
                {person.profile_path !== null ? (
                  <Link to={`/details-person/${person.id}`}>
                    <img
                      className="w-[150px] h-[150px] rounded-[75px] overflow-hidden object-cover flex place-content-center"
                      src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                      alt={person.title}
                    />
                  </Link>
                ) : (
                  <Link to={`/details-person/${person.id}`}>
                    <img
                      className="w-[150px] h-[150px] rounded-[75px] overflow-hidden object-cover flex place-content-center"
                      src={defaultAvatar}
                      alt="Avatar"
                    />
                  </Link>
                )}

                <h3 className="text-xl text-center font-medium mb-2 text-white flex place-content-center">
                  {person.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default PersonSlider;
