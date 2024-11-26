import React from 'react';

const GenreFilter = ({ genres, onFilter }) => {
    return (
        <div>
            <h4>Filter by Genre</h4>
            {genres.map((genre) => (
                <button key={genre.id} onClick={() => onFilter(genre.id)}>
                    {genre.title}
                </button>
            ))}
        </div>
    );
};

export default GenreFilter;