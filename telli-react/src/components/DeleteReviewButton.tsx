interface DeleteReviewButtonProps {
  reviewId: number;
  onDelete: () => void;
}

const DeleteReviewButton = ({
  reviewId,
  onDelete,
}: DeleteReviewButtonProps) => {
  const handleDelete = async () => {
    if (confirm("Your review will be deleted permanently!")) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/review/delete/${reviewId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          onDelete();
        } else {
          console.error("Error deleting existing Review.");
        }
      } catch (error) {
        console.error("Error deleting existing Review: ", error);
      }
    }
  };

  return (
    <>
      <button type="button" onClick={handleDelete}>Delete</button>
    </>
  );
};

export default DeleteReviewButton;
