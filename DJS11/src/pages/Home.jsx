// Home.jsx
import React, { useState } from "react";
import GenreFilter from "./GenreFilter";
import ShowList from "./ShowList";

const Home = () => {
  const [selectedGenre, setSelectedGenre] = useState(null); // Store the selected genre object

  const handleGenreFilter = (genre) => {
    console.log("Filtering by genre:", genre);
    setSelectedGenre(genre);
  };

  return (
    <div>
      <div>
        <h1> Podcast Shows </h1>
      </div>

      <GenreFilter onFilter={handleGenreFilter} />
      <ShowList selectedGenre={selectedGenre} /> {/* Pass the selected genre object */}
    </div>
  );
};

export default Home;