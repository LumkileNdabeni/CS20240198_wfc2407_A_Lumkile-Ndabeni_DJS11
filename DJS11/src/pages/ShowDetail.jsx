import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchShowById } from "../api";
import AudioPlayer from "../components/AudioPlayer";
import ShowCard from "../components/ShowCard";

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]); // State to hold episodes of the selected season

  useEffect(() => {
    const loadShow = async () => {
      try {
        const data = await fetchShowById(id);
        setShow(data);
        setSelectedSeason(data.seasons[0]); // Default to the first season
        setEpisodes(data.seasons[0].episodes); // Load episodes of the first season by default
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadShow();
  }, [id]);

  if (loading) return <div>Loading show details...</div>;

  const handleSeasonChange = (event) => {
    const seasonId = event.target.value;
    const selected = show.seasons.find((season) => season.id === parseInt(seasonId));
    setSelectedSeason(selected);
    setEpisodes(selected.episodes); // Update episodes of the selected season
  };

  return (
    <div className="show-detail">
      <ShowCard show={show} showDescription={true} />

      <div>
        <label htmlFor="season-select">Select a Season:</label>
        <select id="season-select" onChange={handleSeasonChange} value={selectedSeason?.id || ""}>
          {show.seasons.map((season, index) => (
            <option key={season.id} value={season.id}>
              Season {index + 1}
            </option>
          ))}
        </select>
      </div>

      {selectedSeason && (
        <div>
          <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
          <h1>Season {show.seasons.findIndex((s) => s.id === selectedSeason.id) + 1}</h1>
          <h2>Episodes:</h2>
          <ul>
            {episodes.map((episode) => (
              <li key={episode.id}>
                <h4>{episode.title}</h4>
                <AudioPlayer src={episode.audioUrl} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShowDetail;