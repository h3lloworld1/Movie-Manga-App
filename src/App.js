import { Routes, Route } from "react-router-dom";

import NavigationBar from "./components/Navbar/Navbar";
import Home from "./components/Pages/HomePage";
import AnimePageFetch from "./components/Pages/AnimePageFetch";
import TopAnimesFetch from "./components/Pages/TopAnimesFetch";
import RecentEpisodesFetch from "./components/Pages/RecentEpisodesFetch";
import ReviewFetch from "./components/Pages/ReviewFetch";
import Footer from "./components/Footer/Footer";
import Magazines from "./components/Pages/Magazines";

import { useSelector } from "react-redux";
import React from "react";

function App() {
  const contentState = useSelector((state) => state.showAnimeState);

  return (
    <div>
      <header>
        <NavigationBar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />

        {contentState && (
          <Route path="/anime-page/:id" element={<AnimePageFetch />} />
        )}

        {!contentState && (
          <Route path="/manga-page/:id" element={<AnimePageFetch />} />
        )}
        <Route path="/top-animes" element={<TopAnimesFetch />} />
        <Route path="/recent-episodes" element={<RecentEpisodesFetch />} />
        <Route path="/reviews" element={<ReviewFetch />} />
        <Route path="/magazines" element={<Magazines />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
