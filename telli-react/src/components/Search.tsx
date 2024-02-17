import React, { useEffect, useState } from "react";
import { ChangeEvent } from 'react';


export const SearchBar = () => {
  const [search, setSearch] = useState("")

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value as string);
  };

  useEffect(() => {
    if (search !== "") {
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

      fetch(url, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    }
  }, [search])

  const xhReq = new XMLHttpRequest();
  xhReq.open("GET", `https://api.themoviedb.org/3/search/movie?query=${search as string}&include_adult=false&language=en-US&page=1`, false);
  xhReq.send(null);
  const jsonObject = JSON.parse(xhReq.responseText);
  const arr = Object.keys(jsonObject).map((key) => [key, jsonObject[key]]);

  return (
    <div className="input-wrapper">Search Bar
      <input placeholder="Type to search"

        onChange={handleInputChange}
        value={search} >
      </input>
      {
        arr.map((title) => {

          return (
            <div >
              <p>
                Movie Title: {arr[1][1][0].title}
              </p>
            </div>
          )
        })

      }
    </div>

  )

}

