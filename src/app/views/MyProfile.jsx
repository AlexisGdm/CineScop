import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@mui/material/Autocomplete";

function EditProfile() {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");

  // Fetch user data
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/users/20")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  // Fetch countries data
  useEffect(() => {
    const fetchData = async () => {
      const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const promises = pages.map((page) =>
        fetch(`http://127.0.0.1:8000/api/v1/countries?page=${page}`)
          .then((response) => response.json())
          .then((data) => data["hydra:member"])
      );
      const results = await Promise.all(promises);
      const countries = results.flat();
      setCountries(countries);
      setFilteredCountries(countries);
    };
    fetchData();
  }, []);

  // Set user data to the state
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setDescription(user.description);
      setCountry(user.country);
    }
  }, [user]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = { ...user, username, description, country };
    fetch(`http://127.0.0.1:8000/api/v1/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        alert("Profil modifié avec succès !");
      });
  };

  // Delete account
  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ?"
    );
    if (confirmed) {
      fetch("http://127.0.0.1:8000/api/v1/users/20", {
        method: "DELETE",
        body: JSON.stringify({ id: user.id }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => (window.location.href = "/login"));
    }
  };

  const handleAvatarChange = (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    fetch(`http://127.0.0.1:8000/api/v1/users/${user.id}/avatar`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUser({ ...user, avatarUrl: data.avatarUrl });
        alert("Avatar modifié avec succès !");
      })
      .catch((error) => {
        console.error("Erreur lors de la modification de l'avatar :", error);
      });
  };

  const handleCountryFilter = (event, value) => {
    setCountryName(value);
  };

  const filteredCountries = countries.filter((country) =>
    country.country.toLowerCase().includes(countryName.toLowerCase())
  );

  return (
    <div className="bg-white w-[40%] h-[390px] mx-auto mt-4">
      <h1 className="p-3">Modifier le profil de {username}</h1>
      <form className="p-2" onSubmit={handleSubmit}>
        {/* TODO: Change avatar feature not working yet */}
        <label htmlFor="avatar">Importer un avatar : </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleAvatarChange(e.target.files[0])}
        />
        {/* TODO: reduce space between username and description */}
        <TextField
          label="Nom d'utilisateur"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="form-group">
          {/* TODO: Add default value to match actual country */}
          <Autocomplete
            id="country"
            options={filteredCountries}
            getOptionLabel={(option) => option.country}
            onChange={(event, value) =>
              value ? setCountry(value[""]) : setCountry("")
            }
            onInputChange={handleCountryFilter}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Sélectionnez un pays"
                variant="outlined"
              />
            )}
          />
        </div>
        <div className="mt-2">
          <Button variant="contained" color="primary" type="submit">
            Enregistrer les modifications
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteAccount}
          >
            Supprimer mon compte
          </Button>
        </div>
      </form>
    </div>
  );
}
export default EditProfile;
