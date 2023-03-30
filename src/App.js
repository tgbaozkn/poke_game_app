import "./components/style.css"
import { Col } from "react-bootstrap";


import {Info} from "./components/Info";
import { TopBar } from "./components/TopBar";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./components/MainPage/MainPage";
import GamePage from "./components/GamePage/GamePage";


import FightPage from "./components/FightingPage/FightPage";
import { GameP } from "./components/PokeCrush/gamePart/GameP";




function App() {
  return (
    

    
    <Routes>
        <Route path="/" element={ <>   <TopBar /> <MainPage /> </> } />
        <Route path="info" element={  <Col>   <TopBar /> <Info/></Col>} />
        <Route path="game" element={  <>   <TopBar /> <GamePage/></>} />
        <Route path="fight" element={  <>   <TopBar /> <FightPage/></>} />
        <Route path="crush" element={  <>   <TopBar /> <GameP/></>} />

       
      </Routes>
     

  );
}

export default App;
