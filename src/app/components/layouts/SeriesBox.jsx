import React from "react";

const API_IMAGE="https://image.tmdb.org/t/p/w500/";
const SeriesBox =({title, poster_path, vote_average, release_date, overview, first_air_date})=>{



    return(
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">

            <img className=" w-full" src={API_IMAGE+poster_path}></img>
            <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{title}</div>
    <p class="text-gray-700 text-base ">
      Note : {vote_average} 
    </p>
    <p class="text-gray-700 text-base">
      Première date de parution : {first_air_date} 
    </p>
    <div className="flex flex-col items-center  justify-center my-auto">
    <button type="button" className="bg-[#212121] hover:bg-gray text-white font-bold py-2 px-4 rounded-full " >Voir plus</button>
    </div>
  </div>
        </div>
        
    )
}

export default SeriesBox;