import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import './navigationbar-styles.css';


import { Link } from "react-router-dom";


class NavigationBar extends Component {
    render(){
        return (

          <div>
            <Navbar variant="dark" >
            <Navbar.Brand href="/" className = "navLogo" >
              < img 
                src= "./logo.png"
                width="130"
                height="70"
                alt="EZiBuy logo"
              />
          </Navbar.Brand>
              <Nav className="mr-auto">
                <li><Link className="NavLink" to="/home">EzIBuy</Link></li>
                <li><Link className="NavLink" to="/login">Ingresar</Link></li>
                <li><Link className="NavLink" to="/postlist">Publicaciones</Link></li>
                <li><Link className="NavLink" to="/sale">Vender</Link></li>
                <li><Link className="NavLink" to="/myprofile/profile">Profile</Link></li>

              </Nav>

              <Form inline>
                <FormControl type="text" placeholder="Buscar" className="mr-sm-2" />
                <Button variant="outline-light">Buscar</Button>
              </Form>
            </Navbar>
          </div>

        );
    }
}

export default NavigationBar;