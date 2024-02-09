import { useState } from "react";
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

import "./App.css";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  // const [search, setSearch] = useState("");

  // const setUser = (token) => {
  //   if (token) {
  //     setToken(token);
  //     Cookies.set("token", token);
  //   } else {
  //     setToken(null);
  //     Cookies.remove("token");
  //   }
  // };

  return (
    <>
      <Router>
        <Header token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/character"
            // setSearch={setSearch}
            element={<CharacterPage />}
          />
          <Route
            path="/character/:characterId"
            element={<CharacterDetailPage />}
          />
          <Route
            path="/comics"
            // setSearch={setSearch}
            element={<ComicsPage />}
          />
          <Route path="/comic/:comicId" element={<ComicPage />} />
          <Route
            path="/comics/:characterId"
            element={<CharacterDetailComicsPage />}
          />
          <Route
            path="/user/signUp"
            // setUser={setUser}
            setToken={setToken}
            element={<SignUpPage />}
          />
          <Route
            path="/user/login"
            // setUser={setUser}
            setToken={setToken}
            token={token}
            element={<LoginPage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
