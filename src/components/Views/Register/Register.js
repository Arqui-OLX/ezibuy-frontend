import React, {Component} from 'react';
import axios from 'axios'

import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';

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
   
        this.handleRegister(this.state.email, this.state.password,this.state.nickname, this.state.phone)

    }

    handleRegister(email, password, nickname, phone){        

        const Client = new ApolloClient({ uri: 'http://35.209.170.220:4000/' });

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
        
                 
                const UrlImageEditProfile = 'http://35.209.170.220:3000/user-images/';
                         
        
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
            <div className="divRegister">

                <h2 className="main-title mt-4 ">Regístrate</h2>
     
                
                    
                <form onSubmit={this.handleSubmit} className= "mx-auto">

                    <FilePond  
                        onupdatefiles={(fileItems) => {
                        this.setState({files: fileItems.map(fileItem => fileItem.file)});}}  
                        onDrop={this.handleUploadImages}
                        allowMultiple={false}
                        required ={true}
                    />
                    <br></br>


                    <div className=" form-group ">
                        <input 
                            type="email" 
                            className="inputRegister form-control mx-auto" 
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
                            className="inputRegister form-control mx-auto" 
                            id="password" 
                            placeholder="contraseña" 
                            name="password" 
                            onChange={this.handleTextBoxChange}
                            minLength="3"
                            required/>
                    </div>

                    <div className="form-group ">
                        <input 
                            type="text" 
                            className="inputRegister form-control mx-auto" 
                            id="nickname" 
                            placeholder="Nickname" 
                            name="nickname" 
                            onChange={this.handleTextBoxChange}
                            required/>
                    </div>

                    <div className="form-group ">
                        <input 
                            type="number" 
                            className="inputRegister form-control mx-auto" 
                            id="phone" 
                            placeholder="numero telefonico" 
                            name="phone" 
                            onChange={this.handleTextBoxChange}
                            minLength="3"
                            required/>
                    </div>
                    
                
                    <br></br>

                    <button type="submit" className="btnsubmit btn w-75"  >Registrarse</button>


                </form>

             
            </div>
        );
    }
}

export default Register;