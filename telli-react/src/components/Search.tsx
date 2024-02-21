import React, { useEffect, useState } from "react";
import { ChangeEvent } from 'react';
import { Filter } from "./Filter";

interface MovieData {
  title: string,
  genre_ids: number[]
}

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [movieData, setMovieData] = useState<MovieData[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number | string>(""); // Ensure the initial state is compatible with the prop type

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
  };

  useEffect(() => {
      async function getMovieData() {
          const url = (
              `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`
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
              setMovieData(dataResponse);
          } catch (error) {
              console.error("Error fetching movie details:", error);
          }
      };

      getMovieData();
  }, [search]);

  const handleGenreChange = (genreId: number | string) => {
      setSelectedGenreId(genreId);
  };

  // Filter movieData based on selectedGenreId
  const filteredMovieData = selectedGenreId ?
      movieData.filter(movie => movie.genre_ids.includes(Number(selectedGenreId))) :
      movieData;

  return (
      <div className="input-wrapper">
          Search Bar
          <input placeholder="Type to search"
              onChange={handleInputChange}
              value={search}>
          </input>
          <Filter setSelectedGenreId={handleGenreChange} /> {/* Pass setSelectedGenreId as a prop */}
          {filteredMovieData.map((result, index) => (
              <div key={index}>
                  <p>Movie Title: {result.title}</p>
              </div>
          ))}
      </div>
  );
};