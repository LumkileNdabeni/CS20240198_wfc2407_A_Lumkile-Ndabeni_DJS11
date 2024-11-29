// src/pages/Favorites.jsx  
import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import ShowCard from "../components/ShowCard";
import AudioPlayer from "../components/AudioPlayer";

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  const groupedFavorites = favorites.reduce((acc, curr) => {
    const key = `${curr.show.id}-${curr.season}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(curr);
    return acc;
  }, {});

  return (
    <div className="favorites">
      <h1>Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        Object.entries(groupedFavorites).map(([key, episodes]) => (
          <div key={key}>
            <h2>{episodes[0].show.title}</h2>
            <h3>Season {episodes[0].season}</h3>
            <ul>
              {episodes.map(({ episode }) => (
                <li key={episode.id}>
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