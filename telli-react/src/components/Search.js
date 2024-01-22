import {useState} from "react";

function Search() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGU2NTJhODNlYzkwNzcxZTdkZWQ4YWEwMmMyMDJkYSIsInN1YiI6IjY1YWQ1OWJiMTU4Yzg1MDBhYzFiZTEyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nA96D4cB1ZUGNw42oU3Ah6NVMuQhb2WTlIehZJskGDg'
    }
  };

  fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

export default Search;