import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import './navigationbar-styles.css';
import { NavDropdown } from 'react-bootstrap';
import './navigationbar-styles.css';
 
class NavigationBar extends Component {
    render(){
        return (

          <div>
              <Navbar variant="dark"  expand="lg">
                <Navbar.Brand href="/" className = "navLogo" >
                    < img 
                      src= "/logo.png"
                      width="130"
                      height="70"
                      alt="EZiBuy logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link className="texto" href="/home" >EzIBuy</Nav.Link>
                    <Nav.Link href="/login">Ingresar</Nav.Link>
                    <Nav.Link href="/register" >Registrarse</Nav.Link>
                    <Nav.Link href="/postlist">catalogo</Nav.Link> 
                    <Nav.Link href="/sale" >Vender</Nav.Link>
                    <Nav.Link href="/myprofile/profile">Perfil</Nav.Link>
                    <NavDropdown title="Ver más" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action1">categorias</NavDropdown.Item>
                      <NavDropdown.Item href="#action2">sobre nosotros</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">Contactenos</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action4">Terminos y condiciones</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
                  </Form>
                </Navbar.Collapse>
            </Navbar>
          </div>

        );
    }
}

export default NavigationBar;