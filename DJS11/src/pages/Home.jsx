// Parent component (e.g., Home.jsx)
import React, { useState } from "react";
import GenreFilter from "../components/GenreFilter";
import ShowList from "../components/ShowList";

const Home = () => {
  const [selectedGenreId, setSelectedGenreId] = useState("");

  const handleGenreFilter = (genreId) => {
    console.log("Filtering by genre ID:", genreId);
    setSelectedGenreId(genreId);
  };

  return (
    <div>

<div>
    <h1> Podcast Shows </h1>
</div>

      <GenreFilter onFilter={handleGenreFilter} />
      <ShowList selectedGenreId={selectedGenreId} />
    </div>
  );
};

export default Home;