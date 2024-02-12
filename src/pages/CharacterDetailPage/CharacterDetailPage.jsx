import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import "./CharacterDetailPage.css";

export default function CharacterPage({ token }) {
  const [dataCharacter, setDataCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const [id, setId] = useState("");

  const OnSubmit = async () => {
    try {
      if (token === null) {
        alert("Vous n'êtes pas connecté");
      } else {
        const response = await axios.post(
          `http://127.0.0.1:3000/user/favoris`,
          { token, id }
        );
        // console.log("token -->", token);
        // console.log("id -->", id);
      }
    } catch (error) {
      console.log("Character Detail Page error (favori) -->", error.response);
    }
    alert("Le personnage a bien été ajouté à vos favoris");
  };

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
      <button className="favText" onClick={OnSubmit}>
        J'ajoute ce personnage à mes favoris !
      </button>
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
