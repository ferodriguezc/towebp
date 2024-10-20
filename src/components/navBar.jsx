
import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function NavBar() {

  return (
    <Navbar className='barra mb-5' style={{}} >
      <Container style={{
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignContent: 'center'
      }}> {/* Usamos Container para limitar el ancho y centrar */}
        <Navbar.Brand href="#home">ToWebp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

