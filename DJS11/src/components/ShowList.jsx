import React, { useEffect, useState } from "react";
import ShowCard from "./ShowCard";
import LoadingSpinner from "./LoadingSpinner";
import { fetchShows } from "../api";

const ShowList = ({ selectedGenreId }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShows = async () => {
      try {
        const data = await fetchShows();

        // Apply genre filter if selectedGenreId is provided
        const filteredShows = selectedGenreId
          ? data.filter((show) => show.genreId === parseInt(selectedGenreId))
          : data;

        // Sort shows alphabetically
        filteredShows.sort((a, b) => a.title.localeCompare(b.title));

        setShows(filteredShows);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, [selectedGenreId]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="show-list">
      {shows.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  );
};

export default ShowList;