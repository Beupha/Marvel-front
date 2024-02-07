import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./CharacterPage.css";

export default function CharacterPage() {
  const [characterList, setCharacterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/character");
        console.log(" response.data -->", response.data);

        setCharacterList(response.data.results);
      } catch (error) {
        console.log("CharacterPage error -->", error.response);
      }

      setIsLoading(false);
      //   console.log("characterList -->", characterList);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="characterPage">
      <div className="search">Search</div>
      <div className="characterCard">
        {characterList.map((character) => {
          return (
            <Link
              to={`/character/${character._id}`}
              key={character._id}
              className="characterCard"
            >
              <div className="avatarAndName">
                <span className="characterName">{character.name}</span>
                <img
                  src={
                    character.thumbnail.path +
                    "." +
                    character.thumbnail.extension
                  }
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
