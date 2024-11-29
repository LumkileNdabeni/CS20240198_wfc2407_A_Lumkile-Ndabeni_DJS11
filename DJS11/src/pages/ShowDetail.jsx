// src/pages/ShowDetail.jsx  
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchShowById } from "../api";
import AudioPlayer from "../components/AudioPlayer";
import ShowCard from "../components/ShowCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { FavoritesContext } from "../context/FavoritesContext";

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  useEffect(() => {
    const fetchShowData = async () => {
      setIsLoading(true);
      try {
        const showData = await fetchShowById(id);
        setShow(showData);

        // Set initial episodes for the default season
        setEpisodes(showData.seasons[selectedSeason - 1].episodes);
      } catch (error) {
        console.error("Error fetching show details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowData();
  }, [id, selectedSeason]);

  const handleSeasonChange = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!show) {
    return <div>Show not found</div>;
  }

  return (
    <div className="show-detail">
      <ShowCard
        show={{ ...show, genres: show.genres }}
        showDescription={true}
      />

      <div>
        {show.seasons.map((season, index) => (
          <button key={index} onClick={() => handleSeasonChange(index + 1)}>
            Season {index + 1}
          </button>
        ))}

        <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
        <p>
          Genres:{" "}
          {show.genres?.join(", ") || "N/A"}
        </p>
      </div>

      {selectedSeason && (
        <div>
          <h3>Season {selectedSeason}</h3>
          <ul>
            {episodes.map((episode) => (
              <li key={episode.id}>
                <h4>{episode.title}</h4>

                <AudioPlayer src={episode.audioUrl} />
                <button
                         onClick={() => {
                          addFavorite(episode, show, selectedSeason);
                         navigate('/favorites'); // Navigate to favorites page
                         }} >
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