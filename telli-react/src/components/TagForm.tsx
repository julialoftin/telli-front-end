import React, { useState } from "react";

interface TagDTO {
  name: string;
}

async function fetchCreateTag(tagDTO: TagDTO) {
  try {
    const response = await fetch("http://localhost:8080/api/tag/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagDTO),
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.error("Error creating new Tag: ", error);
  }
}

export default function TagForm() {
  const [name, setName] = useState("");
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);

  async function handleNewTagFormSubmission(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const tagFormInfo = {
      name: name,
    };

    try {
      const response = await fetchCreateTag(tagFormInfo);
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
      <h2>Create New Tag</h2>
      {isSubmissionSuccessful ? (
        <p>Tag created successfully!</p>
      ) : (
        <form onSubmit={handleNewTagFormSubmission}>
          <label htmlFor="name">
            Name of Tag:
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <input type="submit" value="Create"></input>
        </form>
      )}
    </>
  );
}
