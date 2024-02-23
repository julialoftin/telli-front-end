import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

interface ViewTagByMediaItemProps {
  mediaItemDTO: MediaItemDTO;
}

export default function ViewTagByMediaItem({
  mediaItemDTO,
}: ViewTagByMediaItemProps) {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTagsByMediaItem = async () => {
        const queryParams = new URLSearchParams({
            tmdbId: mediaItemDTO.tmdbId.toString(),
            mediaType: mediaItemDTO.mediaType,
          });
      try {
        const response = await fetch(
          `http://localhost:8080/api/tag/get-tags-by-media-item?${queryParams}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const result = await response.json();
        setTags(result);
        // console.log(result);
        return result;
      } catch (error) {
        console.error("Error fetching tag by media item: ", error);
      }
    };
    fetchTagsByMediaItem();
  }, []);

  return (
    <>
      <div>
        <ul>
          {tags.map((tag) => (
            <li key={tag.id}>
              <Link to={`/media-item/${tag.id}`}>{tag.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
