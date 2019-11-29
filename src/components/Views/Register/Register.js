import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import axios from 'axios'

import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';

import { withRouter } from 'react-router-dom';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';


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
        phone: "",
        files:[]
    }

    handleSubmit(e){
        e.preventDefault();
        console.log("Pressed the button")
  
        this.handleRegister(this.state.email, this.state.password,this.state.nickname, this.state.phone)

    }

    handleRegister(email, password, nickname, phone){
        console.log("entra handleregister");
        

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
 
                var bodyFormData = new FormData();

                bodyFormData.set('user_id', result.data.create.userId);
        
                bodyFormData.append('userImage',this.state.files[0]); 
        
                 
                const UrlImageEditProfile = 'http://35.209.82.198:3001/user-images/';
                         
        
                axios.post(UrlImageEditProfile, bodyFormData )
                   
                    
                    .then( (response)=>{
                       
                        
                    }).catch((error) =>{
                        
                        console.log(error);
                    });
 

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
                
                    
                <form onSubmit={this.handleSubmit} className= "signupFormContainer mb-5 mt-4">

                    <FilePond  
                        onupdatefiles={(fileItems) => {
                        this.setState({files: fileItems.map(fileItem => fileItem.file)});}}  
                        onDrop={this.handleUploadImages}
                        allowMultiple={false}
                        required ={true}
                    />
                    <br></br>


                    <div className="form-group ">
                        <input 
                            type="email" 
                            className="form-control w-100" 
                            id="title" 
                            placeholder="Email" 
                            name="email" 
                            //value={this.state.post.title} 
                            onChange={this.handleTextBoxChange}
                            required/>
                    </div>

                    <div className="form-group ">
                        <input 
                            type="password" 
                            className="form-control w-100" 
                            id="password" 
                            placeholder="contraseña" 
                            name="password" 
                            onChange={this.handleTextBoxChange}
                            required/>
                    </div>

                    <div className="form-group ">
                        <input 
                            type="text" 
                            className="form-control w-100" 
                            id="nickname" 
                            placeholder="Nickname" 
                            name="nickname" 
                            onChange={this.handleTextBoxChange}
                            required/>
                    </div>

                    <div className="form-group ">
                        <input 
                            type="number" 
                            className="form-control w-100" 
                            id="phone" 
                            placeholder="numero telefonico" 
                            name="phone" 
                            onChange={this.handleTextBoxChange}
                            required/>
                    </div>
                    
                
                    <br></br>

                    <button type="submit" className="btn btn-primary btn-block  mt-5"  >Registrarse</button>


                </form>

             
            </div>
        );
    }
}

export default Register;