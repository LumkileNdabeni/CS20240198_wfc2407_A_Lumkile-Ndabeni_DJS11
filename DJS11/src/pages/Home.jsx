import React from 'react';
import ShowList from '../components/ShowList';
import GenreFilter from '../components/GenreFilter';
import { useGenres } from '../hooks/useFetchShows'; // Custom hook to fetch genres

const Home = () => {
    const { genres, loading } = useGenres();

    const handleFilter = (genreId) => {
        // Logic to filter shows by genre can be implemented here
        console.log(`Filter shows by genre ID: ${genreId}`);
    };

    if (loading) return <div>Loading genres...</div>;

    return (
        <div className="home">
            <h1>Podcast App</h1>
            <GenreFilter genres={genres} onFilter={handleFilter} />
            <ShowList />
        </div>
    );
};

export default Home;