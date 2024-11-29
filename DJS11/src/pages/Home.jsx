import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchShows } from "../api";
import ShowList from "../components/ShowList";
import GenreFilter from "../components/GenreFilter";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
    const [shows, setShows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(""); // Remove default value
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const fetchShowsData = async () => {
            setIsLoading(true);
            const showsData = await fetchShows();
            setShows(showsData);
            setIsLoading(false);
        };

        fetchShowsData();
    }, []);

    const handleGenreChange = async (genreId) => {
        // Set genre as a number
        setSearchParams({ genre: genreId }); 
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchParams({   
 q: searchTerm });
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
    };

    const filteredShows = shows
        .filter((show) => {
            const genreMatch = searchParams.get("genre")
                ? show.genres.some((genre) => genre.id === +searchParams.get("genre")) // Parse genre to number
                : true;
            const searchMatch = searchTerm
                ? show.title.toLowerCase().includes(searchTerm.toLowerCase())
                : true;
            return genreMatch && searchMatch;
        })
        .sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (sortOrder === "asc") {
                return titleA.localeCompare(titleB);
            } else {
                return titleB.localeCompare(titleA);   

            }
        });
        
    return (
        <div>
            <h1>Podcast App</h1>

            <div className="filter-container">
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search shows..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button type="submit">Search</button>
                </form>

                <GenreFilter onGenreChange={handleGenreChange} />

                {/* Sorting buttons */}
                <div>
                    <button onClick={() => handleSortChange("asc")}>A-Z</button>
                    <button onClick={() => handleSortChange("desc")}>Z-A</button>
                </div>
            </div>

            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <ShowList shows={filteredShows} />
            )}
        </div>
    );
};

export default Home;