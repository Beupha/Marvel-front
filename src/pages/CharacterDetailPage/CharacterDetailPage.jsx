import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import "./CharacterDetailPage.css";

export default function CharacterPage() {
  const [dataCharacter, setDataCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/character/${params.characterId}`
        );
        setDataCharacter(response.data);
        setId(params.characterId);
      } catch (error) {
        console.log("Character Detail Page error -->", error.response);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="characterDetailPage">
      <span className="characterName">{dataCharacter.name}</span>
      <span className="characterDescription">{dataCharacter.description}</span>
      <img
        className="characterThumbnail"
        src={
          dataCharacter.thumbnail.path + "." + dataCharacter.thumbnail.extension
        }
        alt=""
      />
      <Link to={`/comics/${id}`} key={id} className="moreCharacter">
        Cliquer ici pour aller voir la liste des comics dans lesquels ce
        personnage est présent...
      </Link>
    </main>
  );
}
