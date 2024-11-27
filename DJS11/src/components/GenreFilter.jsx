import React, { useState } from "react";

const GenreFilter = () => {
  const [selectedGenre, setSelectedGenre] = useState(""); // State to store selected genre ID

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

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value); // Update selected genre ID
  };

  return (
    <div>
      <h4>Filter by Genre</h4>
      <select value={selectedGenre} onChange={handleGenreChange}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;