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
      <button className="show-title-button">{show.title}</button> 
      </Link>
      {showDescription && <p>{show.description}</p>}
    </div>
  );
};

export default ShowCard;