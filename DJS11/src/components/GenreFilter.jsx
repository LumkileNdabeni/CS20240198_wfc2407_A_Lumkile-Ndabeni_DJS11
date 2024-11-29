import React from "react";

const GenreFilter = ({ onFilter }) => {
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
    const genreId = event.target.value;
    onFilter(genreId);
  };

  return (
    <div>
    
      <select onChange={handleGenreChange}>
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