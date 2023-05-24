import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import defaultAvatar from "../../assets/img/defaultAvatar.svg";
import { Link } from "react-router-dom";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function MovieActorsCasting({ orderActors }) {
  const API_IMAGE = "https://image.tmdb.org/t/p/w500/";

  return (
    <section className="mb-20">
      <div className="max-w-7xl mx-auto mb-0 mt-20">
        <p className="text-white text-lg font-bold">Casting</p>
      </div>
      <Swiper
        className="max-w-7xl mx-auto"
        spaceBetween={50}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        centeredSlides={true}
        loop={true}
      >
        {orderActors.map((orderActors) => (
          <SwiperSlide key={orderActors.id}>
            <div className="flex flex-col items-center pt-10">
              {orderActors.profile_path !== null ? (
                <Link to={`/details-person/${orderActors.id}`}>
                  <img
                    className="w-[150px] h-[150px] rounded-[75px] overflow-hidden object-cover flex place-content-center"
                    src={API_IMAGE + orderActors.profile_path}
                    alt=""
                  />
                </Link>
              ) : (
                <img
                  className="w-[150px] h-[150px] rounded-[75px] overflow-hidden object-cover flex place-content-center"
                  src={defaultAvatar}
                  alt=""
                />
              )}
              <div>
                <h3 className="text-lg text-center font-medium mb-2 text-white flex place-content-center">
                  {orderActors.name}
                </h3>
                <p className="text-white text-center flex place-content-center">
                  {orderActors.character}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default MovieActorsCasting;
