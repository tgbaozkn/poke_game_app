import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'


import axios from "axios";


import FightPage from '../FightingPage/FightPage';
import { SearchBar } from '../SearchBar/SearchBar';

import "../style.css";
const GamePage = () => {

    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeData,setPokeData] = useState([]);
    const [firstP,setSecondP]= useState(true);
    const [firstPBox,setFirstPBox] =useState({});
    const [secondPBox,setSecondPBox] =useState(false);
    const[fImage,setFImage]=useState("");
    const[sImage,setSImage]=useState("");   
    const [filtered,setFiltered] = useState([]);

    const pokeFun = async () => {

        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results);
   
      };
  
    const getPokemon = async (res) => {
        res.map(async (item) => {
          const result = await axios.get(item.url);
          setPokeData((state) => {
            state = [...state, result.data];
            state.sort((a, b) => (a.id > b.id ? 1 : -1));
            return state;
          });
        });
      };

      useEffect(() => {
        pokeFun();  
      
      }, [url]);
   
      var MINUTE_MS = 2000;

      useEffect(() => {
        const interval = setInterval(() => {
          const items = JSON.parse(localStorage.getItem('filtered'));
          console.log(`item is here : ${items?.name}`)  
          if (items?.name !== undefined){
    
             setFiltered(items);
          }
      
            return () => clearInterval(interval); 
  
        }, MINUTE_MS);
      
     
      }, [])
 
   
      const Options = ()=>{
        return (
         
              filtered?.name?.length> 4 ? 
          
           
                 
                      <div key={filtered.id}>
                          {!firstP ?     <SearchBar blean={firstP} /> : <></>}
                      <h3> {filtered?.name}</h3>
                     
                        
                         <img alt ="" className="imagepoke"
           src={filtered?.sprites.front_default}/>
                   <div onClick={() =>{
                       
                        
                        
                       let newFirstPBox = { ...firstPBox  };
                       let newSecondPBox = { ...secondPBox };
                       firstP? newFirstPBox["name"] = filtered.name : newSecondPBox["name"]=filtered.name ;
                      filtered.stats?.forEach((poke) => {
                         
                        newFirstPBox[poke.stat.name] = poke.base_stat ;
                        newSecondPBox[poke.stat.name] = poke.base_stat ;
 
                       //  console.log(newFirstPBox)
                     
                       })
                       firstP? setFirstPBox(newFirstPBox) :  setSecondPBox(newSecondPBox);
                      
                       // console.log(`First Player : ${firstPBox.url}`)
                       firstP? setFImage(filtered.id) :  setSImage(filtered.id);
                       setSecondP(false)
                       
                       // console.log(`Second Player : ${secondPBox}`)
                         
                      
                       }} 
                       className='d-flex align-items-center justify-content-center'>{firstP?<h4>Choose First Player</h4> : <h4> Choose Second Player</h4>} </div>
                      
                       
                 </div>
             
         
           
              : 
              <>
           
              <SearchBar blean={firstP} />
              {filtered?.name}
             
              <Row>
              
              {pokeData?.slice(0,1).map((item)=>{
                          return(
                            <div key={item.id}>
                                <h3>{item.name}</h3>
                              <Col className="d-flex align-items-center justify-content-center ">
                 {prevUrl && (
                        <button
                          className="bpoke"
                          
                          onClick={() => {
                            setUrl(prevUrl);
                            setPokeData([]);
                            console.log(`item is here : ${localStorage.getItem('filtered')}`)      
                          }}
                        >
                          Previous
                        </button>
                      )}
                     
                            
                          
                
                          <img alt ="" className="imagepoke me-2 ms-2" src={item.sprites.front_default}/>
                          
                     
                       {nextUrl && (
                        <button
                        className="bpoke"
                          onClick={() => {
                            setUrl(nextUrl);
                            setPokeData([]);
                         
                            
                          }}
                        >
                          Next
                        </button>
                      )}
                      </Col >
                      <div onClick={() =>{
                       
                        
                        
                        let newFirstPBox = { ...firstPBox  };
                        let newSecondPBox = { ...secondPBox };
                        firstP? newFirstPBox["name"] = item.name : newSecondPBox["name"]=item.name ;
                       item.stats?.forEach((poke) => {
                          
                         newFirstPBox[poke.stat.name] = poke.base_stat ;
                         newSecondPBox[poke.stat.name] = poke.base_stat ;
  
                        //  console.log(newFirstPBox)
                      
                        })
                        firstP? setFirstPBox(newFirstPBox) :  setSecondPBox(newSecondPBox);
                       
                        // console.log(`First Player : ${firstPBox.url}`)
                        firstP? setFImage(item.id) :  setSImage(item.id);
                        setSecondP(false)
                        if(firstP=== false ){

                        }
                        // console.log(`Second Player : ${secondPBox}`)
                          
                       
                        }} 
                        className='d-flex align-items-center justify-content-center'>{firstP?<h4>Choose First Player</h4> : <h4> Choose Second Player</h4>} </div>
                       
                        </div> 
  
                      
                        )})} 
                         
                        </Row> 
       
              </>
            
          
   
        )
    }
    const styles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      };
      
  return (
    
      !secondPBox?
    <Container style={styles} > 
        <Row >
     
           
            {firstP? <><Options /></> : <></>  }
            {!firstP? <><Options /></> : <></>  }
               
            </Row>

            </Container>
                        :
                        
                        
                        firstPBox&&secondPBox&&
                        <FightPage
                        firstPlayer={firstPBox}
                        secondPlayer={secondPBox}
                        imageF={fImage}
                        imageS={sImage}
                      />
                      
                 
                        
                    
                    
                    
                      
  
  )
}

export default GamePage
