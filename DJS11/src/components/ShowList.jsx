import React, { useEffect, useState } from 'react';

const ShowList = () => {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadShows = async () => {
            try {
                const data = await fetchShows();
                setShows(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadShows();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="show-list">
            {shows.map((show) => (
                <ShowCard key={show.id} show={show} />
            ))}
        </div>
    );
};

export default ShowList;