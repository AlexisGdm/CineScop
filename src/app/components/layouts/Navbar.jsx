import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLogged } from "./../../redux-store/authenticationSlice";
import {
  URL_HOME,
  URL_MOVIES,
  URL_LOGIN,
  URL_REGISTER,
  URL_SERIES,
} from "../../constants/urls/urlFrontEnd";
import logo from "/src/app/assets/img/logo.png";
import searchIcon from "../../assets/img/search.png";

const Header = () => {
  return (
    <header className="w-full fixed">
      <div className="flex justify-around bg-[#8E0400] pb-[20px] pt-[20px] m-0 items-center">
        <div className="w-[350px]">
          <img src={logo} alt="Logo" className="w-[55px] h-[55px]" />
        </div>

        <div className="w-[350x]">
          <nav className="flex">
            <Link
              to={URL_HOME}
              className="px-4 text-white font-medium hover:text-gray-300"
            >
              Accueil
            </Link>
            <Link
              to={URL_MOVIES}
              className="px-4 text-white font-medium hover:text-gray-300"
            >
              Films
            </Link>
            <Link
              to={URL_SERIES}
              className="px-4 text-white font-medium hover:text-gray-300"
            >
              Séries
            </Link>
            <Link
              to="/signin"
              className="px-4 text-white font-medium hover:text-gray-300"
            >
              Inscription
            </Link>
            <Link
              to="/login"
              className="px-4 text-white font-medium hover:text-gray-300"
            >
              Connexion
            </Link>
          </nav>
        </div>

        <div className="w-[350px]">
          <form className="flex items-center">
            <input
              type="search"
              placeholder="Recherche films, réalisateurs..."
              className="px-2 bg-white rounded-l placeholder-gray-500 placeholder:italic"
            />
            <button type="submit" className="bg-white text-gray-900 rounded-r">
              <img
                src={searchIcon}
                alt="Loupe de recherche"
                className="w-6 h-6 "
              />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
