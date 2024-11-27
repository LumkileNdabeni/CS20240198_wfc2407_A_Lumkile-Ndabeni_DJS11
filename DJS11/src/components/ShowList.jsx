import React, { useState, useEffect } from "react";
import ShowCard from "./ShowCard";
import LoadingSpinner from "./LoadingSpinner";
import { fetchShows } from "../api";
import GenreFilter from "./GenreFilter"; // Assuming you have this component

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(""); // State to store selected genre

  useEffect(() => {
    const loadShows = async () => {
      try {
        const data = await fetchShows();
        setShows(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadShows();
  }, []);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  // Filter and sort shows based on selected genre
  const filteredShows = shows
    .filter((show) => {
      if (selectedGenre === "") {
        return true; // Show all shows if no genre is selected
      } else {
        return show.genre_ids.includes(parseInt(selectedGenre));
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <GenreFilter onGenreChange={handleGenreChange} /> {/* Pass the handler */}
      <div className="show-list">
        {filteredShows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default ShowList;