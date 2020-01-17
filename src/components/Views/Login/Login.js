import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { withRouter } from 'react-router-dom';

import gql from 'graphql-tag';
//import { Query } from 'react-apollo';
//import { Mutation } from 'react-apollo';
//luifrodriguezroj@unal.edu.co
import ApolloClient from 'apollo-boost';



import "./Login-styles.css"

class Login extends Component{
    
    constructor(props) {
        super(props)
        this.handleTextBoxChange = this.handleTextBoxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }
    
    state = {
        email: "",
        password: ""
    }


    handleTextBoxChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(){
        console.log("Pressed the button")
        this.handleLogin(this.state.email, this.state.password)
        let path = `/home`;
        this.props.history.push(path);
    }

    handleLogin(email, password){
        const Client = new ApolloClient({ uri: 'http://35.209.170.220:4000/' });

        const mutation = gql(`
            mutation login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    token
                    userId
                        }
                    }
            `)
        
        
        if (this.state.email !== "" && this.state.password !== ""){
            Client.mutate({
                mutation: mutation,
                variables:{
                    email: this.state.email,
                    password: this.state.password
                }
            }).then(result => {
                
                console.log( result.data.login)

                const data = result.data.login
                //const token= data.token
                //const userId = data.userId

                //store user token
                localStorage.setItem("userInfo", JSON.stringify(data));
                
                //callback to handle session
                this.props.handleSessionStorage(true);
                //this.setState({loginError: false })
            }).catch(error => this.setState({loginError: true }))
        }else{
                console.log("invalid data")
        }


    }

    

    render(){
        

        
        return(


            <div className="divLogin">
                
                <h2 className="main-title mt-4">Ingresar</h2>

                <br></br>

                <div className="login">

                    <form onSubmit={this.handleSubmit} className= "mx-auto">
            
                        <div className=" form-group">
                            <input 
                                type="email" 
                                className="inputRegister form-control mx-auto" 
                                id="title" 
                                placeholder="introduzca el email" 
                                name="email" 
                                onChange={this.handleTextBoxChange}
                                required/>
                        </div>


                        <div className="form-group ">
                            <input 
                                type="password" 
                                className="inputRegister form-control mx-auto" 
                                id="password" 
                                placeholder="Ingrese su contraseña" 
                                name="password" 
                                onChange={this.handleTextBoxChange}
                                required/>
                        </div>

    
                        
        
                        <button type="submit" className="btnsubmit btn mt-5 w-75">Entrar</button>
                        
                        {this.state.loginError && <alert variant="warning">Error, inicio de sesión inválido! </alert>}
                    </form>
                
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
