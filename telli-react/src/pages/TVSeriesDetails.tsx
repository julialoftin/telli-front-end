import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ViewTagByMediaItem from "../components/ViewTagByMediaItem";
import AddMediaToWatchListSelect from "../components/AddMediaItemToWatchList";
import ViewReviewsByMediaItem from "../components/ViewReviewsByMediaItem";
import PostAReviewTVSeriesButton from "../components/PostAReviewTVSeriesButton";

interface TVSeriesDetails {
  id: number;
  poster_path: string;
  name: string;
  overview: string;
  tagline: string;
}

const TVSeriesDetailsPage = () => {
  const { id } = useParams();
  const [tvSeriesDetails, setTVSeriesDetails] = useState<
    TVSeriesDetails | undefined
  >(undefined);

  useEffect(() => {
    const fetchTVSeriesDetails = async () => {
      const apiToken = import.meta.env.VITE_APP_API_TOKEN;
      const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
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
        setTVSeriesDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchTVSeriesDetails();
  }, []);

  if (!tvSeriesDetails) {
    return <div>Loading...</div>;
  }

  const mediaItemDTO = {
    tmdbId: tvSeriesDetails.id,
    mediaType: "tv",
  };

  const mediaTitle = tvSeriesDetails.name;

  return (
    <>
      <div className="movieDetailsPage">
        <div>
          <div key={tvSeriesDetails.id} className="movieDetails">
            <div>
              <h1>{tvSeriesDetails.name}</h1>
              <img
                src={`https://image.tmdb.org/t/p/w500${tvSeriesDetails.poster_path}`}
                alt={tvSeriesDetails.name}
              />
            </div>
            <p className="tagline">{tvSeriesDetails.tagline}</p>
            <p className="overview">{tvSeriesDetails.overview}</p>
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
            <PostAReviewTVSeriesButton
              mediaItemDTO={mediaItemDTO}
              tvSeriesDetails={tvSeriesDetails}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TVSeriesDetailsPage;
