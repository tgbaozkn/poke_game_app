import React from 'react'
import Lottie from "lottie-react";

import { Container, Col , Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


import Poke from "./assets/pokemon.png"
import { MainP } from '../PokeCrush/MainP';

import "../style.css"
import animationData from '../../lotties/start.json'

export const MainPage = () => {
  const navigate = useNavigate();
 
  return (
    <Container fluid  className='maincomponent'>
      <Row>
     <Col md={6} text-left="true" className='fightgame'>
      <div style={{height : "80px"}}></div>

     <img src={Poke} alt="React Logo" className="poke"/>
      <h3>POKEMON FIGHT GAME</h3>

    <Lottie
        animationData={animationData}
        className= "startb"
        onClick={()=>{
          console.log("play");
          navigate('/game');
      }}
       
      />
     </Col>
   
     <Col md={6}>

      <MainP />
     </Col>
      

     </Row>
     </Container>
  )
}
