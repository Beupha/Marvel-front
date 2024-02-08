import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./ComicsPage.css";

export default function ComicsPage() {
  const [comicsList, setComicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/comics");

        setComicsList(response.data.results);
      } catch (error) {
        console.log("Comics Page error -->", error.response);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="comicsPage">
      <div className="search">Search</div>
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
                />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
