interface DeleteWatchListButtonProps {
  watchListId: number;
  onDelete: () => void;
}

export default function DeleteWatchListButton({
  watchListId,
  onDelete,
}: DeleteWatchListButtonProps) {
  async function handleDelete() {
    if (confirm("Your Watch List will be deleted permanently!")) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/watchlist/delete-watchlist/${watchListId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
          }
        );
        if (response.ok) {
          onDelete();
        } else {
          console.error("Error deleting existing WatchList.");
        }
      } catch (error) {
        console.error("Error deleting existing WatchList: ", error);
      }
    }
  }

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}
