import { Link } from "react-router-dom";

interface PostAReviewButtonProps {
  mediaItemDTO: MediaItemDTO;
  movieDetails: MovieDetails;
}

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

const PostAReviewButton = ({ mediaItemDTO, movieDetails }: PostAReviewButtonProps) => {
  return (
    <>
      <Link to={'/write-review'} state={{mediaItemDTO, movieDetails}}>
        <button>Write a Review</button>
      </Link>
    </>
  );
};

export default PostAReviewButton;
