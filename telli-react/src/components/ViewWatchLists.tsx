import { useState, useEffect } from "react";
import EditWatchListForm from "./EditWatchListForm";

interface WatchList {
  id: number;
  name: string;
  description: string;
}

export default function DisplayAllWatchLists() {
  const [watchLists, setWatchLists] = useState<WatchList[]>([]);
  const [editingWatchList, setEditingWatchList] = useState<WatchList | null>(
    null
  );

  async function fetchGetWatchLists() {
    try {
      const response = await fetch("http://localhost:8080/api/get-watchlists");
      const result = await response.json();
      setWatchLists(result);
    } catch (error) {
      console.error("Error retrieving Watch Lists: ", error);
    }
  }
  useEffect(() => {
    if (watchLists.length === 0) fetchGetWatchLists();
  }, [watchLists]);

  const handleEditClick = (watchList: WatchList) => {
    setEditingWatchList(watchList);
  };

  const handleUpdatedWatchList = (updatedWatchList: WatchList) => {
    const updatedWatchLists = watchLists.map((watchList) =>
      watchList.id === updatedWatchList.id ? updatedWatchList : watchList
    );
    setWatchLists(updatedWatchLists);

    setEditingWatchList(null);
  };

  const handleCancelEditClick = () => {
    setEditingWatchList(null);
  };

  return (
    <>
      <div>
        <h2>All WatchLists</h2>
        <ul>
          {watchLists.map((watchList) => (
            <li key={watchList.id}>
              <h3>{watchList.name}</h3>
              <p>{watchList.description}</p>
              <button onClick={() => handleEditClick(watchList)}>Edit</button>
              
              
            </li>
          ))}
        </ul>
      </div>

      {editingWatchList && (
                <EditWatchListForm
                  watchList={editingWatchList}
                  onUpdate={handleUpdatedWatchList}
                />
      )}
    </>
  );
}
