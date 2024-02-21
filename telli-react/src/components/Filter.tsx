import React, { useEffect, useState } from "react";
import { ChangeEvent } from 'react';

interface MovieGenre {
    id: number,
    name: string
}

interface FilterProps {
    setSelectedGenreId: (genreId: number | string) => void; // Accepts either number or string
}

export const Filter: React.FC<FilterProps> = ({ setSelectedGenreId }) => {
    const [movieGenre, setMovieGenre] = useState<MovieGenre[]>([]);

    useEffect(() => {
        async function getMovieGenre() {
            const url = (
                'https://api.themoviedb.org/3/genre/movie/list?language=en'
            );
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGU2NTJhODNlYzkwNzcxZTdkZWQ4YWEwMmMyMDJkYSIsInN1YiI6IjY1YWQ1OWJiMTU4Yzg1MDBhYzFiZTEyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nA96D4cB1ZUGNw42oU3Ah6NVMuQhb2WTlIehZJskGDg'
                }
            };

            try {
                const response = await fetch(url, options);
                const json = await response.json();
                const dataResponse = json.genres;
                setMovieGenre(dataResponse);
            } catch (error) {
                console.error("Error fetching movie genres:", error);
            }
        };
        getMovieGenre();
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedGenreId = event.target.value;
        setSelectedGenreId(selectedGenreId); // Call setSelectedGenreId with selected genre ID
    };

    return (
        <div className="filter-wrapper">
            Filter by Genre
            <select name="genre" onChange={handleInputChange}>
                <option value="">All Genres</option>
                {movieGenre.map((genres) => (
                    <option key={genres.id} value={genres.id}>{genres.name}</option>
                ))}
            </select>
        </div>
    );
};
