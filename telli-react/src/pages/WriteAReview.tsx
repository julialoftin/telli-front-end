import { useLocation } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import TagForm from "../components/TagForm";
import TagSelect from "../components/TagSelect";

interface MediaItemDTO {
    tmdbId: number;
    mediaType: string;
  }

  interface MovieDetails {
    id: number;
    poster_path: string;
    title: string;
    tagline: string;
    overview: string;
  }

const WriteAReview = () => {
    const location = useLocation();
    const mediaItemDTO: MediaItemDTO = location.state.mediaItemDTO;
    const movieDetails: MovieDetails = location.state.movieDetails;
    return (
        <>
            <div key={movieDetails.id} >
                <h1>{movieDetails.title}</h1>
                <p>{movieDetails.tagline}</p>
            </div>
            <ReviewForm mediaItemDTO={mediaItemDTO} />
            <TagForm />
            <TagSelect mediaItemDTO={mediaItemDTO} />
        </>
    )
}

export default WriteAReview;