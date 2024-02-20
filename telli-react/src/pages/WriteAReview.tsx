import { useLocation } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";

interface MediaItemDTO {
    tmdbId: number;
    mediaType: string;
  }

const WriteAReview = () => {
    const location = useLocation();
    const mediaItemDTO: MediaItemDTO = location.state.mediaItemDTO;
    return (
        <>
            <ReviewForm mediaItemDTO={mediaItemDTO} />
        </>
    )
}

export default WriteAReview;