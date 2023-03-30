import React from 'react'
import { useSelector } from "react-redux";

export const SavedScoreList = () => {
    const playernames = useSelector((state)=>{
        return state.playername;
    });

  return (
    <div>{playernames&& playernames.map((player,index)=>{
        return (<h3 key={index}> {player.name} </h3>)
    })}</div>
  )
}
