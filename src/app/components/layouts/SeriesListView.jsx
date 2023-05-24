import React, { useState, useEffect } from "react";
import SeriesBox from "./SeriesBox";

const API_URL =
  "https://api.themoviedb.org/3/discover/tv?api_key=f525feb402f99bf8b6019d031f50d62e&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
function SeriesListView() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSeries(data.results);
      });
  }, []);

  const prev = document.getElementById("prev");
  const next = document.getElementById("prev");
  const current = document.getElementById("current");

  var currentPage = 1;
  var nextPage = 2;
  var previousPage = 3;
  var lastUrl = "";
  var totalPages = 100;

  return (
    <div className="container w-full pt-5 mx-auto pt-auto">
      <div className="grid grid-cols-4 grid-rows-4 gap-8 ">
        {series.map((seriesReq) => (
          <SeriesBox key={seriesReq.id} {...seriesReq} />
        ))}
      </div>
      <div className="flex items-center justify-center m-8 text-white">
        <div className="p-5 cursor-pointer" id="prev">
          Page précédente
        </div>
        <div
          className="p-5 rounded-[50px] border-solid border-4 border-[#8E0400] font-semibold text-xl px-8"
          id="current"
        >
          1
        </div>
        <div className="p-5 cursor-pointer" id="next">
          Page suivante
        </div>
      </div>
    </div>
  );
}

export default SeriesListView;
