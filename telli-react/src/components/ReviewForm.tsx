import React, { useState } from "react";

interface ReviewDTO {
  title: string;
  reviewBody: string;
}

interface MediaItemDTO {
  tmdbId: number;
  mediaType: string;
}

interface AddReviewToMediaItem {
  mediaItemDTO: MediaItemDTO;
}

async function fetchCreateReview(
  reviewDTO: ReviewDTO,
  { mediaItemDTO }: AddReviewToMediaItem
) {
  try {
    const response = await fetch("http://localhost:8080/api/review/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviewDTO, mediaItemDTO }),
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.error("Error creating review: ", error);
  }
}

export default function ReviewForm({ mediaItemDTO }: AddReviewToMediaItem) {
  const [title, setTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);

  async function handleReviewFormSubmission(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const reviewFormInfo = {
      title: title,
      reviewBody: reviewBody,
    };

    try {
      const response = await fetchCreateReview(reviewFormInfo, {
        mediaItemDTO,
      });
      if (response) {
        if (response.ok) {
          setIsSubmissionSuccessful(true);
        } else {
          console.error(
            "Error: Form submission failed. Status code: ",
            response.status
          );
        }
      } else {
        console.error("Error: Form submission failed. No response received.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2>Write a Review!</h2>
      {isSubmissionSuccessful ? (
        <p>Review posted!</p>
      ) : (
        <form onSubmit={handleReviewFormSubmission}>
          <label htmlFor="title">
            Title:
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Review Title"
            />
          </label>
          <label htmlFor="reviewBody">
            Description:
            <textarea
              id="reviewBody"
              name="reviewBody"
              onChange={(e) => setReviewBody(e.target.value)}
              rows={10}
              cols={50}
              required
              placeholder="Write your review here!"
            ></textarea>
          </label>
          <input type="submit" value="Post"></input>
        </form>
      )}
    </>
  );
}
