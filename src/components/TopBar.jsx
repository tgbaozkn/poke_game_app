import React from 'react'
import "./navbar.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';

export const TopBar = () => {
  return (
    <Navbar  collapseOnSelect expand="sm "className='topbar flex-md-row bd-navbar 'variant='dark'>
      <Container style={{"width":"80px"}} className="extra-box"></Container>
      <Navbar.Brand  id="brand-topbar">POKEMON GAME</Navbar.Brand>
      <Navbar.Toggle aria-controls='navbarScroll' data-bs-target ="#navbarScroll"  color='black'/>
     
      <Navbar.Collapse className="justify-content-end" id="navbarScroll">
      <Nav className="ms-auto ps-5 links">
     
        <Nav.Link eventKey="1" href="/">Main Page</Nav.Link>
 
        <Nav.Link eventKey="2" href="info" className='info ms-5'>Info</Nav.Link>
        </Nav>
        </Navbar.Collapse>
        
   
  </Navbar>
  );
}

