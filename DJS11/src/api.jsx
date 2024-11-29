// Base URL of the API for making requests
const BASE_URL = 'https://podcast-api.netlify.app';

// Fetch all shows from the API
export const fetchShows = async () => {
    // Make a GET request to fetch the list of shows
    const response = await fetch(BASE_URL);

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
        throw new Error('Failed to fetch shows'); // If not, throw an error
    }

    // Return the parsed JSON data from the response
    return await response.json();
};

// Fetch a specific show by its ID
export const fetchShowById = async (id) => {
    // Make a GET request to fetch details of the show using its ID
    const response = await fetch(`${BASE_URL}/id/${id}`);

    // Check if the response is OK
    if (!response.ok) {
        throw new Error('Failed to fetch show details'); // If not, throw an error
    }

    // Return the parsed JSON data from the response
    return await response.json();
};

// Fetch a specific genre by its ID
export const fetchGenreById = async (id) => {
    // Make a GET request to fetch the details of the genre using its ID
    const response = await fetch(`${BASE_URL}/genre/${id}`);

    // Check if the response is OK
    if (!response.ok) {
        throw new Error('Failed to fetch genre'); // If not, throw an error
    }

    // Return the parsed JSON data from the response
    return await response.json();
};

// Fetch all available genres from the API
export const fetchGenres = async () => {
    // Make a GET request to fetch the list of genres
    const response = await fetch(BASE_URL);

    // Check if the response is OK
    if (!response.ok) {
        throw new Error('Failed to fetch genres'); // If not, throw an error
    }

    // Return the parsed JSON data from the response
    return await response.json();
};
