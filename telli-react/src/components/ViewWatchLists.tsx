import { useState, useEffect } from "react";
import EditWatchListForm from "./EditWatchListForm";
import DeleteWatchListButton from "./DeleteWatchListButton";
import EditWatchListButton from "./EditWatchListButton";

export interface WatchList {
  id: number;
  name: string;
  description: string;
}

export async function fetchGetWatchLists() {
  try {
    const response = await fetch("http://localhost:8080/api/get-watchlists");
    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error("Error retrieving Watch Lists: ", error);
  }
}

export default function DisplayAllWatchLists() {
  const [watchLists, setWatchLists] = useState<WatchList[]>([]);
  const [editingWatchList, setEditingWatchList] = useState<WatchList | null>(
    null
  );

  useEffect(() => {
    async function fetchData () {
      const result = await fetchGetWatchLists();
      setWatchLists(result);
    }

    if (watchLists.length === 0) fetchData();
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

  const handleCancelEdit = () => {
    setEditingWatchList(null);
  }

  return (
    <>
      <div>
        <h2>All WatchLists</h2>
        <ul>
          {watchLists.map((watchList) => (
            <li key={watchList.id}>
              {editingWatchList && editingWatchList.id === watchList.id ? (
                <EditWatchListForm
                  watchList={editingWatchList}
                  onUpdate={handleUpdatedWatchList}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <>
                  <h3>{watchList.name}</h3>
                  <p>{watchList.description}</p>
                  <EditWatchListButton onClick={() => handleEditClick(watchList)} />
                  <DeleteWatchListButton onDelete={fetchGetWatchLists} watchListId={watchList.id} />
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
