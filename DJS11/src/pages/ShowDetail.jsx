// Importing necessary hooks and components
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // For routing and navigation
import { fetchShowById } from "../api"; // Function to fetch show details by ID
import AudioPlayer from "../components/AudioPlayer"; // Component for playing episode audio
import ShowCard from "../components/ShowCard"; // Component to display show details
import LoadingSpinner from "../components/LoadingSpinner"; // Spinner component for loading state
import { FavoritesContext } from "../context/FavoritesContext"; // Context for managing favorites

const ShowDetail = () => {
  // Extract show ID from the URL parameters
  const { id } = useParams();
  const navigate = useNavigate(); // For navigation after adding to favorites
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext); // Access favorites context
  const [show, setShow] = useState(null); // State for storing show details
  const [isLoading, setIsLoading] = useState(true); // State for managing loading state
  const [episodes, setEpisodes] = useState([]); // State for storing episodes of the selected season
  const [selectedSeason, setSelectedSeason] = useState(1); // State for tracking selected season (default to season 1)

  useEffect(() => {
    // Fetch show data when component mounts or when season changes
    const fetchShowData = async () => {
      setIsLoading(true); // Start loading
      try {
        // Fetch show details using the ID from the URL params
        const showData = await fetchShowById(id);
        setShow(showData); // Set show details
        setEpisodes(showData.seasons[selectedSeason - 1].episodes); // Set episodes for the selected season
      } catch (error) {
        console.error("Error fetching show details:", error); // Log any errors
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchShowData(); // Call the fetch function
  }, [id, selectedSeason]); // Re-run effect if ID or selected season changes

  // Handle season change
  const handleSeasonChange = (seasonNumber) => {
    setSelectedSeason(seasonNumber); // Update the selected season
  };

  if (isLoading) {
    return <LoadingSpinner />; // Show loading spinner while data is fetching
  }

  if (!show) {
    return <div>Show not found</div>; // Show error message if show not found
  }

  return (
    <div className="show-detail">
      {/* Display show details using ShowCard component */}
      <ShowCard
        show={{ ...show, genres: show.genres }}
        showDescription={true}
      />

      {/* Render season buttons for each season in the show */}
      <div>
        {show.seasons.map((season, index) => (
          <button key={index} onClick={() => handleSeasonChange(index + 1)}>
            Season {index + 1} {/* Button to select each season */}
          </button>
        ))}
        <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p> {/* Display last updated date */}
        <p>Genres: {show.genres?.join(", ") || "N/A"}</p> {/* Display genres */}
      </div>

      {/* Button to navigate to favorites page */}
      <Link to="/favorites">
        <button className="go-to-favorites-button">Go to Favorites</button>
      </Link>

      {/* If a season is selected, display the episodes */}
      {selectedSeason && (
        <div>
          <h3>Season {selectedSeason}</h3>
          <ul>
            {episodes.map((episode, index) => (
              <li key={episode.id}>
                {/* Display episode title and number */}
                <h4>
                  {index + 1}. {episode.title} {/* Episode number */}
                </h4>
                <AudioPlayer src={episode.audioUrl} /> {/* Display audio player for the episode */}

                {/* Button to add episode to favorites */}
                <button
                  onClick={() => {
                    addFavorite(episode, show, selectedSeason); // Add episode to favorites
                    navigate("/favorites"); // Navigate to favorites page after adding
                  }}
                >
                  Add to Favorites
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShowDetail;
