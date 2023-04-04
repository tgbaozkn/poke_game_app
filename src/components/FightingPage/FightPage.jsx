import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../lotties/pokeball.json";
import turnButton from "../../lotties/turn.json";
import rip from "./images/rip.png";
import "./fightpage.css";
export default function FightPage({
  firstPlayer,
  secondPlayer,
  imageF,
  imageS,
}) {
  const [fhp, setFhp] = useState(firstPlayer.hp);
  const [shp, setShp] = useState(secondPlayer.hp);
  const [fpattack, setFpattack] = useState(firstPlayer["special-attack"]);
  const [spattack, setSpattack] = useState(secondPlayer["special-attack"]);
  const [fpdefense, setFpdefense] = useState(firstPlayer["special-defense"]);
  const [spdefense, setSpdefense] = useState(secondPlayer["special-defense"]);
  const [player, setPlayer] = useState(true);
  const [player1FontSize, setPlayer1FontSize] = useState(24); // initial font size of player 1
  const [player2FontSize, setPlayer2FontSize] = useState(24); // initial font size of player 2
  const [currentPlayer, setCurrentPlayer] = useState(2);
  const [timeoutId, setTimeoutId] = useState(null);
  const [display, setDisplay] = useState("none");
  const navigate = useNavigate();
  //battle log glsin

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  function handleButtonClick() {
    clearTimeout(timeoutId);
    if (currentPlayer === 1) {
      setPlayer1FontSize(50);
      setDisplay("block");
    } else {
      setPlayer2FontSize(50);
      setDisplay("block");
    }

    setTimeoutId(
      setTimeout(() => {
        if (currentPlayer === 1) {
          setPlayer1FontSize(24);
          setDisplay("none");
        } else {
          setPlayer2FontSize(24);
          setDisplay("none");
        }
        player ? setCurrentPlayer(1) : setCurrentPlayer(2);
      }, 500)
    );
  }

  function press() {
    console.log("lottie press");

    if (fhp === shp) {
      alert("You should use a special skill!!!");
      return;
    } else {
      player ? setShp(shp - 2) : setFhp(fhp - 2);
    }
    if (fhp === 0 || shp === 0) {
      return;
    }
    handleButtonClick();
    setPlayer(!player); //switch to other player
  }
  function specialAttackF() {
    if (shp === 0 || fhp === 0) {
      return "";
    }
    handleButtonClick();

    setFpattack(fpattack - fpattack / 3);
    setShp(shp - fpattack / 11);
    setPlayer(false);
  }

  function specialAttackS() {
    if (shp === 0 || fhp === 0) {
      return "";
    }
    handleButtonClick();
    setSpattack(spattack - spattack / 3);
    setFhp(fhp - spattack / 11);
    setPlayer(true);
  }
  function specialDefenseF() {
    if (shp === 0 || fhp === 0) {
      return "";
    }
    setPlayer1FontSize(50);

    setTimeoutId(
      setTimeout(() => {
        setPlayer1FontSize(24);
      }, 350)
    );
    setFpdefense(fpdefense - fpdefense / 2);
    setFhp(fhp + fpdefense / 15);
    setPlayer(false);
  }
  function specialDefenseS() {
    if (shp === 0 || fhp === 0) {
      return "";
    }
    setPlayer2FontSize(50);
    setTimeoutId(
      setTimeout(() => {
        setPlayer2FontSize(24);
      }, 350)
    );
    setSpdefense(spdefense - spdefense / 2);
    setShp(shp + spdefense / 15);
    setPlayer(true);
  }

  const Fight = () => {
    if (fpattack < 15) {
      setFpattack(0);
    }
    if (spattack < 15) {
      setSpattack(0);
    }
    if (spdefense < 5) {
      setSpdefense(0);
    }
    if (fpdefense < 5) {
      setFpdefense(0);
    }
    if (fhp <= 0 || shp <= 0) {
      if (fhp > shp) {
        setShp(0);
        return alert(`THE WINNER : FIRST PLAYER - ${firstPlayer.name} !!`);
      }
      if (shp > fhp) {
        setFhp(0);
        return alert(`THE WINNER : SECOND PLAYER - ${secondPlayer.name} !!`);
      }
    }
  };

  useEffect(() => {
    Fight();
  }, [shp, fhp]);
  useEffect(() => {
    if (shp === fhp) {
      if (
        spdefense <= 1 &&
        fpdefense <= 1 &&
        spattack <= 1 &&
        fpattack <= 1 &&
        shp === fhp
      ) {
        alert("DRAW");
        navigate("/");
      }
    }
  }, [shp, fhp, spattack, fpattack, spdefense, fpdefense]);

  function backToMainPage() {
    navigate("/");
  }
  return (
    <Container fluid className="playground ">
      <Row className="roww">
        {display === "none"
          ? ""
          : !player
          ? `1.${firstPlayer.name.toUpperCase()} HIT `
          : `2.${secondPlayer.name.toUpperCase()} HIT `}
        {display === "none" ? ""
          : player
          ? ` 1.${firstPlayer.name.toUpperCase()}!`
          : ` 2.${secondPlayer.name.toUpperCase()}! `}
      </Row>
      <div
        className="hit"
        style={{
          left: player ? "200px" : "",
          right: player ? "" : "200px",
          display: display,
        }}
      ></div>
      <Row>
        <Col xs="auto" md={4} className="text-center">
          {player ? (
            <Lottie
              style={{
                width: "50px",
                height: "auto",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                margin: " 0 auto",
              }}
              animationData={turnButton}
              className="text-center"
            />
          ) : (
            <></>
          )}

          {firstPlayer && (
            <>
              <h3 style={{ color: "black" }}>1.{firstPlayer.name}</h3>
              {fhp === 0 ? (
                <img src={rip} className="rip mt-5" alt="" />
              ) : (
                <img
                  alt=""
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imageF}.png`}
                  className="imagepoke"
                />
              )}

              <h3
                style={{
                  color: "black",
                  fontSize: `${player1FontSize}px`,
                  display: "flex",
                  marginLeft: "170px",
                  alignItems: "center",
                }}
              >
                {" "}
                HP :
                <div
                  style={{
                    height: "20px",
                    width: `${fhp}px`,
                    backgroundColor: fhp < 20 ? "yellow" : "red",
                    marginLeft: "10px",
                    border: "1px solid black",
                  }}
                ></div>
              </h3>

              {fhp === 0 ? (
                <>
                  <button onClick={backToMainPage} className="backtomain">
                    {" "}
                    BACK TO MAIN PAGE
                  </button>
                </>
              ) : (
                <div className="d-flex justify-content-center p-2">
                  {parseInt(fpattack) < 1 ? (
                    <></>
                  ) : (
                    <button
                      className="special"
                      onClick={
                        player
                          ? specialAttackF
                          : console.log("second player turn")
                      }
                    >
                      {" "}
                      Special Attack : {parseInt(fpattack)}
                    </button>
                  )}

                  {parseInt(fpdefense) < 1 ? (
                    <></>
                  ) : (
                    <button
                      className="special ms-2"
                      onClick={
                        player
                          ? specialDefenseF
                          : console.log("second player turn")
                      }
                    >
                      {" "}
                      Special Defense : {parseInt(fpdefense)}
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </Col>

        <Col s={5} md={4} className="text-center">
          <h6 className="mt-5"> CLICK </h6>
          <Container>
            <Lottie
              animationData={animationData}
              id="fight"
              onClick={shp === 0 || fhp === 0 ? "" : press}
            />
          </Container>

          <h6> AND FIGHT!! </h6>
        </Col>

        <Col xs="auto" md={4} className="text-center">
          {player ? (
            <></>
          ) : (
            <Lottie
              style={{
                width: "50px",
                height: "auto",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                margin: " 0 auto",
              }}
              animationData={turnButton}
              className="text-center"
            />
          )}

          {secondPlayer && (
            <>
              <h3 style={{ color: "white" }}>2.{secondPlayer.name}</h3>
              {shp === 0 ? (
                <img src={rip} className="rip mt-5" />
              ) : (
                <img
                  alt=""
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imageS}.png`}
                  className="imagepoke"
                />
              )}

              <h3
                style={{
                  color: "white",
                  fontSize: `${player2FontSize}px`,
                  display: "flex",
                  marginLeft: "170px",
                  alignItems: "center",
                }}
              >
                {" "}
                HP :{" "}
                <div
                  style={{
                    height: "20px",
                    width: `${fhp}px`,
                    backgroundColor: fhp < 20 ? "yellow" : "red",
                    marginLeft: "10px",
                    border: "1px solid white",
                  }}
                ></div>
              </h3>
              {shp === 0 ? (
                <>
                  {" "}
                  <button onClick={backToMainPage} className="backtomain">
                    {" "}
                    BACK TO MAIN PAGE
                  </button>
                </>
              ) : (
                <div className="d-flex justify-content-center p-2 ">
                  {parseInt(spattack) < 1 ? (
                    <></>
                  ) : (
                    <button
                      className="special"
                      onClick={
                        player
                          ? console.log("first player turn")
                          : specialAttackS
                      }
                    >
                      {" "}
                      Special Attack : {parseInt(spattack)}
                    </button>
                  )}
                  {parseInt(spdefense) < 1 ? (
                    <></>
                  ) : (
                    <button
                      className="special ms-2"
                      onClick={
                        player
                          ? console.log("first player turn")
                          : specialDefenseS
                      }
                    >
                      {" "}
                      Special Defense : {parseInt(spdefense)}
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </Col>

        {/* {firstPlayer["special-attack"]} */}
      </Row>
      <Row className="roww"></Row>
    </Container>
  );
}
