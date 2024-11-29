// Importing React, hooks, and other components
import React, { useEffect, useState } from "react";
import ShowCard from "./ShowCard";
import LoadingSpinner from "./LoadingSpinner";

// Importing the API function to fetch shows
import { fetchShows } from "../api";

// Defining the "ShowList" component
// Props:
// - selectedGenreId: ID of the genre to filter shows by
// - searchTerm: Term to filter shows based on their title
// - sortOrder: Order to sort the shows (e.g., "newest", "oldest", "asc", "desc")
const ShowList = ({ selectedGenreId, searchTerm, sortOrder }) => {
  // State to store the list of shows
  const [shows, setShows] = useState([]);
  // State to track the loading status
  const [loading, setLoading] = useState(true);

  // useEffect to load and process shows whenever dependencies change
  useEffect(() => {
    const loadShows = async () => {
      try {
        // Fetching the data using the API
        const data = await fetchShows();

        // 1. Filter shows by the selected genre ID, if provided
        const genreFilteredShows = selectedGenreId
          ? data.filter((show) => show.genreId === parseInt(selectedGenreId))
          : data;

        // 2. Filter shows by the search term (case-insensitive match in the title)
        const searchedShows = genreFilteredShows.filter((show) =>
          show.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // 3. Sort the shows based on the provided sort order
        const sortedShows = [...searchedShows].sort((a, b) => {
          if (sortOrder === "newest") {
            // Sort by descending order of updated_at (newest first)
            return new Date(b.updated_at) - new Date(a.updated_at);
          } else if (sortOrder === "oldest") {
            // Sort by ascending order of updated_at (oldest first)
            return new Date(a.updated_at) - new Date(b.updated_at);
          } else {
            // Default to sorting by title (alphabetical order)
            const comparison = a.title.localeCompare(b.title);
            return sortOrder === "asc" ? comparison : -comparison;
          }
        });

        // Updating the state with the sorted and filtered shows
        setShows(sortedShows);
      } catch (error) {
        // Logging any errors encountered during the fetch or processing
        console.error(error);
      } finally {
        // Updating the loading state to false once data is loaded or an error occurs
        setLoading(false);
      }
    };

    // Calling the function to load shows
    loadShows();
  }, [selectedGenreId, searchTerm, sortOrder]); // Dependencies: re-run when these values change

  // Show a loading spinner while data is being fetched
  if (loading) return <LoadingSpinner />;

  return (
    <div className="show-list-container">
      {/* Container for the list of shows */}
      <div className="show-list">
        {/* Mapping over the filtered and sorted shows to render a ShowCard for each */}
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

// Exporting the ShowList component for use in other parts of the application
export default ShowList;
