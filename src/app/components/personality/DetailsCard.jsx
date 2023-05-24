import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import defaultAvatar from "../../assets/img/defaultAvatar.svg";

export default function PersonDetailsCard() {
  const { id } = useParams();
  console.log(id);
  const poster = "https://image.tmdb.org/t/p/w500/";
  const [personality, setPersonality] = useState(null);

  useEffect(() => {
    const fetchPersonality = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/detailsPerson/${id}`
      );
      const data = await response.json();
      console.log(data, "fetch response");
      const detailsPersonality = data;
      console.log(detailsPersonality, "data results");
      setPersonality(detailsPersonality);
    };
    fetchPersonality();
  }, []);

  console.log(personality, "after fetch");

  if (!personality) {
    return (
      <div className="w-3/4 mx-auto mt-10 text-white text-center">
        Chargement ...
      </div>
    );
  }

  return (
    <>
      <div className="w-full mx-auto mt-10">
        <div className="flex flex-row rounded-lg bg-white/20 w-[75%] mx-auto">
          <div className="flex border rounded-lg overflow-hidden m-2">
            <img
              className="z-0 w-full object-cover max-h-[500px] border-white"
              src={`${poster}${personality.profile_path}`}
              alt={personality.name}
            />
          </div>
          <div className="flex flex-col w-full ml-5 mt-5">
            <p className="text-4xl text-center text-white font-bold mb-4">
              {personality.name}
            </p>
            <p className="text-white mb-1 font-bold">
              Date de naissance :
              <span className="font-normal ml-1">
                {format(new Date(personality.birthday), "dd/MM/yyyy")}
              </span>
            </p>
            <p className="text-white mb-1 font-bold">
              Lieux de naissance :
              <span className="font-normal ml-1">
                {personality.place_of_birth}
              </span>
            </p>
            <p className="text-white mb-1 font-bold">
              Biographie :
              <span className="font-normal ml-1">{personality.biography}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
