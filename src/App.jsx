import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import HomePage from "./pages/HomePage/HomePage";
import CharacterPage from "./pages/CharacterPage/CharacterPage";
import CharacterDetailPage from "./pages/CharacterDetailPage/CharacterDetailPage";
import ComicsPage from "./pages/ComicsPage/ComicsPage";

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
          <Route path="/comic" element={<ComicsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
