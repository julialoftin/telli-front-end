import { useState, useEffect } from "react";
import EditWatchListForm from "./EditWatchListForm";
import DeleteWatchListButton from "./DeleteWatchListButton";
import EditWatchListButton from "./EditWatchListButton";
import { Link } from "react-router-dom"
import CreateNewWatchListForm from "./CreateNewWatchList";

export interface WatchList {
  id: number;
  name: string;
  description: string;
}

export async function fetchGetWatchLists(): Promise<WatchList[]> {
  try {
    const response = await fetch("http://localhost:8080/api/watchlist/get-all", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    const result = await response.json();
    // setWatchLists(result);
    return result;
  } catch (error) {
    console.error("Error retrieving Watch Lists: ", error);
    return [];
  }
}

export default function DisplayAllWatchLists() {
  const [watchLists, setWatchLists] = useState<WatchList[]>([]);
  const [editingWatchList, setEditingWatchList] = useState<WatchList | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      const data = await fetchGetWatchLists();
      setWatchLists(data);
    }

    if (watchLists.length === 0) {
      fetchData();
    }
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

  const handleNewWatchList = async () => {
    const data = await fetchGetWatchLists();
    setWatchLists(data);
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
                  <Link to={`/watchlist/${watchList.id}`}>{watchList.name}</Link>
                  <p>{watchList.description}</p>
                  <EditWatchListButton onClick={() => handleEditClick(watchList)} />
                  <DeleteWatchListButton onDelete={fetchGetWatchLists} watchListId={watchList.id} />
                </>
              )}
            </li>
          ))}
        </ul>
        <CreateNewWatchListForm onUpdate={() => handleNewWatchList()} />
      </div>
    </>
  );
}
