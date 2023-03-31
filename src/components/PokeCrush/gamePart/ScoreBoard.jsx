import React,{useState} from 'react'

import { Col, Row } from 'react-bootstrap';


import { useDispatch } from "react-redux";
import { SavedScoreList } from './SavedScoreList';
import { addScore } from './scoresSlice';


export const ScoreBoard = ({score}) => {
  
  const [display,setDisplay] = useState(false);
  const [showSaveButton,setShowSaveButton] = useState(true);
  const [playername, setPlayerName] = useState('');
  const handleChange = event => {
    const result = event.target.value.replace(/[^a-z]/gi, '');

    setPlayerName(result);

  };
  const onClick=() =>{
    setDisplay(true)
  }
  const dispatch = useDispatch();
  const onSubmit = (event)=>{
    if(playername.length >=3){
      setShowSaveButton(false)
      event.preventDefault();
      dispatch(addScore({
        playername : playername,
        score:score
          }))
    }
    
  
   
  }
  return ( 

       <Row className="d-flex justify-content-center">
        <Col className='col-3  '>
          <Row >
            <SavedScoreList/>
          </Row>
        </Col>
        <Col className='scoreside col-6' md="auto">
          <h3> SCORE : {score}</h3>
          <Row className=''><span className='register' onClick={onClick} >Do you want to save your score?</span></Row>
          {
            display
            ? <>
            <label>Enter your name:</label>
            <input
     
            name="playername"
            type="text"
            value={playername}
            onChange={handleChange}
            placeholder='Name'
            minLength={3}
          ></input>
          <input  defaultValue={score}/>
          {showSaveButton?<button onClick={onSubmit} >Save</button> :""}
          </>
       : <></>  

          }
      
       </Col>
       <Col className='col-3'></Col>
      </Row>

  )
}
