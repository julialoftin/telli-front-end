import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddMediaToWatchListSelect from "../components/AddMediaItemToWatchList";

interface MovieDetails {
  id: number;
  poster_path: string;
  title: string;
  tagline: string;
  overview: string;
  // Add other properties as needed
}

export default function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | undefined>(
    undefined
  );

  useEffect(() => {
    // Fetch movie details using the movie ID from the route params
    const fetchMovieDetails = async () => {
      const apiToken = import.meta.env.VITE_APP_API_TOKEN;
      const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
          `Bearer ${apiToken}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const mediaItemDTO = {
    tmdbId: movieDetails.id,
    mediaType: "movie"

  const mediaTitle = movieDetails.title;

  return (
    <>
    <div key={movieDetails.id}>
      <h1>{movieDetails.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
      />
      <p>{movieDetails.tagline}</p>
      <p>{movieDetails.overview}</p>
    </div>
    <AddMediaToWatchListSelect mediaItemDTO={mediaItemDTO} mediaTitle={mediaTitle} />
    </>
  );
}
