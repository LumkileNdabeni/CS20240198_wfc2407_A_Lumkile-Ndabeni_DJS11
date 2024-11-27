import React from "react";
import { Link } from "react-router-dom";

const ShowCard = ({ show }) => {
  const imageStyle = {
    width: "200px", // Adjust the width as needed
    height: "auto", // Maintain aspect ratio
  };

  return (
    <div className="show-card">
      <img src={show.image} alt={show.title} style={imageStyle} />
      <Link to={`/show/${show.id}`}>
        <h3>{show.title}</h3>
      </Link>
      <p>{show.description}</p>
    </div>
  );
};

export default ShowCard;