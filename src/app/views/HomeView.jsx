import React from "react";
import Filter from "../components/layouts/Filter";
import MovieMoment from "../components/layouts/MovieMoment";
import FilmSlider from "./../components/layouts/FilmSlider";
import SeriesSlider from "./../components/layouts/SeriesSlider";
import PersonSlider from "./../components/layouts/ActorSlider";
import TopRated from "./../components/layouts/TopRated";

const HomeView = () => {
  return (
    <div className="">
      <div className="z-10">
        <Filter />
      </div>
      <div className="space-y-5">
        <div className="text-white flex justify-center text-4xl">
          <p className="mt-[50px]">Oeuvre mise en avant par la communauté</p>
        </div>
        <MovieMoment />
        <h4 className="text-center text-white">Films du moment</h4>
        <div className="w-[75%] mx-auto">
          <FilmSlider />
        </div>
        <h4 className="text-center text-white">Séries du moment</h4>
        <div className="w-[75%] mx-auto">
          <SeriesSlider />
        </div>
        <h4 className="text-center text-white">Personnalités les plus vues</h4>
        <div className="w-[75%] mx-auto">
          <PersonSlider />
        </div>
        <h4 className="text-center text-white">Les mieux notés</h4>
        <div className="w-[75%] mx-auto">
          <TopRated />
        </div>
        <div className="w-[20px]"></div>
      </div>
    </div>
  );
};

export default HomeView;
