// Importing necessary hooks and components
import React, { useState, useEffect } from "react";
import GenreFilter from "../components/GenreFilter"; // Component for genre filtering
import ShowList from "../components/ShowList"; // Component to display the list of shows

const Home = () => {
  // State for the selected genre ID (initially no genre selected)
  const [selectedGenreId, setSelectedGenreId] = useState(""); 
  // State for the search term (initially empty)
  const [searchTerm, setSearchTerm] = useState("");
  // State for sorting by title (default is ascending order)
  const [sortOrder, setSortOrder] = useState("asc");
  // State for sorting by updated time (initially empty, indicating no time sorting)
  const [updateSort, setUpdateSort] = useState("");

  // Function to handle genre filter changes (passed to GenreFilter component)
  const handleGenreFilter = (genreId) => {
    setSelectedGenreId(genreId); // Update selected genre ID
  };

  // Function to handle changes in the search input (updates search term)
  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Set the search term based on user input
  };

  // Function to handle title sorting (cycles through asc -> desc -> none)
  const handleSort = () => {
    setSortOrder((prevSortOrder) => {
      if (prevSortOrder === "asc") return "desc"; // Change to descending
      if (prevSortOrder === "desc") return ""; // Remove sorting
      return "asc"; // Default to ascending
    });
    setUpdateSort(""); // Reset updated time sorting when switching to title sorting
  };

  // Function to handle updated time sorting (cycles through newest -> oldest -> none)
  const handleUpdateSort = () => {
    setUpdateSort((prevUpdateSort) => {
      if (prevUpdateSort === "newest") return "oldest"; // Change to oldest
      if (prevUpdateSort === "oldest") return ""; // Remove sorting
      return "newest"; // Default to newest
    });
    setSortOrder(""); // Reset title sorting when switching to updated time sorting
  };

  return (
    <div>
      <div className="home-container">
        <h1>Podcast Shows</h1>

        {/* Genre filter component to filter shows by genre */}
        <div>
          <GenreFilter onFilter={handleGenreFilter} />

          {/* Search input for filtering shows by title */}
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={handleSearch} // Update the search term on input change
          />

          {/* Button to toggle title sorting between ascending, descending, and no sort */}
          <button onClick={handleSort}>
            Sort {sortOrder === "asc" ? "A-Z" : sortOrder === "desc" ? "Z-A" : "Title"}
          </button>

          {/* Button to toggle updated time sorting between newest, oldest, and no sort */}
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

      {/* Pass the current state to ShowList to filter, sort, and display shows */}
      <ShowList
        selectedGenreId={selectedGenreId}
        searchTerm={searchTerm}
        sortOrder={sortOrder || updateSort} // Use either title or updated time sorting
      />
    </div>
  );
};

export default Home;
