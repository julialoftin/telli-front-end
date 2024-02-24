import { Link } from "react-router-dom";

interface PostAReviewTVSeriesButtonProps {
  mediaItemDTO: MediaItemDTO;
  tvSeriesDetails: TVSeriesDetails;
}

interface MediaItemDTO {
  tmdbId: number;
  mediaType: string;
}

interface TVSeriesDetails {
  id: number;
  poster_path: string;
  name: string;
  overview: string;
  tagline: string;
}

const PostAReviewTVSeriesButton = ({
  mediaItemDTO,
  tvSeriesDetails,
}: PostAReviewTVSeriesButtonProps) => {
  return (
    <>
      <Link to={"/write-tv-review"} state={{ mediaItemDTO, tvSeriesDetails }}>
        <button>Write a Review</button>
      </Link>
    </>
  );
};

export default PostAReviewTVSeriesButton;
