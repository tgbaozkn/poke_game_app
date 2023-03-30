
import React from 'react'
import Lottie from "lottie-react";
import animationData from '../lotties/loading'

export const Card = ({pokemon,loading,infoPokemon}) => {

    const style = {
      height: 100,
    };
  return (
    <>
    {
      loading ? 
      
      <Lottie
        animationData={animationData}
        style = {style}
      />
      :
      pokemon.slice(0, 6).map((item) => {
        return (
            <>  
                <div className="cardd" key={item.id} onClick={()=>infoPokemon(item)}>
                    
                    <img className="img" src={item.sprites.front_default} alt="" />
                    <p className='card-write'>{item.name}</p>
                </div>
                <div style={{"width":"10px"}}>

                </div>
            </>
        )
    })
        }
    </>
  )
}
