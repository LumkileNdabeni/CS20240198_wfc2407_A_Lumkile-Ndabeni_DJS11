// Importing the React library to create components
import React from "react";
// Importing the Link component from react-router-dom to create navigable links
import { Link } from "react-router-dom";

// Defining a functional component named "ShowCard"
// Props: 
// - "show": an object containing information about the show (id, title, image, description)
// - "showDescription": a boolean indicating whether to display the show's description
const ShowCard = ({ show, showDescription }) => {
  // Inline style object for the show's image to set a consistent width
  const imageStyle = {
    width: "200px",
    height: "auto", // Maintains the aspect ratio of the image
  };

  return (
    <div className="show-card">
      {/* Link to the show's detailed page using its ID */}
      <Link to={`/show/${show.id}`}>
        {/* Displaying the show's image with the defined inline style */}
        <img src={show.image} alt={show.title} style={imageStyle} />
      </Link>

      {/* Another link for the show's title, styled as a button */}
      <Link to={`/show/${show.id}`}>
        <button className="show-title-button">{show.title}</button>
      </Link>

      {/* Conditionally rendering the show's description if "showDescription" is true */}
      {showDescription && <p>{show.description}</p>}
    </div>
  );
};

// Exporting the ShowCard component to use it in other parts of the application
export default ShowCard;
