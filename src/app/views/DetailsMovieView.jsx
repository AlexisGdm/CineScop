import React from "react";
import { useParams } from "react-router-dom";
import Filter from "../components/layouts/Filter";
import DetailsMovie from "../components/layouts/DetailsMovie";

const DetailsMovieView = () => {
  const { id } = useParams();

  return (
    <div className="">
      <div className="z-10">
        <Filter />
      </div>
      <div className="pt-5 ">
        <DetailsMovie movieId={id} />
      </div>
    </div>
  );
};

export default DetailsMovieView;
