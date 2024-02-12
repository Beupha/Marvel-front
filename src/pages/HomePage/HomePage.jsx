import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./HomePage.css";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const [characterData, setCharacterData] = useState([]);
  const [theArrayCharacters, setTheArrayCharacters] = useState([]);

  const [comicData, setComicData] = useState([]);
  const [theArrayComics, setTheArrayComics] = useState([]);

  const [pageCountComic, setPageCountComic] = useState(
    Math.floor(Math.random() * 473) + 1
  );
  const [numberCountComic, setNumberCountComic] = useState(
    Math.floor(Math.random() * 100) + 1
  );

  const [pageCountCharacter, setPageCountCharacter] = useState(
    Math.floor(Math.random() * 13) + 1
  );
  const [numberCountCharacter, setNumberCountCharacter] = useState(
    Math.floor(Math.random() * 100) + 1
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (theArrayCharacters.length < 11) {
          const response = await axios.get(
            `https://site--marvel-back--fzydy6yrfhrj.code.run/character?page=${pageCountCharacter}`
          );

          setCharacterData(response.data.results[numberCountCharacter]);
          setTheArrayCharacters([...theArrayCharacters, characterData]);

          setPageCountCharacter(Math.floor(Math.random() * 14) + 1);
          setNumberCountCharacter(Math.floor(Math.random() * 100));
        }
      } catch (error) {
        console.log("HomePage error -->", error);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [theArrayCharacters]);

  let dataCharacters = [...theArrayCharacters];
  dataCharacters.shift();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (theArrayComics.length < 11) {
          const response = await axios.get(
            `https://site--marvel-back--fzydy6yrfhrj.code.run/comics?page=${pageCountComic}`
          );

          setComicData(response.data.results[numberCountComic]);
          setTheArrayComics([...theArrayComics, comicData]);

          setPageCountComic(Math.floor(Math.random() * 473) + 1);
          setNumberCountComic(Math.floor(Math.random() * 100));
        }
      } catch (error) {
        console.log("HomePage error -->", error);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [theArrayComics]);

  let dataComics = [...theArrayComics];
  dataComics.shift();

  // console.log("dataComics -->", dataComics);
  // console.log("theArrayComics -->", theArrayComics);
  // console.log("dataComics -->", dataComics);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <div className="HomePage">
        <div className="charactersCat">
          <div className="charactersPick">
            Connaissez-vous ces personnages ?
          </div>

          <div className="charactersCaroussel">
            {dataCharacters.map((character) => {
              return (
                <div className="characterCardHomePage" key={character._id}>
                  <Link
                    to={`/character/${character._id}`}
                    key={character._id}
                    className="avatarAndNameHomePageCharacter"
                  >
                    <div className="avatarAndNameHomePageCharacter">
                      <span className="characterNameHomePage">
                        {character.name}
                      </span>
                      <span>
                        <img
                          className="imgCharacters"
                          src={
                            character.thumbnail.path +
                            "." +
                            character.thumbnail.extension
                          }
                          alt=""
                        />
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <Link to="/character" className="linkCharacters">
          Cliquez ici pour aller voir la liste de tous les personnages
        </Link>

        <div className="comicsCat">
          <div className="comicsPick">Connaissez-vous ces comics ?</div>

          <div className="comicsCaroussel">
            {dataComics.map((comic) => {
              return (
                <div className="comicCardHomePage" key={comic._id}>
                  <Link
                    to={`/comic/${comic._id}`}
                    key={comic._id}
                    className="avatarAndNameHomePage"
                  >
                    <div className="avatarAndNameHomePage">
                      <span className="comicTitleHomePage">{comic.title}</span>
                      <span>
                        <img
                          src={
                            comic.thumbnail.path +
                            "." +
                            comic.thumbnail.extension
                          }
                          alt=""
                        />
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <Link to="/comics" className="linkComics">
            Cliquez ici pour aller voir la liste de tous les comics
          </Link>
        </div>
      </div>
    </>
  );
}
