import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WatchList } from "./ViewWatchLists";
import DeleteMediaItemFromWatchListButton from "./DeleteMediaItemFromWatchListButton";

interface MediaItem {
  tmdbId: number;
  mediaType: string;
}

interface MediaItemDetails {
  tmdbId: number;
  title: string;
  overview: string;
  poster_path: string;
  tagline: string;
  mediaType: string;
  // Add other properties as needed
}

async function fetchMediaItemsById(id: (string | undefined)) {
  // const { id } = useParams();
  try {
    const response = await fetch(
      `http://localhost:8080/api/media-item/get-items-in-watchlist/${id}`,
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
      return []
    }
    return result;
  } catch (error) {
    console.error("Error retrieving Media Items: ", error);
  }
}

export default function ViewWatchListMediaItemsComponent() {
  const { id } = useParams();
  const [watchList, setWatchList] = useState<WatchList>();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaDetails, setMediaDetails] = useState<MediaItemDetails[]>([]);

  useEffect(() => {
    async function fetchWatchListById() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/watchlist/get-by-id/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const result = await response.json();
        setWatchList(result);
      } catch (error) {
        console.error("Error retrieving Watch List: ", error);
      }
    }

    // async function fetchMediaItemsById() {
    //   try {
    //     const response = await fetch(
    //       `http://localhost:8080/api/media-item/get-items-in-watchlist/${id}`,
    //       {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         credentials: "include",
    //       }
    //     );
    //     const result = await response.json();
    //     setMediaItems(result);
    //   } catch (error) {
    //     console.error("Error retrieving Media Items: ", error);
    //   }
    // }

    const fetchAllMediaItems = async () => {
      const results = await fetchMediaItemsById(id);
      setMediaItems(results);
    }

    fetchWatchListById();
    fetchAllMediaItems();
  }, [id]);

  useEffect(() => {
    async function fetchMediaDetails() {
      const detailsPromises = mediaItems.map(async (mediaItem) => {
        try {
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

          if (movieData.title) {
            return {
              tmdbId: mediaItem.tmdbId,
              title: movieData.title,
              overview: movieData.overview,
              mediaType: "movie",
              poster_path: movieData.poster_path,
              tagline: movieData.tagline,
              // Add other properties as needed
            };
          } else if (tvData.name) {
            return {
              tmdbId: mediaItem.tmdbId,
              title: tvData.name,
              overview: tvData.overview,
              mediaType: "tv",
              poster_path: tvData.poster_path,
              tagline: tvData.tagline,
              // Add other properties as needed
            };
          } else {
            console.error(
              `Media type could not be determined for item ${mediaItem.tmdbId}`
            );
            return null;
          }
        } catch (error) {
          console.error(
            `Error fetching details for media item ${mediaItem.tmdbId}: `,
            error
          );
          return null;
        }
      });

      const details = await Promise.all(detailsPromises);
      setMediaDetails(details.filter(Boolean) as MediaItemDetails[]);
    }

    if (mediaItems.length > 0) {
      fetchMediaDetails();
    }
  }, [id, mediaItems]);

  return (
    <>
      <div>
        {watchList && (
          <>
            <h1>{watchList.name}</h1>
            <h2>{watchList.description}</h2>
          </>
        )}
      </div>
      <div>
        {mediaDetails && watchList !== undefined && (
          <>
            <div className="movie-list">
              {mediaDetails.map((mediaDetail) => (
                <div className="movie-item" key={mediaDetail.tmdbId}>
                  <a href={`/movie/${mediaDetail.tmdbId}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${mediaDetail.poster_path}`}
                      alt={mediaDetail.title}
                    />
                    <p>{mediaDetail.title}</p>
                  </a>
                  <p>{mediaDetail.tagline}</p>
                  <p>{mediaDetail.overview}</p>
                  <DeleteMediaItemFromWatchListButton
                    tmdbId={mediaDetail.tmdbId}
                    watchListId={watchList.id}
                    mediaType={mediaDetail.mediaType}
                    onDelete={() => fetchMediaItemsById(String(watchList.id)).then((updatedMediaItems) => setMediaItems(updatedMediaItems))}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
