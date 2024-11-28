import React, { useState } from "react";
import ShowList from "../components/ShowList";
import GenreFilter from "../components/GenreFilter";

const Home = () => {
  const [selectedGenreId, setSelectedGenreId] = useState("");

  const handleFilter = (genreId) => {
    setSelectedGenreId(genreId);
  };

  return (
    <div className="home">
      <h1>Podcast App</h1>
      <GenreFilter onFilter={handleFilter} />
      <ShowList selectedGenreId={selectedGenreId} />
    </div>
  );
};

export default Home;