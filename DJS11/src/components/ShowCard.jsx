import React from 'react';

const ShowCard = ({ show }) => {
    return (
        <div className="show-card">
            <img src={show.image} alt={show.title} />
            <h3>{show.title}</h3>
            <p>{show.description}</p>
        </div>
    );
};

export default ShowCard;