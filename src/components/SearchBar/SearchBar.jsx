import React, { useState, useEffect } from "react";
import axios from "axios";


export const SearchBar = ({blean}) => {
  const [filteredList, setFilteredList] = new useState([]);
  const [query, setQuery] = useState("");
  const [opacity, setOpacity] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${query}`
        );

        setFilteredList(data);
     
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [query]);

  const filterBySearch = (event) => {
    
    console.log(filteredList);
    
    setQuery(event.target.value);
  };
useEffect(()=> {
  // localStorage.setItem("filtered",filteredList);
  localStorage.setItem("filtered",JSON.stringify(filteredList));
},[filteredList])
  return !opacity ? (
    <span className="btn " onClick={() => setOpacity(true)}>
      {blean? " I want to try Search Bar - If you did not find what you were looking for-." : <a> &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Search or Do you want play this poke? </a>}
     
    
    </span>
  ) : (
    <>
      <div className="btn ms-2" onClick={() => setOpacity(false)}>
      {blean? "    No, Thanks! I will prefer to use next & previous buttons." : " "}
     
    {" "}
      </div>
      <div className="searc">
    
            <input
              onChange={filterBySearch}
              placeholder="Enter the pokemon name."
            />

         
 
      </div>
    </>
  );
};
