// Importing necessary hooks and components
import React, { useContext, useState } from "react";
import { FavoritesContext } from "../context/FavoritesContext"; // Context for managing favorites
import ShowCard from "../components/ShowCard"; // Component to display show details
import AudioPlayer from "../components/AudioPlayer"; // Component to play audio

const Favorites = () => {
  // Accessing favorites state and the removeFavorite function from context
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  // State to manage the sorting order (ascending or descending)
  const [sortOrder, setSortOrder] = useState("asc");

  // Function to toggle the sorting order between ascending (A-Z) and descending (Z-A)
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Grouping favorites by show ID and season using reduce
  // This allows us to display episodes of the same show and season together
  const groupedFavorites = favorites.reduce((acc, curr) => {
    const key = `${curr.show.id}-${curr.season}`; // Key based on show ID and season
    if (!acc[key]) {
      acc[key] = []; // If key doesn't exist, create an array
    }
    acc[key].push(curr); // Add the current favorite episode to the group
    return acc;
  }, {});

  // Sorting the grouped favorites based on the show title in the selected sort order
  const sortedGroupedFavorites = Object.entries(groupedFavorites)
    .map(([key, episodes]) => ({ key, episodes })) // Convert grouped object into an array of entries
    .sort((a, b) => {
      // Sorting by show title (alphabetically)
      const comparison = a.episodes[0].show.title.localeCompare(
        b.episodes[0].show.title
      );
      return sortOrder === "asc" ? comparison : -comparison; // Ascending or descending order
    });

  return (
    <div className="favorites">
      <h1>Your Favorites</h1>

      {/* Button to toggle the sort order */}
      <button onClick={handleSort}>
        Sort {sortOrder === "asc" ? "Z-A" : "A-Z"}
      </button>

      {/* Display message if no favorites are present */}
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        // Mapping through sorted favorites to display each group
        sortedGroupedFavorites.map(({ key, episodes }) => (
          <div key={key} className="favorite-group">
            <div className="favorite-show-info">
              {/* Displaying show details with the ShowCard component */}
              <ShowCard show={episodes[0].show} showDescription={true} />
            </div>
            <h2>{episodes[0].show.title}</h2>
            <h3>Season {episodes[0].season}</h3>
            <ul>
              {/* Displaying each episode within the group */}
              {episodes.map(({ episode }) => (
                <li key={episode.id} className="favorite-item">
                  <h4>{episode.title}</h4>
                  {/* Rendering the AudioPlayer component for each episode */}
                  <AudioPlayer src={episode.audioUrl} />
                  {/* Button to remove the episode from favorites */}
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
