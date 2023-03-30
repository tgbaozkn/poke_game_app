import { useSelector } from "react-redux";

import React from 'react'

const scoresList = () => {
   
  return <Score />
}

export default scoresList

function Score(){
    const scores = useSelector(state=> state.scores);
    return <>{scores}</>
}