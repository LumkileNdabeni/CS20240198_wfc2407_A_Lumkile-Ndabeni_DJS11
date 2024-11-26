import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShowDetail = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadShow = async () => {
            try {
                const data = await fetchShowById(id);
                setShow(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadShow();
    }, [id]);

    if (loading) return <div>Loading show details...</div>;

    return (
        <div className="show-detail">
            <h1>{show.title}</h1>
            <img src={show.image} alt={show.title} />
            <p>{show.description}</p>
            <h2>Episodes</h2>
            {show.seasons.map((season) => (
                <div key={season.id}>
                    <h3>Season {season.number}</h3>
                    {season.episodes.map((episode) => (
                        <div key={episode.id}>
                            <h4>{episode.title}</h4>
                            <AudioPlayer src={episode.audioUrl} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ShowDetail;