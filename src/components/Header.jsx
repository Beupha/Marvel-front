import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header({ token, setToken }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <Link to="/">
          <p>MARVEL</p>
        </Link>
        <Link to="/character">Personnages </Link>
        <Link to="/comic">Comics </Link>

        {token ? (
          ((
            <button
              onClick={() => {
                Cookies.remove("userToken");
                setToken("");
                navigate("/");
              }}
            >
              Se déconnecter
            </button>
          ),
          (
            <button
              onClick={() => {
                navigate("/fav");
              }}
            >
              Favoris
            </button>
          ))
        ) : (
          <>
            <Link to="/signup">S'inscrire </Link>

            <Link to="/login">Se connecter</Link>
          </>
        )}
      </div>
    </>
  );
}
