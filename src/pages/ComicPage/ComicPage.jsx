import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";

import "./ComicPage.css";

export default function ComicPage({ token }) {
  const params = useParams();
  const [dataComic, setDataComic] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");

  const OnSubmit = async () => {
    try {
      if (token === null) {
        alert("Vous n'êtes pas connecté");
      } else {
        const response = await axios.post(
          `https://site--marvel-back--fzydy6yrfhrj.code.run/user/favoris/comic`,
          { token, id }
        );
        alert("Le comic a bien été ajouté à vos favoris");
      }
    } catch (error) {
      console.log("Comic Detail Page error (favori) -->", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--fzydy6yrfhrj.code.run/comic/${params.comicId}`
        );
        setDataComic(response.data);
        setId(params.comicId);

        console.log(response);
      } catch (error) {
        console.log("Comic Detail Page error -->", error.response);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);
  {
  }
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="comicDetailPage">
      <button className="favText" onClick={OnSubmit}>
        J'ajoute ce comic à mes favoris !
      </button>
      <div className="comicTitle">{dataComic.title}</div>
      <div className="comicDescriptionDetail">{dataComic.description}</div>

      <img
        src={dataComic.thumbnail.path + "." + dataComic.thumbnail.extension}
        alt=""
        className="thumbailComic"
      />
    </main>
  );
}
