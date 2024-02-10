import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Header({ token, setToken }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <Link to="/">
          <p>MARVEL</p>
        </Link>
        <Link to="/character">Personnages </Link>
        <Link to="/comics">Comics </Link>

        {token ? (
          <>
            <Link
              to="/"
              onClick={() => {
                Cookies.remove("userToken");
                setToken("");
              }}
            >
              Se déconnecter{" "}
            </Link>

            <button
              onClick={() => {
                navigate("/fav");
              }}
            >
              Favoris
            </button>
          </>
        ) : (
          <>
            <Link to="/user/login">Se connecter</Link>
            <Link to="/user/signup">S'inscrire </Link>
          </>
        )}
      </div>
      <div className="separation"></div>
    </>
  );
}
