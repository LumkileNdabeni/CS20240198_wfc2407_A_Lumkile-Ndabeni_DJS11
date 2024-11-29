// Importing the React library to create components
import React from 'react';

// Defining a functional component named "LoadingSpinner"
// This component displays a simple loading spinner to indicate that content is being loaded
const LoadingSpinner = () => {
    return (
        // The container for the loading spinner with a "spinner" class for styling
        <div className="spinner">
            {/* Text displayed while loading */}
            Loading...
        </div>
    );
};

// Exporting the LoadingSpinner component to use it in other parts of the application
export default LoadingSpinner;
