import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddMediaToWatchListSelect from "../components/AddMediaItemToWatchList";
import ViewTagByMediaItem from "../components/ViewTagByMediaItem";
import ViewReviewsByMediaItem from "../components/ViewReviewsByMediaItem";
import PostAReviewButton from "../components/PostAReviewButton";

interface MovieDetails {
  id: number;
  poster_path: string;
  title: string;
  tagline: string;
  overview: string;
  backdrop_path: string;
}

export default function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiToken = import.meta.env.VITE_APP_API_TOKEN;
      const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiToken}`,
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
    mediaType: "movie",
  };

  const mediaTitle = movieDetails.title;

  return (
    <div className="movieDetailsPage">
      <div>
        <div key={movieDetails.id} className="movieDetails">
          <div>
            <h1>{movieDetails.title}</h1>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          </div>
          <p className="tagline">{movieDetails.tagline}</p>
          <p className="overview">{movieDetails.overview}</p>
          <ViewTagByMediaItem mediaItemDTO={mediaItemDTO} />
          <AddMediaToWatchListSelect
            mediaItemDTO={mediaItemDTO}
            mediaTitle={mediaTitle}
          />
        </div>
      </div>
      <div className="movieDetailsRightColumn">
        <div>
          <ViewReviewsByMediaItem mediaItemDTO={mediaItemDTO} />
          <PostAReviewButton
            mediaItemDTO={mediaItemDTO}
            movieDetails={movieDetails}
          />
        </div>
      </div>
    </div>
  );
}
