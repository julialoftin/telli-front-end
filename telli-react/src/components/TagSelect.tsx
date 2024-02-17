import React, { useEffect, useState } from "react";

interface TagDTO {
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

interface MediaItemDTO {
  tmdbId: number;
  mediaType: string;
}

interface AddTagToMediaItemProps {
  mediaItemDTO: MediaItemDTO;
}

export default function TagSelect({ mediaItemDTO }: AddTagToMediaItemProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tag/get-all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const result = await response.json();
        setTags(result);
        console.log(result);
        return result;
      } catch (error) {
        console.error("Error adding tag to media item: ", error);
      }
    };
    fetchTags();
  }, []);

  const handleAddTag = async () => {
    if (!selectedTag) {
      console.error("Please select a valid Watch List");
      return;
    }
    try {
        // const response = 
      await fetch(
        "http://localhost:8080/api/tag/add-to-media-item",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tagDTO: {
                name: selectedTag
            },
            mediaItemDTO,
          }),
          credentials: "include",
        }
      );
    //   const result = await response.json();
    //   return result;
    } catch (error) {
      console.error("Error adding tag to media item:", error);
    }
  };

  return (
    <>
      <div>
        <form>
          <select
            onChange={(event) => setSelectedTag(String(event.target.value))}
            value={selectedTag || ""}
          >
            <option value="" disabled>
              Select a Tag
            </option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddTag}>
            Add
          </button>
        </form>
      </div>
    </>
  );
}
