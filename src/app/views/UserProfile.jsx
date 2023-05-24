import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

// Function for formatting date
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function UserProfile() {
  const [user, setUser] = useState({});
  const [country, setCountry] = useState("");
  const [formattedBirthDate, setFormattedBirthDate] = useState("");
  const [formattedLastActivity, setFormattedLastActivity] = useState("");
  const [formattedCreatedAt, setFormattedCreatedAt] = useState("");

  // Fetch user data
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/users/20")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  // Fetch country data
  useEffect(() => {
    if (user.country) {
      fetch(`http://127.0.0.1:8000${user.country}`)
        .then((response) => response.json())
        .then((data) => setCountry(data));
    }
  }, [user.country]);

  // Format birth dates
  useEffect(() => {
    if (user.birthDate) {
      const formattedDate = formatDate(user.birthDate);
      setFormattedBirthDate(formattedDate);
    }
  }, [user.birthDate]);

  // Format last activity dates
  useEffect(() => {
    if (user.lastActivity) {
      const formattedDate = formatDate(user.lastActivity);
      setFormattedLastActivity(formattedDate);
    }
  }, [user.lastActivity]);

  // Format created at dates
  useEffect(() => {
    if (user.createdAt) {
      const formattedDate = formatDate(user.createdAt);
      setFormattedCreatedAt(formattedDate);
    }
  }, [user.createdAt]);

  return (
    <div className="bg-white w-[40%] h-[360px] mx-auto mt-4">
      <div className="flex flex-wrap items-center justify-between p-3">
        <img src={user.avatar} className="w-[150px] h-[150px]" alt="avatar" />
        <div>
          <h1>{user.username}</h1>{" "}
        </div>
        <div className="mt-5 text-right">
          <p>
            {user.moviesSeen} {user.moviesSeen > 1 ? "films vus" : "film vu"}
          </p>
          <p>
            {user.seriesSeen}{" "}
            {user.seriesSeen > 1 ? "séries vues" : "série vue"}
          </p>
        </div>
      </div>

      <div className="p-2">
        <p>
          <span className="font-bold">Description:</span> {user.description}
        </p>
        <p>
          <span className="font-bold">Pays:</span> {country.country}
        </p>
        <p>
          <span className="font-bold">Dernière activité:</span>{" "}
          {formattedLastActivity}
        </p>
        <p>
          <span className="font-bold">Date de naissance:</span>{" "}
          {formattedBirthDate}{" "}
        </p>
        <p>
          <span className="font-bold">Date d'inscription:</span>{" "}
          {formattedCreatedAt}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-between p-2">
        {/* TODO: When lists are ready, we can add the links to them */}
        <Button variant="contained" color="primary">
          Voir les listes de {user.username}
        </Button>

        <div>
          {/* TODO: When tags are ready, we can add them here */}
          *Emplacement pour les tags*
        </div>
      </div>
      <div>
        <Link to="/myprofile">
          <Button variant="contained" color="primary">
            Modifier le profil
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;
