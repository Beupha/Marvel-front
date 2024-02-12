import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import "./FavorisPage.css";

export default function FavorisPage({ token }) {
  const [isLoading, setIsLoading] = useState(true);
  const [characterList, setCharacterList] = useState([]);
  const [comicsList, setComicsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("token -->", token);
        const response = await axios.get(
          `https://site--marvel-back--fzydy6yrfhrj.code.run/user/favoris`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log("response.data -->", response.data);

        setComicsList(response.data.favoris.comic);
        setCharacterList(response.data.favoris.character);
      } catch (error) {
        console.log("Comic Detail Page error -->", error);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  // console.log("comicsList -->", comicsList);
  // console.log("characterList -->", characterList);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="favorisPage">
      <h2>Vos personnages favoris :</h2>
      <div className="characterCard">
        {characterList.map((character) => {
          return (
            <Link
              to={`/comics/${character._id}`}
              key={character._id}
              className="characterCard"
            >
              <div className="avatarAndName">
                <span className="characterName">{character.name}</span>
                <span className="characterDescriptionAll">
                  {character.description}
                </span>
                <img
                  src={
                    character.thumbnail.path +
                    "." +
                    character.thumbnail.extension
                  }
                  alt=""
                />{" "}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="separation"></div>
      <div className="separation2"></div>
      <h2>Vos comics favoris :</h2>
      <div className="comicCard">
        {comicsList.map((comic) => {
          return (
            <Link
              to={`/comic/${comic._id}`}
              key={comic._id}
              className="comicCard"
            >
              <div className="avatarAndNameComic">
                <span className="comicName">{comic.title}</span>
                <span className="comicDescription">{comic.description}</span>
                <img
                  src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                  alt=""
                />{" "}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
