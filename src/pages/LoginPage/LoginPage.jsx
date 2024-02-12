import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import "./LoginPage.css";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (email && password) {
        const { data } = await axios.post(
          "https://site--marvel-back--fzydy6yrfhrj.code.run/user/login",
          {
            email,
            password,
          }
        );

        console.log(data);
        Cookies.set("userToken", data.token, { secure: true });
        // setToken(data.token);
        navigate("/");
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      setErrorPassword("Accès refusé, veuillez réessayer");
      console.log("error->", error);
    }
  };

  return (
    <main className="loginPage">
      <form onSubmit={handleSubmit} className="formLogin">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setErrorMessage("");
            setEmail(event.target.value);
          }}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setErrorMessage("");
            setErrorPassword("");
            setPassword(event.target.value);
          }}
        />

        <button className="buttonConnecter">Se connecter</button>
        <Link to="/user/Signup" className="modal">
          Pas encore de compte ? Inscrivez-vous !
        </Link>

        {errorMessage && <p>{errorMessage}</p>}
      </form>

      <div className="errorPassword">
        {errorPassword && <p>{errorPassword}</p>}
      </div>
    </main>
  );
}
