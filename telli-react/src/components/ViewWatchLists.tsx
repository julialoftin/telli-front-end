import React, { useState, useEffect } from "react";

interface WatchList {
    id: number,
    name: string,
    description: string,
}

export default function DisplayAllWatchLists() {
    const [watchLists, setWatchLists] = useState<WatchList[]>([])

    async function fetchGetWatchLists() {
        try {
            const response = await fetch('http://localhost:8080/api/get-watchlists');
            const result = await response.json();
            setWatchLists(result);
        } catch (error) {
            console.error("Error retrieving Watch Lists: ", error);
        }
    }

    useEffect(() => {
        fetchGetWatchLists();
    }, [watchLists]);

    return (
        <>
            <div>
                <h2>All WatchLists</h2>
                <ul>
                    {watchLists.map((watchList) => (
                        <li key={watchList.id}>
                            <h3>{watchList.name}</h3>
                            <p>{watchList.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}