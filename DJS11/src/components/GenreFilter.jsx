// Importing the React library to create components
import React from "react";

// Defining a functional component named "GenreFilter"
// The component takes a prop "onFilter", which is a callback function to handle genre filtering
const GenreFilter = ({ onFilter }) => {
  // Array of genre objects, each containing an id and a title
  const genres = [
    { id: 1, title: "Personal Growth" },
    { id: 2, title: "Investigative Journalism" },
    { id: 3, title: "History" },
    { id: 4, title: "Comedy" },
    { id: 5, title: "Entertainment" },
    { id: 6, title: "Business" },
    { id: 7, title: "Fiction" },
    { id: 8, title: "News" },
    { id: 9, title: "Kids and Family" },
  ];

  // Event handler for when the user selects a genre
  const handleGenreChange = (event) => {
    // Extracting the selected genre ID from the event
    const genreId = event.target.value;

    // Calling the "onFilter" callback with the selected genre ID
    // This allows the parent component to update its state or perform actions based on the selection
    onFilter(genreId);
  };

  return (
    <div>
      {/* Dropdown menu for selecting a genre */}
      <select onChange={handleGenreChange}>
        {/* Default option to show all genres */}
        <option value="">All Genres</option>

        {/* Dynamically generating <option> elements from the genres array */}
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.title}
          </option>
        ))}
      </select>
    </div>
  );
};

// Exporting the GenreFilter component to use it in other parts of the application
export default GenreFilter;
