import React from 'react'
import { useSelector } from "react-redux";

export const SavedScoreList = () => {
    const playernames = useSelector((state)=>{
        return state.playername;
    });

  return (
    <div className='savedscore'>
      <h3 style={{backgroundColor:"white"}}> SCORES</h3>
   
       <ol>
       {playernames&& playernames.slice(1,5).map((player,index)=>{
         return (
         
           <li key={index}>
           <h3 style={{display:"flex", justifyContent:"center"}}><p style={{color:"white"}}>{index+1}-</p>  {player.name} : <p style={{color:"white",marginLeft:"5px"}}>  {player.score} POINTS</p> </h3>
           </li>
           )
           
     })}
     </ol>
      
    </div>
  )
}
