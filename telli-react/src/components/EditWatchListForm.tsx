import React, { useState, useEffect } from "react";

interface EditWatchListDTO {
  newName: string;
  newDescription: string;
}

async function fetchEditWatchList(
  watchListId: number,
  editWatchListDTO: EditWatchListDTO
) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/edit-watchlist/${watchListId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editWatchListDTO),
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating existing WatchList: ", error);
  }
}

export default function EditWatchListForm({ watchList, onUpdate }) {
  async function handleEditWatchList(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newName: string = (
      document.getElementById("newName") as HTMLInputElement
    ).value;
    const newDescription: string = (
      document.getElementById("newDescription") as HTMLInputElement
    ).value;

    const editWatchListDTO = {
      newName: newName,
      newDescription: newDescription,
    };

    await fetchEditWatchList(watchList.id, editWatchListDTO);

    onUpdate({
      ...watchList,
      name: newName,
      description: newDescription,
    });
  }

  return (
    <>
      <form onSubmit={handleEditWatchList}>
        <input
          type="text"
          id="newName"
          name="newName"
          defaultValue={watchList.name}
        ></input>
        <input
          type="text"
          id="newDescription"
          name="newDescription"
          defaultValue={watchList.description}
        ></input>
        <button type="submit">Update</button>
      </form>
    </>
  );
}
