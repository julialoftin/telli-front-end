import React, { useState } from "react";

interface WatchListFormInfo {
  name: string,
  description: string,
}

async function fetchProcessCreateWatchListForm(watchListFormInfo: WatchListFormInfo) {
  try {
    const response = await fetch("http://localhost:8080/api/create-watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(watchListFormInfo),
    });
    return response;
  } catch (error) {
    console.error("Error creating new WatchList: ", error);
  }
}

export default function CreateNewWatchListForm() {
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);

  async function handleNewWatchListFormSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name: string = (document.getElementById("name") as HTMLInputElement).value;
    const description: string = (document.getElementById("description") as HTMLInputElement).value;

    const watchListFormInfo = {
      name: name,
      description: description,
    };

    try {
      const response = await fetchProcessCreateWatchListForm(watchListFormInfo);
      if (response) {
        if (response.ok) {
          setIsSubmissionSuccessful(true);
        } else {
          console.error("Error: Form submission failed. Status code: ", response.status);
        }
      } else {
        console.error("Error: Form submission failed. No response received.")
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2>Create New Watch List</h2>
      {isSubmissionSuccessful ? (
        <p>New Watch List created successfully!</p>
      ) : (
        <form onSubmit={handleNewWatchListFormSubmission}>
          <label htmlFor="name">
            Name of List:
            <input type="text" id="name" name="name"></input>
          </label>
          <label htmlFor="description">
            Description:
            <input type="text" id="description" name="description"></input>
          </label>
          <input type="submit" value="Create"></input>
        </form>
      )}
    </>
  );
}