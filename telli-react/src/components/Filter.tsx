import React, { useEffect, useState } from "react";
import { ChangeEvent } from 'react';

interface MovieGenre {
    title: string
    genre: string
}
export const Filter = () => {
    //create a function to filter the search results from searchbar by genre with select buttons.
    const [filter, setFilter] = useState("")
    const [movieGenre, setMovieGenre] = useState<MovieGenre[]>([])
    const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value as string);
    };

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
                const dataResponse = json.results;
                setMovieGenre(dataResponse);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };
        getMovieGenre();
    }, [filter])

    return (
        <div className="filter-wrapper">Filter by Genre

            {
                movieGenre.map((result) => (
                    <select name="genre"
                        onSelect={handleInputChange}
                    >  
                        <option key={result.genre[0]} value={result.genre[1]}>Action</option>
                    </select>

                ))

            }
        </div>

    )

}
