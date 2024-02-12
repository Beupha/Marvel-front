import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./CharacterPage.css";

export default function CharacterPage() {
  const [characterList, setCharacterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [nameSearch, setNameSearch] = useState("");
  const [numberPages, setNumberPages] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/character?name=${nameSearch}&page=${pageCount}`
        );
        console.log(response);
        setNumberPages(Math.ceil(response.data.count / response.data.limit));
        setCount(response.data.count);
        setCharacterList(response.data.results);
      } catch (error) {
        console.log("CharacterPage error -->", error);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [pageCount, nameSearch]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="characterPage">
      <form action="" className="search">
        <input
          type="search"
          placeholder="Recherchez un nom de personnage"
          id="search"
          // autocomplete="off"
          value={nameSearch}
          onChange={(event) => {
            setNameSearch(event.target.value);
            setPageCount(1);
          }}
        />
      </form>

      {count === 0 ? (
        <p>Aucun résultat n'a été trouvé</p>
      ) : (
        <>
          <div className="changePages">
            <button
              className="changePagePrevious"
              disabled={pageCount == 1}
              onClick={() => setPageCount((prevState) => prevState - 1)}
            >
              Résultats précédents
            </button>
            <button
              className="changePageNext"
              disabled={pageCount >= numberPages || numberPages == 0}
              onClick={() => setPageCount((prevState) => prevState + 1)}
            >
              Résultats suivants
            </button>
          </div>

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

          <div className="changePages">
            <button
              className="changePagePrevious"
              disabled={pageCount == 1}
              onClick={() => setPageCount((prevState) => prevState - 1)}
            >
              Résultats précédents
            </button>
            <button
              className="changePageNext"
              disabled={pageCount >= numberPages || numberPages == 0}
              onClick={() => setPageCount((prevState) => prevState + 1)}
            >
              Résultats suivants
            </button>
          </div>
        </>
      )}
    </main>
  );
}
