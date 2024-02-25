import { useState, useEffect } from "react";

interface PopularMovie {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
  // Add other properties as needed
}

interface PopularTVSeries {
  id: number;
  poster_path: string;
  name: string;
}

async function getPopularMovies() {
  const apiToken = import.meta.env.VITE_APP_API_TOKEN;
  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const getPopularTVSeries = async () => {
  const apiToken = import.meta.env.VITE_APP_API_TOKEN;
  const url = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default function MediaFeed() {
  const [popularMovies, setPopularMovies] = useState<PopularMovie[]>([]);
  const [popularTVSeries, setPopularTVSeries] = useState<PopularTVSeries[]>([]);

  useEffect(() => {
    async function fetchPopularMoviesData() {
      try {
        const response = await getPopularMovies();
        setPopularMovies(response.results);
        console.log(popularMovies);
      } catch (error) {
        console.error("Error fetching popular movie data:", error);
      }
    }

    async function fetchPopularTVSeriesData() {
      try {
        const response = await getPopularTVSeries();
        setPopularTVSeries(response.results);
        console.log(popularTVSeries);
      } catch (error) {
        console.error("Error fetching popular tv series data:", error);
      }
    }

    fetchPopularMoviesData();
    fetchPopularTVSeriesData();
  }, []);

  return (
    <>
      <h1 className="movie-list-media-feed">Popular Movies</h1>
      <div className="movie-list-media-feed">
        {popularMovies.map((movie) => (
          <div key={movie.id} className="movie-item-media-feed">
            <a href={`/movie/${movie.id}`}>
              <img
                className="movie-item-media-feed"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h2 className="movie-item-media-feed">{movie.title}</h2>
            </a>
          </div>
        ))}
      </div>
      <h1 className="movie-list-media-feed">Popular TV Series</h1>
      <div className="movie-list-media-feed">
          {popularTVSeries.map((tvSeries) => (
            <div key={tvSeries.id} className="movie-item-media-feed">
              <a href={`/tv/${tvSeries.id}`}>
              <img
                className="movie-item-media-feed"
                src={`https://image.tmdb.org/t/p/w500${tvSeries.poster_path}`}
                alt={tvSeries.name}
              />
              <h2 className="movie-item-media-feed">{tvSeries.name}</h2>
              </a>
            </div>
          ))}
      </div>
    </>
  );
}
