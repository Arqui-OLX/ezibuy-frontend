import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import  './Register-styles.css';


class Register extends Component{

    render(){
        return(
            <div className="profile-navbar d-flex flex-column">
                
                <h2 className="main-title">Registrarse</h2>
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
                    </Form.Group>
                    <Form.Check 
                        type={"checkbox"}
                        id={"check1"}
                        label={"Acepto los Términos y Condiciones de EzIBuy"}
                    />
                    <br></br>
                    <Button size="lg" >Registrarse</Button>
                    <br></br>
                    <br></br>
                </Form>
                
            </div>
        );
    }
}


export default Register;