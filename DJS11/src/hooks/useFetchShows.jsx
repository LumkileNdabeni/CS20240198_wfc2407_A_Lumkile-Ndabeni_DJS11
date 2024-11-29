import { useEffect, useState } from 'react';
import { fetchGenres } from '../api'; // Import the API function to fetch genres

// Custom hook for fetching genres
export const useGenres = () => {
    const [genres, setGenres] = useState([]);  // State to hold the genres
    const [loading, setLoading] = useState(true);  // State to track the loading status

    useEffect(() => {
        // Async function to fetch genres from the API
        const loadGenres = async () => {
            try {
                const data = await fetchGenres();  // Fetch genres from the API
                setGenres(data);  // Update the genres state with the fetched data
            } catch (error) {
                console.error(error);  // Log any errors encountered during the fetch
            } finally {
                setLoading(false);  // Set loading to false after the data is fetched or error occurs
            }
        };
        
        loadGenres();  // Call the function to load genres when the component mounts
    }, []);  // Empty dependency array ensures this runs only once when the component mounts

    // Return the genres and loading state to be used by components that call this hook
    return { genres, loading };
};
