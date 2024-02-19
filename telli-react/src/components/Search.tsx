import React, { useEffect, useState } from "react";
import { ChangeEvent } from 'react';

interface MovieData{
  title: string
}

export const SearchBar = () => {
  const [search, setSearch] = useState("")
  const [movieData, setMovieData] = useState<MovieData[]>([])
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value as string);
  };

  useEffect(() => {
    async function getMovieData() {
      const url = (
        `https://api.themoviedb.org/3/search/movie?query=${search as string}&include_adult=false&language=en-US&page=1`
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
  }, [search])

  return (
    <div className="input-wrapper">Search Bar
      <input placeholder="Type to search"

        onChange={handleInputChange}
        value={search} >
      </input>
      {
        movieData.map((result) => (
          
            <div >
              <p>
                Movie Title: {result.title}
              </p>
            </div>
          
        ))

      }
    </div>

  )

}

//movie details endpoint
//on click call with react routing
//search results each p tag would be wrapped in anchor tag
//media feed
//put id in interface
//anchor tag just 
//div needs key=id
//tag module with radio buttons , name of each button would be a tag, grab 
//filter by genre******