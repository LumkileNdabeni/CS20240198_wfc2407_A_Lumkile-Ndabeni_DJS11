const BASE_URL = 'https://podcast-api.netlify.app';

export const fetchShows = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch shows');
    }
    return await response.json();
};

export const fetchShowById = async (id) => {
    const response = await fetch(`${BASE_URL}/id/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch show details');
    }
    return await response.json();
};

export const fetchGenreById = async (id) => {
    const response = await fetch(`${BASE_URL}/genre/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch genre');
    }
    return await response.json();
};