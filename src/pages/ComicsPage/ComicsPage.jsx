import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./ComicsPage.css";

export default function ComicsPage() {
  const [comicsList, setComicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [titleSearch, setTitleSearch] = useState("");
  const [numberPages, setNumberPages] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/comics?title=${titleSearch}&page=${pageCount}`
        );
        setNumberPages(Math.ceil(response.data.count / response.data.limit));
        setCount(response.data.count);
        setComicsList(response.data.results);
      } catch (error) {
        console.log("Comics Page error -->", error.response);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [pageCount, titleSearch]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="comicsPage">
      <form action="" className="search">
        <input
          type="search"
          placeholder="Recherchez un titre de comic"
          id="search"
          // autocomplete="off"
          value={titleSearch}
          onChange={(event) => {
            setTitleSearch(event.target.value);
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
                    <span className="comicDescription">
                      {comic.description}
                    </span>
                    <img
                      src={
                        comic.thumbnail.path + "." + comic.thumbnail.extension
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
