import React, { useState, useEffect } from "react";
import GenreFilter from "../components/GenreFilter";
import ShowList from "../components/ShowList";

const Home = () => {
  const [selectedGenreId, setSelectedGenreId] = useState(""); // Provide initial empty string
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Default to ascending title sort
  const [updateSort, setUpdateSort] = useState(""); // Add state for updated time sorting

  const handleGenreFilter = (genreId) => {
    setSelectedGenreId(genreId);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = () => {
    // Cycle through title sorting options: asc -> desc -> none
    setSortOrder((prevSortOrder) => {
      if (prevSortOrder === "asc") return "desc";
      if (prevSortOrder === "desc") return ""; // No title sorting
      return "asc";
    });
    setUpdateSort(""); // Reset updated time sorting when changing title sort
  };

  const handleUpdateSort = () => {
    // Cycle through updated time sorting options: newest -> oldest -> none
    setUpdateSort((prevUpdateSort) => {
      if (prevUpdateSort === "newest") return "oldest";
      if (prevUpdateSort === "oldest") return ""; // No updated time sorting
      return "newest";
    });
    setSortOrder(""); // Reset title sorting when changing updated time sort
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
          {/* Title sorting button */}
          <button onClick={handleSort}>
            Sort {sortOrder === "asc" ? "A-Z" : sortOrder === "desc" ? "Z-A" : "Title"}
          </button>
          {/* Updated time sorting button */}
          <button onClick={handleUpdateSort}>
            Sort{" "}
            {updateSort === "newest"
              ? "Newly Updated"
              : updateSort === "oldest"
              ? "Oldest Updated"
              : "Updated"}
          </button>
        </div>
      </div>
      <ShowList
        selectedGenreId={selectedGenreId}
        searchTerm={searchTerm}
        sortOrder={sortOrder || updateSort} // Pass either title or updated time sort
      />
    </div>
  );
};

export default Home;