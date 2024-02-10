import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import logo from "../assets/logo-marvel.jpg";

export default function Header({ token, setToken }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <Link to="/">
          <img src={logo} alt="" className="logo" />
        </Link>
        <div className="textHeader">
          {/* <div className="characterAndComic"> */}
          <Link to="/character" className="detailHeader">
            Personnages
          </Link>
          <Link to="/comics" className="detailHeader">
            Comics
          </Link>
          {/* </div> */}

          {token ? (
            <>
              {/* <div className="loginAndSignup"> */}
              <Link
                to="/"
                className="detailHeader"
                onClick={() => {
                  Cookies.remove("userToken");
                  setToken("");
                }}
              >
                Se déconnecter
              </Link>

              <Link to="/user/favoris" className="detailHeader">
                Favoris{" "}
              </Link>

              {/* </div> */}
            </>
          ) : (
            <>
              {/* <div className="loginAndSignup"> */}
              <Link to="/user/login" className="detailHeader">
                Se connecter
              </Link>
              <Link to="/user/signup" className="detailHeader">
                S'inscrire
              </Link>
              {/* </div> */}
            </>
          )}
        </div>
      </div>
      <div className="separation"></div>
    </>
  );
}
