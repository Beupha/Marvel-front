import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./CharacterDetailPage.css";

export default function CharacterPage() {
  const [characterDetailList, setCharacterDetailList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/character/${_Id}`
        );
        // console.log("response -->", response);
        // console.log(" response.data -->", response.data);

        // setCharacterDetailList(response.data);
        // console.log("characterList -->", characterList);
      } catch (error) {
        // console.log("response -->", response);
        console.log("Character Detail Page error -->", error.response);
      }

      setIsLoading(false);
      //   console.log("characterList -->", characterList);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="characterDetailPage">
      <div>Character Detail Page</div>
      {/* <div className="search">Search</div>
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
          </div> */}
    </main>
  );
}
