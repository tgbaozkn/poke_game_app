import React, { useEffect, useState } from 'react'

import Lottie from "lottie-react";
import useSound from 'use-sound';
import { Col, Row } from 'react-bootstrap'


import music from "./music/music.mp3"
import empty from "./image/Empty.png"
import animationData from '../../../lotties/arrow.json'

import { ScoreBoard } from './ScoreBoard';


export const GameP = () => {
    const [currentPokeArrangement, setCurrentPokeArrangement] = useState([])
    const [cellBeingDragged,setCellBeingDragged] = useState(null);
    const [cellBeingReplaced,setCellBeingReplaced] = useState(null);
    const [playMusic] = useSound(music, { autoplay: true });
    const [arr, setArr ] = useState([] )
    const [scoreDisplay, setScoreDisplay] = useState(0)
    const [timer, setTimer] = useState(45)
    const [clickedIndex, setClickedIndex] = useState(-1);
    const randomArray = Array.from({length: 5}, () => Math.floor(Math.random() * 28 +1))
    let newArray = []
    const handleClick = (index) => {
        setClickedIndex(index); // update state with the index of the clicked element
      };

    const pokeSet = async () => {
      
       
        const promises = randomArray.map((index)=> {
             newArray.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`)
        })
        await Promise.all(promises);
 


        setArr(newArray)
        createBoard();
        
      
      };

    const checkForColumnOfThree = ()=> {
        for(let i = 0 ; i<=34; i++) {
                const columnOfThree = [i, i+ width , i + width*2]
                const decidedPoke = currentPokeArrangement[i]
                const isEmpty = currentPokeArrangement[i] === empty
                if(columnOfThree.every(cell => currentPokeArrangement[cell]=== decidedPoke && !isEmpty)){
                    setScoreDisplay((score) => score + 3)
                    columnOfThree.forEach(cell => currentPokeArrangement[cell] = empty)
                    return true

                }
        }

    }
     const checkForColumnOfFour = ()=> {
        for(let i = 0 ; i<=27; i++) {
                const columnOfFour = [i, i+ width , i + width*2, i+ width*3 ]
                const decidedPoke = currentPokeArrangement[i]
                const isEmpty = currentPokeArrangement[i] === empty
                if(columnOfFour.every(cell => currentPokeArrangement[cell]=== decidedPoke  && !isEmpty)){
                    setScoreDisplay((score) => score + 4)
                    columnOfFour.forEach(cell => currentPokeArrangement[cell]= empty)
                    return true

                }
        }

    }
    const checkForRowOfThree = ()=> {
        for(let i = 0 ; i<49; i++) {
                const rowOfThree = [i, i+ 1 , i + 2]
                const decidedPoke = currentPokeArrangement[i]
                const notValid =[5,6,12,13,19,20,26,27,33,34,40,41,47,48]
                const isEmpty = currentPokeArrangement[i] === empty
                if(notValid.includes(i)) continue;
                if(rowOfThree.every(cell => currentPokeArrangement[cell]=== decidedPoke && !isEmpty)){
                    setScoreDisplay((score) => score + 3)
   
                    rowOfThree.forEach(cell => currentPokeArrangement[cell] = empty)
                    return true


                }
        }

    }
    const checkForRowOfFour = ()=> {
        for(let i = 0 ; i<49; i++) {
                const rowOfFour = [i, i+ 1 , i + 2, i+3]
                const decidedPoke = currentPokeArrangement[i]
                const notValid =[4,5,6,11,12,13,18,19,20,25,26,27,32,33,34,39,40,41,46,47,48]
                const isEmpty = currentPokeArrangement[i] === empty
                if(notValid.includes(i)) continue;
                if(rowOfFour.every(cell => currentPokeArrangement[cell]=== decidedPoke && !isEmpty)){
                    setScoreDisplay((score) => score + 4)
    
                    rowOfFour.forEach(cell => currentPokeArrangement[cell] = empty)
                    return true
                }
        }

    }
    const createBoard = () =>{
        const randomPokeArrangement = [];
        for (let i = 0 ; i < width * width; i++) {
            const randomPoke = newArray[Math.floor( Math.random()*newArray.length)]
            randomPokeArrangement.push(randomPoke)
        }
        setCurrentPokeArrangement(randomPokeArrangement);
    }


    
    const moveIntoSquareBelow = ()=>{
       for(let i =0; i<=41 ; i++) {
        const firstRow = [0,1,2,3,4,5,6];
        const isFirstRow = firstRow.includes(i)
        if( isFirstRow &&currentPokeArrangement[i] === empty) {
            let randomNumber = Math.floor(Math.random()* arr.length)
            currentPokeArrangement[i]  = arr[randomNumber];
        }
        
            if(currentPokeArrangement[i+width ] === empty) {
          
                currentPokeArrangement[i + width] = currentPokeArrangement[i];
        
                currentPokeArrangement[i] = empty;
          
            }
        
       } 
    }
    
    useEffect(()=> {
        pokeSet();
        
        // console.log("Array of pokes : " + arr);
    },[])
    useEffect(() => {
        let countdown ;
        const interval = ()=> {
            setTimer(prev =>{
                if(prev === 0 ) clearInterval(countdown);
                else return  prev - 1;
            })
        }
        countdown = setInterval(interval,1000);
        return  ()=> clearInterval(countdown);
      }, [timer])
    useEffect(()=>{
        const timer = setInterval(()=> {
            
            checkForColumnOfFour();
            checkForRowOfFour();
            checkForColumnOfThree();
            checkForRowOfThree();
            moveIntoSquareBelow();
            setCurrentPokeArrangement([...currentPokeArrangement]);
        },150)
        return () => clearInterval(timer)
    },[checkForColumnOfThree,checkForColumnOfFour,checkForRowOfFour,checkForRowOfThree, moveIntoSquareBelow])

   const dragStart = (e)=>{
    console.log(e.target);
    console.log("drag start")
    setCellBeingDragged(e.target);
    
   
 

   }
   const dragDrop = (e) => {
    console.log(e.target);
    console.log("drag drop")
    setCellBeingReplaced(e.target);
   
  

 

   }
  
   const dragEnd = (e) => {
    console.log(e.target);
    handleClick(parseInt(cellBeingReplaced.getAttribute('data-id')));
    console.log("drag end")
    const cellBeingDraggedId = parseInt(cellBeingDragged.getAttribute('data-id'))
    const cellBeingReplacedId = parseInt(cellBeingReplaced.getAttribute('data-id'))

    currentPokeArrangement[cellBeingReplacedId] = cellBeingDragged.getAttribute('src');
    currentPokeArrangement[cellBeingDraggedId] = cellBeingReplaced.getAttribute('src');

    const validMoves = [
        cellBeingDraggedId -1,
        cellBeingDraggedId - width,
        cellBeingDraggedId +1,
        cellBeingDraggedId + width
    ]
    const validMove = validMoves.includes(cellBeingReplacedId)

    const isColFour = checkForColumnOfFour()
    const isColThree =  checkForColumnOfThree ()
    const isRowFour = checkForRowOfFour()
    const isRowThree =   checkForRowOfThree()
   
    if(cellBeingReplacedId && 
        validMove && 
        ( isColFour || isColThree || isRowFour  || isRowThree )) {
            setCellBeingDragged(null)
            setCellBeingReplaced(null)
    }
    else {
        currentPokeArrangement[cellBeingReplacedId] = cellBeingReplaced.getAttribute('src');
        currentPokeArrangement[cellBeingDraggedId] = cellBeingDragged.getAttribute('src');
        setCurrentPokeArrangement([...currentPokeArrangement])
    }
  
   

   }
  
  
    return (
        
    <div fluid className='maincrush'>

    
        { timer >=0 ? 
        <>

        <h1 className='clock'> {timer}  </h1>
          
            {playMusic}
     
   
   
        <div className='gamecrush'>
        
        {
         currentPokeArrangement.map((poke,index)=> {
             return (
               <>
                <Lottie
                animationData={animationData}
                className="arrow-down"
           
        
                    />
                     <Lottie
                animationData={animationData}
                className="arrow-right"
           
        
                    /> <Lottie
                animationData={animationData}
                className="arrow-left"
           
        
                    />
                     <Lottie
                animationData={animationData}
                className="arrow-up"
           
        
                    />
                    
                <img 
                     alt= {poke}
                     key={index}
                     data-id = {index}
                     data-role="draggable"
                     draggable = {true}
                     onDragStart = {dragStart}
                     onDragOver = {(e)=> e.preventDefault()}
                     onDragEnter = {(e)=> e.preventDefault()}
                     onDragLeave = {(e)=> e.preventDefault()}
                     onDrop = {dragDrop}
                     onDragEnd = {dragEnd}
                     src = {poke}
            
                     className= {index === clickedIndex ? 'animatebg' : ''}
                 />
               
             
               </>
             )
         })
        }
    <p className='animate-text'>Drag and drop the Pokémon where you want to match them!</p>
     </div>
     </>
        
         :
         <Col>
          <div style={{height:"50px", width:"100%"}}></div>
         <p className='timeisover'> TIME IS OVER!</p>
          <div style={{height:"80px", width:"100%"}}></div>
         <ScoreBoard score={scoreDisplay}/> 
         <div style={{height:"70px", width:"100%"}}></div>
         <button className='again' onClick={()=> { setTimer(45)}} > Play again </button>
         </Col> 
        
         
    
    }
      
     
       
    </div>
  )
}


const width = 7 ;


  