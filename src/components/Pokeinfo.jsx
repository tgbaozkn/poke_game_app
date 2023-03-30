import React from 'react'
import Lottie from "lottie-react";
import animationData from '../lotties/loading'
import "./style.css"
export const Pokeinfo = ({data}) => {

  return (
    <>
     {
      (!data) ? <Lottie
      animationData={animationData} 
      className="loading"
     
    /> :
    (
      <>
          <h1>{data.name}</h1>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="" />
          <div className="abilities">
              {
                  data.abilities.map(poke=>{
                      return(
                          <>
                           <div className="group">
                              <h5>{poke.ability.name}</h5>
                          </div>
                          </>
                      )
                  })
              }
          </div>
          <div className="base-stat">
              {
                  data.stats.map(poke=>{
                      return(
                          <>
                              <h5 className='left-aligned'>{poke.stat.name}: &nbsp;{poke.base_stat}</h5>
                          </>
                      )
                  })
              }
          </div>
      </>
  )
    }
      
    </>
  )
}
