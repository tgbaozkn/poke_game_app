import React from 'react'
import { useSelector } from "react-redux";

export const SavedScoreList = () => {
    const playernames = useSelector((state)=>{
        return state.playername;
    });

  return (
    <div className='savedscore'>
      <h3 style={{color:"white"}}> SCORES</h3>
       <ol>
      {playernames&& playernames.map((player,index)=>{
        return (
        
          <li key={index}>
          <h3 >{index+1} - {player.name} </h3>
          </li>
          )
          
    })}
    </ol>
    </div>
  )
}
