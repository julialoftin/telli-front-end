import React, { useEffect, useState } from "react";


export const SearchBar = () => {
    const [search, setSearch] = useState("")
    const [searchData, setSearchData] = useState("")

const handleChange = (event) => {
    setSearch(event.target.value)
}

useEffect(()=> {
    if (search !== ""){
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=${fae46c29ceeaecf4154856d4ac887a0a}").then((response) => 
        response.json()).then((json)=>{console.log(json);})
    }
        }, [search])

    
return (
            <div className="input-wrapper">Search Bar
            <input placeholder="Type to search" 
            
            onChange = {handleChange}
            value= {search}
            ></input>

            </div>
)
}

