import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import HomePage from "./pages/HomePage/HomePage";
import CharacterPage from "./pages/CharacterPage/CharacterPage";
import CharacterDetailPage from "./pages/CharacterDetailPage/CharacterDetailPage";
import CharacterDetailComicsPage from "./pages/CharacterDetailComicsPage/CharacterDetailComicsPage";
import ComicsPage from "./pages/ComicsPage/ComicsPage";
import ComicPage from "./pages/ComicPage/ComicPage";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character" element={<CharacterPage />} />
          <Route
            path="/character/:characterId"
            element={<CharacterDetailPage />}
          />
          <Route path="/comics" element={<ComicsPage />} />
          <Route path="/comic/:comicId" element={<ComicPage />} />
          <Route
            path="/comics/:characterId"
            element={<CharacterDetailComicsPage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
