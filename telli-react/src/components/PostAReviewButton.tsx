import { Link } from "react-router-dom";

interface PostAReviewButtonProps {
  mediaItemDTO: MediaItemDTO;
}

interface MediaItemDTO {
  tmdbId: number;
  mediaType: string;
}

const PostAReviewButton = ({ mediaItemDTO }: PostAReviewButtonProps) => {
  return (
    <>
      <Link to={'/write-review'} state={{mediaItemDTO}}>
        <button>Write a Review</button>
      </Link>
    </>
  );
};

export default PostAReviewButton;
