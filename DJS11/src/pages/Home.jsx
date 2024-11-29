import React, { useState, useEffect } from "react";
import GenreFilter from "../components/GenreFilter";
import ShowList from "../components/ShowList";

const Home = () => {
  const [selectedGenreId, setSelectedGenreId] = useState(""); // Provide initial empty string
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleGenreFilter = (genreId) => {
    setSelectedGenreId(genreId);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <div className="home-container">
        <h1> Podcast Shows </h1>
        <div>
          <GenreFilter onFilter={handleGenreFilter} />
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={handleSort}>
            Sort {sortOrder === "asc" ? "Z-A" : "A-Z"}
          </button>
        </div>
      </div>
      <ShowList
        selectedGenreId={selectedGenreId}
        searchTerm={searchTerm}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default Home;