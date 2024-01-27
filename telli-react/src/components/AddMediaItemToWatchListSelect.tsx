import React, { useEffect, useState } from "react";
import { fetchGetWatchLists } from "./ViewWatchLists";

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
}

export default function AddMediaToWatchListSelect({
  mediaItemDTO,
}: AddMediaToWatchListProps) {
  const [watchLists, setWatchLists] = useState<WatchList[]>([]);
  const [selectedWatchList, setSelectedWatchList] = useState<number | null>(
    null
  );

  useEffect(() => {
    async function fetchWatchLists() {
      try {
        const response = await fetchGetWatchLists();
        setWatchLists(response);
      } catch (error) {
        console.error("Error retrieving Watch Lists: ", error);
      }
    }
    fetchWatchLists();
  }, []);

  const handleAddToWatchList = async () => {
    if (!selectedWatchList || !mediaItemDTO) {
      return console.error("Watch List or Media Item details missing.");
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/add-to-watchlist/${selectedWatchList}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mediaItemDTO),
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

          <button type="button" onClick={handleAddToWatchList}></button>
        </form>
      </div>
    </>
  );
}
