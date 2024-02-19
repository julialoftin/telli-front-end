import { useEffect, useState } from "react";

interface Review {
    id: number;
    title: string;
    reviewBody: string;
    mediaItem: {
        tmdbId: number;
        mediaType: string;
    },
    user: {
        id: number;
        username: string;
    }

}

interface MediaItemDTO {
  tmdbId: number;
  mediaType: string;
}

interface ViewReviewsByMediaItemProps {
    mediaItemDTO: MediaItemDTO;
}

export default function ViewReviewsByMediaItem({mediaItemDTO}: ViewReviewsByMediaItemProps) {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviewsByMediaItem = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/review/get-reviews-by-media-item/${mediaItemDTO.tmdbId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const result = await response.json();
                setReviews(result);
                return result;
            } catch (error) {
                console.error("Error fetching reviews by media item: ", error);
            }
        };
        fetchReviewsByMediaItem();
    }, []);

    return (
        <>
            <div>
                {reviews.map((review) => (
                    <div key={review.id}>
                        <p>{review.user.username}</p>
                        <h3>{review.title}</h3>
                        <p>{review.reviewBody}</p>
                    </div>
                ))}
            </div>
        </>
    )

}