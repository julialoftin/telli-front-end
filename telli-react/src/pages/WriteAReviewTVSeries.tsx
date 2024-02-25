import { useLocation } from "react-router-dom";
import { useState } from "react";
import ReviewForm from "../components/ReviewForm";
import TagForm from "../components/TagForm";
import TagSelect from "../components/TagSelect";

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

const WriteAReviewTVSeries = () => {
  const location = useLocation();
  const mediaItemDTO: MediaItemDTO = location.state.mediaItemDTO;
  const tvSeriesDetails: TVSeriesDetails = location.state.tvSeriesDetails;

  const [showTags, setShowTags] = useState(false);

  const handleAddTag = () => {
    setShowTags(true);
  };

  return (
    <>
      <div key={tvSeriesDetails.id}>
        <h1>{tvSeriesDetails.name}</h1>
        <p>{tvSeriesDetails.tagline}</p>
      </div>
      <ReviewForm mediaItemDTO={mediaItemDTO} />
      <button onClick={handleAddTag}>Add tag</button>
      {showTags && (
        <>
          <TagForm />
          <TagSelect mediaItemDTO={mediaItemDTO} />
        </>
      )}
    </>
  );

};

export default WriteAReviewTVSeries;
