import { useState, useEffect } from "react";
import DeleteReviewButton from "./DeleteReviewButton";

interface Review {
  id: number;
  title: string;
  reviewBody: string;
  mediaItem: {
    tmdbId: number;
    mediaType: string;
  };
  user: {
    id: number;
    username: string;
  };
}

interface MediaItemDetails {
  tmdbId: number;
  title: string;
  overview: string;
  poster_path: string;
  tagline: string;
  mediaType: string;
}

export async function fetchReviewsByUser() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/review/get-reviews-by-user",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const result = await response.json();
    if (result.length === 0) {
      return [];
    }
    return result;
  } catch (error) {
    console.error("Error fetching reviews by media item: ", error);
  }
}

export default function ViewReviewsLoggedInUser() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [mediaDetails, setMediaDetails] = useState<
    MediaItemDetails[] | undefined
  >(undefined);

  useEffect(() => {
    const fetchAllReviewsByUser = async () => {
      const results = await fetchReviewsByUser();
      if (results.length === 0) {
        setReviews([]);
      }
      setReviews(results);
    };

    fetchAllReviewsByUser();
  }, []);

  useEffect(() => {
    async function fetchMediaDetails() {
      try {
        const detailsPromises = reviews.map(async (review) => {
          const mediaItem = review.mediaItem;
          const [movieResult, tvResult]: [Response, Response] =
            await Promise.all([
              fetch(
                `https://api.themoviedb.org/3/movie/${
                  mediaItem.tmdbId
                }?api_key=${"8f41637da57e52055177463bf9873dc2"}`
              ),
              fetch(
                `https://api.themoviedb.org/3/tv/${
                  mediaItem.tmdbId
                }?api_key=${"8f41637da57e52055177463bf9873dc2"}`
              ),
            ]);

          const [movieData, tvData]: [any, any] = await Promise.all([
            movieResult.json(),
            tvResult.json(),
          ]);

          if (mediaItem.mediaType === "movie") {
            return {
              tmdbId: mediaItem.tmdbId,
              title: movieData.title,
              overview: movieData.overview,
              poster_path: movieData.poster_path,
              mediaType: "movie",
              tagline: movieData.tagline,
            };
          } else if (mediaItem.mediaType === "tv") {
            return {
              tmdbId: mediaItem.tmdbId,
              title: tvData.name,
              overview: tvData.overview,
              poster_path: tvData.poster_path,
              mediaType: "tv",
              tagline: tvData.tagline,
            };
          } else {
            console.error(
              `Media type could not be determined for item ${mediaItem.tmdbId}`
            );
            return null;
          }
        });

        const details = await Promise.all(detailsPromises);
        setMediaDetails(details.filter(Boolean) as MediaItemDetails[]);
      } catch (error) {
        console.error("Error fetching media details: ", error);
        setMediaDetails([]);
      }
    }
    if (reviews === undefined) {
      return setReviews([]);
    }
    if (reviews.length > 0 && mediaDetails === undefined) {
      fetchMediaDetails();
    }
  }, [reviews, mediaDetails]);

  return (
    <>
      <div>
        <>
          {reviews && mediaDetails !== undefined && (
            <div>
              <h2>Your Reviews</h2>
              {reviews.length > 0 ? (
              reviews.map((review) => {
                const eachMediaDetail = mediaDetails.find(
                  (detail) => detail.tmdbId === review.mediaItem.tmdbId
                );

                return (
                  <div key={review.id}>
                    <div className="movie-list">
                      <div className="movie-item">
                        <div>
                          {eachMediaDetail && (
                            <>
                            {eachMediaDetail.mediaType === "movie" ? (
                              <a href={`/movie/${eachMediaDetail.tmdbId}`}>
                                <img
                                  src={`https://image.tmdb.org/t/p/w500/${eachMediaDetail.poster_path}`}
                                  alt={eachMediaDetail.title}
                                />
                                <h2>{eachMediaDetail.title}</h2>
                              </a>
                            ) : (
                              <a href={`/tv/${eachMediaDetail.tmdbId}`}>
                                <img
                                  src={`https://image.tmdb.org/t/p/w500/${eachMediaDetail.poster_path}`}
                                  alt={eachMediaDetail.title}
                                />
                                <h2>{eachMediaDetail.title}</h2>
                              </a>
                             )}
                              <h4>{eachMediaDetail.tagline}</h4>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="review-by-user">
                        <p className="review-user-username">
                          {review.user.username}
                        </p>
                        <h4>{review.title}</h4>
                        <p>{review.reviewBody}</p>
                        <DeleteReviewButton
                          reviewId={review.id}
                          onDelete={() => {
                            fetchReviewsByUser().then((updatedReviews) =>
                              setReviews(updatedReviews)
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>You haven't posted a review yet!</p>
            )}
            </div>
          )}
        </>
      </div>
    </>
  );
}
