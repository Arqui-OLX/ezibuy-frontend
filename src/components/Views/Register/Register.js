import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'

import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';

import { withRouter } from 'react-router-dom';


import "./Register.css"

class Register extends Component{

    constructor(props) {
        super(props)
        this.handleTextBoxChange= this.handleTextBoxChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }
    
    
    state = {
        email: "",
        password: "",
        nickname: "",
        phone: ""         
    }

    handleSubmit(){
        console.log("Pressed the button")
        this.handleRegister(this.state.email, this.state.password,this.state.nickname, this.state.phone)
    }

    handleRegister(email, password, nickname, phone){
        const Client = new ApolloClient({ uri: 'http://35.208.241.159:4000/' });

        const mutation = gql(`
            mutation create($email: String!, $password: String!, $nickname: String!, $phone: String!) {
                create(email: $email, password: $password, nickname: $nickname, phone: $phone) {
                    token
                    userId
                        }
                    }
            `)
        
        
        if (this.state.email !== "" && this.state.password !== "" && this.state.nickname !== "" && this.state.phone !== ""){
            Client.mutate({
                mutation: mutation,
                variables:{
                    email: this.state.email,
                    password: this.state.password,
                    nickname: this.state.nickname,
                    phone: this.state.phone
                }
            }).then(result => {
                console.log(result)
                //const data = result.data.login
                //const token= data.token
                //const userId = data.userId
                let path = `/login`;
                this.props.history.push(path);

            }).catch(error => this.setState({loginError: true }))
        }else{
                console.log("invalid register")
        }


    }
    handleTextBoxChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return(
            <div>

                <h2 className="main-title">Regístrate</h2>
                <br></br>

                <Form className= "signupFormContainer mb-5 mt-4">
                    <br></br>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control onChange={this.handleTextBoxChange} name="email" type="email" placeholder="Introduzca email" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control onChange={this.handleTextBoxChange}  name="password" type="password" placeholder="Contraseña" />
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Ingrese un nick</Form.Label>
                        <Form.Control onChange={this.handleTextBoxChange}  name="nickname" type="text" placeholder="dame tu nick" />
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Ingrese un telefono</Form.Label>
                        <Form.Control onChange={this.handleTextBoxChange}  name="phone" type="text" placeholder="dame tu telefono" />
                    </Form.Group>
                    <br></br>
                        <Button size="lg" onClick={this.handleSubmit} >Regístrate</Button>
                </Form>

                <Link to={`/login`} className="current">Ya tienes una cuenta, presiona aquí</Link>
            
            </div>
        );
    }
}

export default withRouter(Register);