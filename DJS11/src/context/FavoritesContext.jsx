// Importing necessary functions and hooks from React
import React, { createContext, useState, useEffect } from "react";

// Creating a Context object for managing favorites across the app
export const FavoritesContext = createContext();

// Defining the provider component for the FavoritesContext
// This component wraps around any part of the app that needs access to the favorites state
export const FavoritesProvider = ({ children }) => {
  // State to hold the list of favorite items
  const [favorites, setFavorites] = useState([]);

  // useEffect to load saved favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      // Parsing and setting the favorites from localStorage
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // useEffect to save the current favorites to localStorage whenever the favorites state changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]); // Runs whenever the `favorites` state changes

  // Function to add a favorite item (e.g., an episode from a show)
  const addFavorite = (episode, show, season) => {
    setFavorites((prev) => [
      ...prev, // Keep existing favorites
      { episode, show, season }, // Add new favorite as an object
    ]);
  };

  // Function to remove a favorite item based on the episode's ID
  const removeFavorite = (episodeId) => {
    setFavorites((prev) =>
      prev.filter((favorite) => favorite.episode.id !== episodeId)
    );
  };

  return (
    // Providing the favorites state and modification functions to the children
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
