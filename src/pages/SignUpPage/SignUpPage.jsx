import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./SignUpPage.css";

import axios from "axios";

export default function SignUpPage({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (username && email && password) {
        const { data } = await axios.post("http://127.0.0.1:3000/user/signup", {
          username,
          email,
          password,
        });
        Cookies.set("userToken", data.token, { secure: true });
        navigate("/");
        setToken(data.token);
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      console.log("Signpage error ->", error);
    }
  };

  return (
    <main className="signupPage">
      <form onSubmit={handleSubmit} className="formSignUp">
        <input
          type="text"
          name="usesername"
          id="username"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setErrorMessage("");
            setUsername(event.target.value);
          }}
        />

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
            setPassword(event.target.value);
          }}
        />

        <button className="buttonInscrire">S'inscrire</button>
        <Link to="/user/login" className="modal">
          Déjà un compte ? Connectez-vous !
        </Link>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </main>
  );
}
