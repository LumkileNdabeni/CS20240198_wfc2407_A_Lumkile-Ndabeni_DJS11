import { useEffect, useState } from 'react';
import { fetchGenres } from '../api'; 

export const useGenres = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGenres = async () => {
            try {
                const data = await fetchGenres(); // Fetch genres from the API
                setGenres(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadGenres();
    }, []);

    return { genres, loading };
};