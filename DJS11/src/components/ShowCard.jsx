import React from "react";
import { Link } from "react-router-dom";

const ShowCard = ({ show, showDescription }) => {
  const imageStyle = {
    width: "200px",
    height: "auto",
  };

  return (
    <div className="show-card">
      <Link to={`/show/${show.id}`}>
        <img src={show.image} alt={show.title} style={imageStyle} />
      </Link>
      <Link to={`/show/${show.id}`}>
        <h3>{show.title}</h3>
      </Link>
      {showDescription && <p>{show.description}</p>} {/* Conditionally render description */}
    </div>
  );
};

export default ShowCard;