// Importing the React library to create components
import React from 'react';

// Defining a functional component named "AudioPlayer"
// The component takes "src" as a prop, which represents the audio file's source URL
const AudioPlayer = ({ src }) => {
    return (
        // The <audio> element provides audio playback functionality
        // The "controls" attribute adds play, pause, and volume controls
        <audio controls>
            {/* The <source> element specifies the audio file to play and its format */}
            <source src={src} type="audio/mpeg" />
            {/* Fallback text for browsers that do not support the <audio> element */}
            Your browser does not support the audio element.
        </audio>
    );
};

// Exporting the AudioPlayer component to use it in other parts of the application
export default AudioPlayer;
