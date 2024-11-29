import React, { useEffect, useState } from "react";
import ShowCard from "./ShowCard";
import LoadingSpinner from "./LoadingSpinner";
import { fetchShows } from "../api";

const ShowList = ({ selectedGenreId }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [sortOrder, setSortOrder] = useState("asc"); // State for sort order

  useEffect(() => {
    const loadShows = async () => {
      try {
        const data = await fetchShows();

        // Apply genre filter if selectedGenreId is provided
        const filteredShows = selectedGenreId
          ? data.filter((show) => show.genreId === parseInt(selectedGenreId))
          : data;

        setShows(filteredShows);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, [selectedGenreId]);

  // Search function
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Sort function
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Filter shows based on search term
  const filteredShows = shows.filter((show) =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort shows based on sort order
  const sortedShows = [...filteredShows].sort((a, b) => {
    const comparison = a.title.localeCompare(b.title);
    return sortOrder === "asc" ? comparison : -comparison;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={handleSort}>
        Sort {sortOrder === "asc" ? "Z-A" : "A-Z"}
      </button>
      <div className="show-list">
        {sortedShows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default ShowList;