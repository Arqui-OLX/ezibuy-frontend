import React, {Component} from 'react';
//import InputGroup from 'react-bootstrap/InputGroup';
//import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
//import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import "./Login-styles.css"

class Invoice extends Component{

    render(){
        return(
            <div>

                <h2 className="main-title">Ingresar</h2>
                <br></br>

                <Form className= "loginFormContainer">
                    <br></br>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" placeholder="Introduzca email" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" />
                        <br></br>
                        <Button size="lg" >Entrar</Button>
                    </Form.Group>
                </Form>
            
            </div>
        );
    }
}

export default Invoice;

