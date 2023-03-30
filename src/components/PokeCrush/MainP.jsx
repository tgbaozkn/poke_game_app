import axios from 'axios';
import React from 'react'
import Lottie from "lottie-react";

import { useState } from 'react';
import { useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import animationData from '../../lotties/start.json'
export const MainP = () => {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=4&offset=5.");
  const [arr, setArr ] = useState([] )
//   // Array(7).fill(0).map(row => new Array(4).fill(""))
// const shuffledArr= shuffle(arr);
 
  const pokeSet = async () => {
    const res = await axios.get(url);

 
    var newArray = []
    const arrayTwo = [];
    const promises = res.data.results.map( async(r)=>{
      const imgsrc = await axios.get(`https://pokeapi.co/api/v2/pokemon/${r.name}`);
      return newArray.push(imgsrc.data.sprites.front_default);
    });
    
    await Promise.all(promises);
    arrayTwo.push([...newArray]);
    arrayTwo.push([...newArray]);
    arrayTwo.push([...newArray]);
    
    arrayTwo.forEach(array => shuffle(array));

    setArr(arrayTwo)
  
  };
  
  const navigate = useNavigate();
  useEffect(()=> {
    pokeSet();
  },[]);


  return (
    <Container className='table-responsive' >
    <Table responsive className='crashside  text-center table-sm'  >
      <div className='row' style={{height:"60px"}}></div>
      
        <tbody  >
          {arr&& arr.map((a,index)=> {
            return (
              
              <tr key={index} >
              {a.map((b,subIndex)=>{
                return (
                  <td key={subIndex} className="pokestable"> <img src={b}  alt = "" className='animate-poke'/></td>
                )
              
               
              })}
          </tr>
            )
               
          })}
            
       
       
        </tbody>

    </Table>
    <h3 style={{"color":"black"}}>POKEMON MATCHING GAME</h3>
    <Lottie
        animationData={animationData}
        className= "startb"
        onClick={()=>{
          console.log("play");
          navigate('/crush');
      }}
       
      />
    </Container>
  )
}
const shuffle = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};