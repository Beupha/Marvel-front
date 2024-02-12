import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./HomePage.css";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const [characterListRandom, setCharacterListRandom] = useState([]);
  const [characterData, setCharacterData] = useState([]);

  const [comicsListRandom, setComicsListRandom] = useState([]);
  const [comicData, setComicData] = useState([]);

  const [pageCountComic, setPageCountComic] = useState(1);
  const [numberCountComic, setNumberCountComic] = useState(1);

  const [pageCountCharacter, setPageCountCharacter] = useState(
    Math.floor(Math.random() * 14) + 1
  );
  const [numberCountCharacter, setNumberCountCharacter] = useState(
    Math.floor(Math.random() * 100) + 1
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/character?page=${pageCountCharacter}`
        );
        // console.log(response);

        setCharacterData(response.data.results[numberCountCharacter]);
      } catch (error) {
        console.log("HomePage error -->", error);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [numberCountCharacter]);

  // console.log("pageCountCharacter 2-->", pageCountCharacter);
  // console.log("characterData -->", characterData);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <div className="HomePage">
        <div className="charactersCat">
          <div className="charactersPick">
            Connaissez-vous ces personnages ?
          </div>
          <Link to="/character" className="linkCharacters">
            Cliquez ici pour aller voir la liste de tous les personnages
          </Link>
          <div className="charactersCaroussel">
            <div className="characterCard">
              <Link
                to={`/character/${characterData._id}`}
                key={characterData._id}
                className="characterCard"
              >
                <div className="avatarAndName">
                  <span className="characterName">{characterData.name}</span>
                  <img
                    src={
                      characterData.thumbnail.path +
                      "." +
                      characterData.thumbnail.extension
                    }
                    alt=""
                  />{" "}
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="comicsCat">
          <div className="comicsPick">Connaissez-vous ces comics ?</div>
          <Link to="/comics" className="linkComics">
            Cliquez ici pour aller voir la liste de tous les comics
          </Link>
          <div className="comicsCaroussel"> </div>
        </div>
      </div>
    </>
  );
}
