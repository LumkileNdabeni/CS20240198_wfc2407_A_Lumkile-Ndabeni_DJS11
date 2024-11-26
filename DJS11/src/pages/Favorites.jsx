import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import ShowCard from '../components/ShowCard';

const Favorites = () => {
    const { favorites } = useContext(FavoritesContext);

    return (
        <div className="favorites">
            <h1>Your Favorites</h1>
            {favorites.length === 0 ? (
                <p>No favorites yet!</p>
            ) : (
                <div className="show-list">
                    {favorites.map((show) => (
                        <ShowCard key={show.id} show={show} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;