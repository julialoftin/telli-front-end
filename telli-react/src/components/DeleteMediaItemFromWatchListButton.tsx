interface DeleteMediaItemFromWatchListProps {
    tmdbId: number;
    mediaType: string;
    watchListId: number;
    onDelete: () => void;
}

const DeleteMediaItemFromWatchListButton = ({tmdbId, mediaType, watchListId, onDelete}: DeleteMediaItemFromWatchListProps) => {
    const handleDelete = async () => {
        if (confirm("This is permanent!")) {
            const mediaItemDTO = {
                tmdbId: tmdbId,
                mediaType: mediaType,
            }
            try {
                const response = await fetch(`http://localhost:8080/api/media-item/delete-item-from-watchlist/${watchListId}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(mediaItemDTO),
                    credentials: "include",
                });
                if (response.ok) {
                    onDelete();
                } else {
                    console.error("Error removing item from watch list.")
                }
            } catch (error) {
                console.error("Error removing existing item from watch list: ", error);
            }
        }
    }


    return (
        <>
            <button type="button" onClick={handleDelete}>Remove</button>
        </>
    )
}

export default DeleteMediaItemFromWatchListButton;