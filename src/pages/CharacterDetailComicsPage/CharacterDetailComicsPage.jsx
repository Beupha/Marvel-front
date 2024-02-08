import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import "./CharacterDetailComicsPage.css";

export default function CharacterDetailComicsPage() {
  const params = useParams();
  const [dataComics, setDataComics] = useState([]);
  const [characterName, setCharacterName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("params -->", params);

        const response = await axios.get(
          `http://127.0.0.1:3000/comics/${params.characterId}`
        );

        setId(params.characterId);
        setCharacterName(response.data.name);
        setDataComics(response.data.comics);
      } catch (error) {
        console.log("Character Detail Comics Page error -->", error.response);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="characterDetailComicsPage">
      <h2 className="titre">
        Voici tous les comics dans lesquels vous pouvez retrouver{" "}
        {characterName} !
      </h2>
      <Link to={`/character/${id}`} key={id} className="moreCharacter">
        Plus d'infos sur ce personnage ? Cliquez ici
      </Link>

      <div className="dataComics">
        {dataComics.map((comic) => {
          return (
            <Link
              to={`/comic/${comic._id}`}
              key={comic._id}
              className="dataComics"
              state={{ characterId: id }}
            >
              <div className="thumbnailAndNameComic">
                <span className="comicName">{comic.title}</span>
                <span className="comicDescription">{comic.description}</span>
                <img
                  src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                  alt=""
                />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
