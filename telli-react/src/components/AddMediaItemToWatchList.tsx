import React, { useEffect, useState } from "react";
import { fetchGetWatchLists } from './ViewWatchLists'

interface MediaItemDTO {
  tmdbId: number;
  mediaType: string;
}

interface WatchList {
  id: number;
  name: string;
  description: string;
}

interface AddMediaToWatchListProps {
  mediaItemDTO: MediaItemDTO;
  mediaTitle: string;
}

export default function AddMediaToWatchListSelect({
  mediaItemDTO, mediaTitle
}: AddMediaToWatchListProps) {
  const [watchLists, setWatchLists] = useState<WatchList[]>([]);
  const [selectedWatchList, setSelectedWatchList] = useState<number | null>(
    null
  );

  useEffect(() => {
    async function fetchWatchLists() {
      try {
        const response = await fetchGetWatchLists();
        console.log(response);
        setWatchLists(response);
      } catch (error) {
        console.error("Error retrieving Watch Lists: ", error);
      }
    }
    fetchWatchLists();
  }, []);

  const handleAddToWatchList = async () => {
    if (!selectedWatchList || !mediaItemDTO.mediaType) {
      try {
        const [movieResult, tvResult]: [Response, Response] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${mediaItemDTO.tmdbId}?api_key=${'8f41637da57e52055177463bf9873dc2'}`),
          fetch(`https://api.themoviedb.org/3/tv/${mediaItemDTO.tmdbId}?api_key=${'8f41637da57e52055177463bf9873dc2'}`),
        ])
        const [movieData, tvData]: [any, any] = await Promise.all([movieResult.json(), tvResult.json()])

        if (movieData.title === mediaTitle) {
          mediaItemDTO.mediaType = 'movie'
        } else if (tvData.name === mediaTitle) {
          mediaItemDTO.mediaType = 'tv'
         } else {
          console.error("Media type could not be determined");
          return;
         }
      } catch (error) {
        console.error("Error fetching media details: ", error);
        return;
      }
    }

      try {
        const response = await fetch(
          `http://localhost:8080/api/media-item/add-to-watchlist/${Number(selectedWatchList)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(mediaItemDTO),
            credentials: 'include',
          }
        );
        const result = await response.json();
        return result;
      
    } catch (error) {
      console.error("Error adding media item to watchlist: ", error);
    }
  };

  return (
    <>
      <div>
        <form>
          <select
            onChange={(event) =>
              setSelectedWatchList(Number(event.target.value))
            }
          >
            <option value="" disabled>
              Select a Watch List
            </option>
            {watchLists.map((watchList) => (
              <option key={watchList.id} value={watchList.id}>
                {watchList.name}
              </option>
            ))}
          </select>

          <button type="button" onClick={handleAddToWatchList}>Add</button>
        </form>
      </div>
    </>
  );
}