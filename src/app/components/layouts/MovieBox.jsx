import React from "react";
import { Link } from "react-router-dom";

const API_IMAGE = "https://image.tmdb.org/t/p/w500/";
const MovieBox = ({ title, poster_path, vote_average, release_date, id }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        className=" w-full h-2/3 object-cover p-1"
        src={API_IMAGE + poster_path}
      ></img>
      <div className="px-6 py-4 h-1/3">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base ">Note : {vote_average}</p>
        <p className="text-gray-700 text-base">
          Date de réalisation : {release_date}
        </p>
        <div className="flex flex-col items-center  justify-center my-auto">
          <Link to={`/details-movie/${id}`}>
            <button
              type="button"
              className="bg-[#212121] hover:bg-gray text-white font-bold py-2 px-4 rounded-full "
            >
              Voir plus
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieBox;
