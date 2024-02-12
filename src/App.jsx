import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import ReactPaginate from "react-paginate";

import Header from "./components/Header";

import HomePage from "./pages/HomePage/HomePage";
import CharacterPage from "./pages/CharacterPage/CharacterPage";
import CharacterDetailPage from "./pages/CharacterDetailPage/CharacterDetailPage";
import CharacterDetailComicsPage from "./pages/CharacterDetailComicsPage/CharacterDetailComicsPage";
import ComicsPage from "./pages/ComicsPage/ComicsPage";
import ComicPage from "./pages/ComicPage/ComicPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import FavorisPage from "./pages/FavorisPage/FavorisPage";

import "./App.css";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  return (
    <>
      <Router>
        <Header token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character" element={<CharacterPage />} />
          <Route
            path="/character/:characterId"
            element={<CharacterDetailPage token={token} />}
          />
          <Route path="/comics" element={<ComicsPage />} />
          <Route path="/comic/:comicId" element={<ComicPage token={token} />} />
          <Route
            path="/comics/:characterId"
            element={<CharacterDetailComicsPage />}
          />
          <Route
            path="/user/signUp"
            setToken={setToken}
            element={<SignUpPage />}
          />
          <Route
            path="/user/login"
            setToken={setToken}
            token={token}
            element={<LoginPage />}
          />
          <Route path="/user/favoris" element={<FavorisPage token={token} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
