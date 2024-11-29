import React, { useContext, useState } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import ShowCard from "../components/ShowCard";
import AudioPlayer from "../components/AudioPlayer";

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  // State for sorting order
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Group favorites by show and season
  const groupedFavorites = favorites.reduce((acc, curr) => {
    const key = `${curr.show.id}-${curr.season}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(curr);
    return acc;
  }, {});

  // Sort grouped favorites based on sort order
  const sortedGroupedFavorites = Object.entries(groupedFavorites)
    .map(([key, episodes]) => ({ key, episodes }))
    .sort((a, b) => {
      const comparison = a.episodes[0].show.title.localeCompare(
        b.episodes[0].show.title
      );
      return sortOrder === "asc" ? comparison : -comparison;
    });

  return (
    <div className="favorites">
      <h1>Your Favorites</h1>

      {/* Sort button */}
      <button onClick={handleSort}>
        Sort {sortOrder === "asc" ? "Z-A" : "A-Z"}
      </button>

      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        sortedGroupedFavorites.map(({ key, episodes }) => (
          <div key={key} className="favorite-group">
            <div className="favorite-show-info">
              <ShowCard show={episodes[0].show} showDescription={true} /> {/* Pass showDescription prop */}
            </div>
            <h2>{episodes[0].show.title}</h2>
            <h3>Season {episodes[0].season}</h3>
            <ul>
              {episodes.map(({ episode }) => (
                <li key={episode.id} className="favorite-item">
                  <h4>{episode.title}</h4>
                  <AudioPlayer src={episode.audioUrl} />
                  <button onClick={() => removeFavorite(episode.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;