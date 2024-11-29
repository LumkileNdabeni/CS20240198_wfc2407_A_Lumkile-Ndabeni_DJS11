import React, { useEffect, useState } from "react";
import ShowCard from "./ShowCard";
import LoadingSpinner from "./LoadingSpinner";
import { fetchShows } from "../api";

const ShowList = ({ selectedGenreId, searchTerm, sortOrder }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShows = async () => {
      try {
        const data = await fetchShows();

        // 1. Filter by genre
        const genreFilteredShows = selectedGenreId
          ? data.filter((show) => show.genreId === parseInt(selectedGenreId))
          : data;

        // 2. Filter by search term
        const searchedShows = genreFilteredShows.filter((show) =>
          show.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // 3. Sort the shows
        const sortedShows = [...searchedShows].sort((a, b) => {
          const comparison = a.title.localeCompare(b.title);
          return sortOrder === "asc" ? comparison : -comparison;
        });

        setShows(sortedShows);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, [selectedGenreId, searchTerm, sortOrder]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="show-list-container">
      <div className="show-list">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default ShowList;