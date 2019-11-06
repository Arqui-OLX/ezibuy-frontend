import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'


import "./Register.css"

class Register extends Component{

    render(){
        return(
            <div>

                <h2 className="main-title">Regístrate</h2>
                <br></br>

                <Form className= "signupFormContainer mb-5 mt-4">
                    <br></br>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" placeholder="Introduzca email" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Confirme su contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" />
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Ingrese un nick</Form.Label>
                        <Form.Control type="text" placeholder="dame tu nick" />
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Ingrese un telefono</Form.Label>
                        <Form.Control type="number" placeholder="dame tu telefono" />
                    </Form.Group>
                    <br></br>
                        <Button size="lg" >Regístrate</Button>
                </Form>

                <Link to={`/login`} activeClassName="current">Ya tienes una cuenta, presiona aquí</Link>
            
            </div>
        );
    }
}

export default Register;