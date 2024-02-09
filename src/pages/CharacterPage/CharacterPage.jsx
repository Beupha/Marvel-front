import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

import "./CharacterPage.css";

export default function CharacterPage() {
  const [characterList, setCharacterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/character", {
          page: page,
        });
        setCharacterList(response.data.results);
      } catch (error) {
        console.log("CharacterPage error -->", error);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="characterPage">
      <div className="search">Search</div>
      {/* <button onClick={setPage((prevState) => prevState + 1)}>
        Résultats suivants
      </button> */}

      <div className="characterCard">
        {characterList.map((character) => {
          return (
            <Link
              to={`/comics/${character._id}`}
              key={character._id}
              className="characterCard"
              // onClick={handleClick()}
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
    </main>
  );
}
