import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";

import "./ComicPage.css";

export default function ComicPage() {
  const params = useParams();
  const [dataComic, setDataComic] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/comic/${params.comicId}`
        );
        setDataComic(response.data);
      } catch (error) {
        console.log("Comic Detail Page error -->", error);
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
