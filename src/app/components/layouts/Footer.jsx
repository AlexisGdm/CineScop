import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLogged } from "./../../redux-store/authenticationSlice";
import {
  URL_TERMS_OF_SERVICE,
  URL_CONTACT,
} from "../../constants/urls/urlFrontEnd";

const Footer = () => {
  return (
    <footer className="bg-[#737373] text-white py-5 space-y-5 w-full ">
      <div className="flex justify-around">
        <Link to={URL_CONTACT}> Contact</Link>
        <a href="">Aide</a>
        <Link to={URL_TERMS_OF_SERVICE}>CGU</Link>
        <a href="">Politique Confidentialité</a>
        <a href="">Mentions Légales</a>
        <a href="">Données personnelles</a>
      </div>

      <div className="text-center">CinéScope</div>
    </footer>
  );
};

export default Footer;
